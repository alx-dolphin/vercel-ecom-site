import { imageUrl } from "@/sanity/lib/imageUrl";
import { getProductBySlug } from "@/sanity/lib/products/getProductBySlug";
import { PortableText } from "next-sanity";
import { notFound } from "next/navigation";
import Image from "next/image";
import AddToCartButton from "@/components/AddToCartButton";

export const dynamic = "force-static";
export const revalidate = 60; // Revalidate at most every 60 seconds

async function ProductPage({ params}: { params: Promise<{slug:string}>}) {
    const { slug } = await params;
    const product = await getProductBySlug(slug);

    if (!product) {
        return notFound();
    }

    // Make hook for this ? (used in two places)
    const isOutOfStock = !product.stock || product.stock <= 0;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className={`relative aspect-square overflow-hidden rounded-lg shadow-lg 
                ${isOutOfStock ? "opacity-50" : ""}`}
               >
                  {product.image && (
                    <Image
                        src={imageUrl(product.image).url()}
                        alt={product.name ?? "Productimage"}
                        fill
                        className="object-contain transition-transform duration-300 hover:scale-105"
                    />
                  )}
                  {isOutOfStock && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <span className="text-white text-lg font-bold">Out of Stock</span>
                    </div>
                  ) }
               </div>
               <div className="flex flex-col justify-between">
                <div>
                    <h1 className="text-2xl font-semibold mb-4">{product.name}</h1>
                    <div className="text-xl font-medium mb-4">
                        £{product.price?.toFixed(2)}
                    </div>
                    <div className="prose max-w-none mb-6">
                        {/* We need to check if the description is an array, because the description is an array of blocks */}
                        {Array.isArray(product.description) && (
                            //PortableText used to maintain the format of the description from the CMS
                            //https://www.sanity.io/docs/developer-guides/presenting-block-text
                            <PortableText value={product.description} />
                        )}

                    </div>
                </div>
                <div className="mt-6">
                    <AddToCartButton product={product} disabled={isOutOfStock} />
                </div>
            </div> 
        </div>
    </div>
    )
}

export default ProductPage;