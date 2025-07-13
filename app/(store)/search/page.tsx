import ProductsGrid from "@/components/ProductsGrid";
import { searchProductsByName } from "@/sanity/lib/products/searchProductsByName";

async function SearchPage({
    searchParams,
}: {
    searchParams: Promise<{ query: string }>
}) {
    const { query } = await searchParams;
    const products = await searchProductsByName(query);

    if (products.length === 0 || !products.length) {
        return (
            <div className="flex flex-col items-center justify-top min-h-screen bg-gray-100 p-4"> 
                <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
                    <h1 className="text-2xl font-bold mb-6 text-center">No results for &quot;{query}&quot;</h1>
                    <p className="text-gray-600 text-center">
                        No products found matching your search. Try again with a different search term.
                    </p>
                </div>
            </div>
        )
    }
    return (
        <div className="flex flex-col items-center justify-top min-h-screen bg-gray-100 p-4">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
                <h1 className="text-2xl font-semibold mb-6 text-center">
                    Search Results for &quot;{query}&quot;
                </h1>
                <ProductsGrid products={products} />
            </div>
        </div>
    )
}

export default SearchPage; 