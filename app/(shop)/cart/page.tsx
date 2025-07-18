"use client"

import useCartStore from "@/app/(shop)/store";
import AddToCartButton from "@/components/AddToCartButton";
import { imageUrl } from "@/sanity/lib/imageUrl";
import { SignInButton, useAuth, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Loader from "@/components/Loader";
import { createCheckoutSession, Metadata } from "@/actions/createCheckoutSession";


function CartPage() {
  const groupedItems = useCartStore((state) => state.getGroupedItems());
  // const totalPrice = useCartStore((state) => state.getTotalPrice());
  const {isSignedIn} = useAuth();
  const {user} = useUser();
  const router = useRouter();
  
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  //Wait for client to mount, can be done with suspense? 
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return <Loader/>;

  if (groupedItems.length === 0) {
    return (
      <div className="container mx-auto p-4 flex flex-col items-center justify-center min-h-[50vh]">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Your Cart</h1>
        <p className="text-gray-600 text-lg">Your cart is empty.</p>
      </div>
    )
  }

  const handleCheckout = async () => {
    if (!isSignedIn) return;
    setIsLoading(true);
    try { 
      const metadata: Metadata = {
        orderNumber: crypto.randomUUID(), //Mocked order number
        customerName: user?.fullName ?? "Unknown",
        customerEmail: user?.emailAddresses[0].emailAddress ?? "",
        clerkUserId: user!.id,
      };

      const checkoutUrl = await createCheckoutSession(groupedItems, metadata);

      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container mx-auto p-4 max-w-6xl">
        <h1 className="text-2xl font-semibold mb-4">Your Cart</h1>
        <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-grow">
                {groupedItems?.map((item) => (
                    <div key={item.product._id} className="mb-4 p-4 border rounded flex items-center justify-between">
                      <div className="flex items-center cursor-pointer flex-1 min-w-0"
                        onClick={() => router.push(`/product/${item.product.slug?.current}`)}
                      >
                        <div className="w-20 h-20 sm:w-32 sm:h-32 flex-shrink-0 mr-4">
                          {item.product.image && (
                            <Image
                              src={imageUrl(item.product.image).url()}
                              alt={item.product.name ?? "Product Image"}
                              width={100}
                              height={100}
                              className="w-full h-full object-cover rounded"
                            />
                          )}
                        </div> 
                        <div className="min-w-0">
                          <h2 className="text-lg sm:text-xl font-semibold truncate">
                            {item.product.name}
                          </h2> 
                          <p className="text-sm sm:text-base">
                            Price: £ {((item. product.price ?? 0) * item.quantity). toFixed(2)}
                          </p>
                        </div>
                      </div>    
                      <div className="flex items-center ml-4 flex-shrink-0">
                          <AddToCartButton product={item.product} />
                      </div>
                    </div>
                ))}
            </div>
            <div className="w-full lg:w-80 lg:sticky lg:top-4 h-fit bg-white p-6 border rounded order-first lg:order-last fixed bottom-0 left-0 lg:left-auto">
              <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
              <div className="mt-4 space-y-2">
                <p className="flex justify-between">
                  <span>Items: </span>
                  <span>
                    {groupedItems.reduce((total, item) => total + item.quantity, 0)}
                  </span>
                </p>
                <p className="flex justify-between text-xl font-semibold border-t pt-2">
                  <span>Total: </span>
                  <span>
                    £{useCartStore.getState().getTotalPrice().toFixed(2)}
                  </span>
                </p>
              </div>
              { isSignedIn ? (
                <button 
                  className="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded-md cursor-pointer"
                  onClick={handleCheckout}
                  disabled={isLoading}
                >
                  {isLoading ? "Processing..." : "Checkout"}
                </button>
              ) : (
                <SignInButton mode="modal">
                  <button className="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded-md">
                    Sign in to checkout
                  </button>
                </SignInButton>
              )}
            </div>
            <div className="h-64 lg:h-0">
            </div>
        </div>
    </div>
  )
}

export default CartPage