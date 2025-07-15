"use client"

import { Product } from "@/sanity.types"
import ProductThumbnail from "./ProductThumbnail";

function ProductsGrid({products}: { products: Product[]}) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-4">
            {products.map((product) => {
                return (
                    <ProductThumbnail key={product._id} product={product} />
                );
            })}
        </div>
    )
}

export default ProductsGrid;