"use client"

import useCartStore from "@/app/(shop)/store";
// import { useAuth, useUser } from "@clerk/nextjs";
// import { useRouter } from "next/navigation";
// import { useState } from "react";

function CartPage() {
  const groupedItems = useCartStore((state) => state.getGroupedItems());
//   const totalPrice = useCartStore((state) => state.getTotalPrice());
//   const {isSignedIn} = useAuth();
//   const {user} = useUser();
//   const router = useRouter();
  
//   const [isClient, setIsClient] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

  if (groupedItems.length === 0) {
    return (
      <div className="container mx-auto p-4 flex flex-col items-center justify-center min-h-[50vh]">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Your Cart</h1>
        <p className="text-gray-600 text-lg">Your cart is empty.</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4 max-w-6xl">
        <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
        <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-grow">
                {groupedItems?.map((item) => (
                    <div key={item.product._id} className="flex items-center mb-6">
                        <div>{item.product.name}</div>
                        <div>{item.quantity}</div>
                    </div>    
                ))}
            </div>
        </div>

    </div>
  )
}

export default CartPage