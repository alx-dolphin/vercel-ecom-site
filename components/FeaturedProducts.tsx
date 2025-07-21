import { Product } from "@/sanity.types"
import ProductThumbnail from "./ProductThumbnail"
import { getAllProducts } from "@/sanity/lib/products/getAllProducts";

async function FeaturedProducts() {

    const allProducts = await getAllProducts();
    const featuredProducts = allProducts.slice(0, 5); // first 5 products 

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {featuredProducts.map((product: Product, index: number) => (
                <div 
                    key={product._id} 
                    className={index >= 3 ? "hidden sm:block" : ""}
                >
                    <ProductThumbnail product={product} />
                </div>
                ))}
            </div>
    )
}

export default FeaturedProducts