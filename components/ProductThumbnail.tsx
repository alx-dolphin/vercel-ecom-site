import { Product } from "@/sanity.types";
import Link from "next/link";
import Image from "next/image";
import { imageUrl } from "@/sanity/lib/imageUrl";

function ProductThumbnail({product}: { product: Product }) {

   const isOutOfStock = !product.stock || product.stock <= 0;

  return (
    <Link href={`/product/${product.slug?.current}`} className={`
        group
        flex
        flex-col
        bg-white
        rounded-lg
        border
        border-gray-200
        shadow-sm
        hover:shadow-md
        transition-all
        duration-300
        overflow-hidden
    `}>
        <div className="relative aspect-square w-full h-full overflow-hidden">
            {product.image && (
                <Image
                    className="object-contain transition-transform duration-300 group-hover:scale-105"
                    src={imageUrl(product.image).url()}
                    alt={product.name || "Product Image"}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            )}
            {isOutOfStock && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                    <span className="text-white font-bold text-lg">Out of Stock</span> 
                </div>
            )}
        </div>
        <div className="p-4">
            <h2 className="text-md font-semibold text-black truncate">
                {product.name}
            </h2>
            
            <p className="mt-2 text-sm text-gray-500 line-clamp-2">
                {/* partially render the description */}
                {product.description ?.map((block) => 
                    block._type === "block"
                    ? block.children?.map((child) => child.text).join("")
                    : ""
                )
                .join("") || "No description available"
                }
            </p>
            <p className="mt-2 text-sm font-medium text-gray-900">
                £{product.price?.toFixed(2)}
            </p>
        </div>
    </Link>
  )
}

export default ProductThumbnail