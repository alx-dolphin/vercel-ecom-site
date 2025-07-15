"use server";

import { CartItem } from "@/app/(shop)/store";

export type Metadata = {
    orderNumber: string;
    customerName: string;
    customerEmail: string;
    clerkUserId: string;
  };
  
  export type GroupedBasketItem = {
    product: CartItem["product"];
    quantity: number;
  }

export async function createCheckoutSession(groupedItems: GroupedBasketItem[], metadata: Metadata) {
    try { 
        const itemsWithoutPrice = groupedItems.filter((item) => !item.product.price);
        if (itemsWithoutPrice.length > 0) {
            throw new Error("Some items do not have a price");
        }

    } catch (error) {
        console.error(error);
        throw error;
    }
};