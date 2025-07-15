'use client';

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import useBasketStore from "@/app/(shop)/store";

function SuccessPage() {
    const searchParams = useSearchParams();
    const orderNumber = searchParams.get("orderNumber");
    const clearCart = useBasketStore((state) => state.clearCart);

    useEffect(() => {
        if (orderNumber) {
            clearCart();
        }
    }, [orderNumber, clearCart]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
            <div className="bg-white p-12 rounded-xl shadow-lg max-w-2xl w-full mx-4">
                <div className="flex justify-center mb-8">
                    <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
                        <svg
                            className="h-8 w-8 text-green-600"
                            fill="none"
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                    </div>
                </div>
                <h1 className="text-3xl font-bold text-center text-gray-900 mb-4">
                    Order Successful!
                </h1>
                {orderNumber && (
                    <p className="text-center text-gray-600 mb-8">
                        Order Number: {orderNumber}
                    </p>
                )}
                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                    <Button asChild className="w-full sm:w-auto">
                        <Link href="/">Continue Shopping</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default SuccessPage;