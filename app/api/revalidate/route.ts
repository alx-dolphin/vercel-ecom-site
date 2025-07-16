import { revalidatePath, revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

const REVALIDATION_SECRET = process.env.REVALIDATION_SECRET;

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    const providedSecret = authHeader?.replace('Bearer ', '');
    
    if (!REVALIDATION_SECRET || providedSecret !== REVALIDATION_SECRET) {
      return NextResponse.json(
        { message: 'Invalid authorization token' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { type, slug, tag } = body;

    console.log('Revalidation request:', { type, slug, tag });

    switch (type) {
      case 'product':
        // Revalidate specific product page and homepage
        if (slug) {
          revalidatePath(`/product/${slug}`, 'page');
          console.log(`Revalidated product page: /product/${slug}`);
        }
        // revalidate homepage when products change
        revalidatePath('/', 'page');
        
        if (tag) {
          revalidateTag(tag);
        } else {
          revalidateTag('products');
          if (slug) {
            revalidateTag(`product-${slug}`);
          }
        }
        break;

      case 'homepage':
        revalidatePath('/', 'page');
        revalidateTag('products');
        console.log('Revalidated homepage');
        break;

      case 'all-products':
        revalidatePath('/', 'page');
        revalidateTag('products');
        console.log('Revalidated all product-related pages');
        break;

      default:
        return NextResponse.json(
          { message: 'Invalid revalidation type. Use: product, homepage, or all-products' },
          { status: 400 }
        );
    }

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      type,
      slug,
      tag
    });

  } catch (error) {
    console.error('Revalidation error:', error);
    return NextResponse.json(
      { message: 'Error revalidating', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const path = searchParams.get('path');
  const tag = searchParams.get('tag');
  const secret = searchParams.get('secret');

  if (!REVALIDATION_SECRET || secret !== REVALIDATION_SECRET) {
    return NextResponse.json(
      { message: 'Invalid authorization token' },
      { status: 401 }
    );
  }

  if (!path && !tag) {
    return NextResponse.json(
      { message: 'Missing path or tag parameter' },
      { status: 400 }
    );
  }

  try {
    if (path) {
      revalidatePath(path);
      console.log(`Revalidated path: ${path}`);
    }
    
    if (tag) {
      revalidateTag(tag);
      console.log(`Revalidated tag: ${tag}`);
    }

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      path,
      tag
    });
  } catch (error) {
    console.error('Revalidation error:', error);
    return NextResponse.json(
      { message: 'Error revalidating', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 