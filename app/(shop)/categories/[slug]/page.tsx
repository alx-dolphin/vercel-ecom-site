import ProductsView from "@/components/ProductsView";

async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

  return (
    <div className="flex flex-col items-center justify-top min-h-screen bg-gray-100 p-4">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-6xl">
            <h1 className="text-2xl font-medium mb-6 text-center">
                All&nbsp;
                {slug
                  .split("-")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")
                }
            </h1>
            <ProductsView categorySlug={slug} />
        </div>
    </div>
  )
}

export default CategoryPage