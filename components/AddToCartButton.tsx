"use client"

import useCartStore from "@/app/(shop)/store";
import { Product } from "@/sanity.types";
import { useEffect, useState } from "react";

interface AddToCartButtonProps {
    product: Product;
    disabled: boolean;
}


function AddToCartButton( {product, disabled}: AddToCartButtonProps ) {
const {addItem, removeItem, getItemCount} = useCartStore();
const itemCount = getItemCount(product._id);

const [isClient, setIsClient] = useState(false);

// useEffect to ensure the component is only rendered on the client side
// Prevents hydration error

useEffect(() => {
    setIsClient(true);
}, []);

if (!isClient) return null;

  return (
    <div className="flex items-center justify-center space-x-2">
        <button
            onClick={() => removeItem(product._id)}
            className={`w-8 h-8 rounded-full flex items-center justify-center 
            transition-colors duration-300 ${itemCount === 0 
                ? "bg-gray-200 cursor-not-allowed" 
                : "bg-gray-200 hover:bg-gray-300"
            }`}
            disabled={itemCount === 0 || disabled}
        >
            <span 
                className={`text-xl font-bold ${itemCount === 0 ? "text-gray-400" : "text-gray-700"}`}
            >
                -
            </span>
        </button>
        <span className="w-8 text-center font-medium">{itemCount}</span>
        <button
            onClick={() => addItem(product)}
            className={`w-8 h-8 rounded-full flex items-center justify-center 
            transition-colors duration-300 ${disabled ? "bg-gray-200 cursor-not-allowed" : "bg-gray-200 hover:bg-gray-300"}`}
            disabled={disabled}
        >
            <span className="text-xl font-bold text-gray-700">+</span>
        </button>
    </div>
  )
}

export default AddToCartButton