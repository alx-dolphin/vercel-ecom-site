"use server";

import { CartItem } from "@/app/(shop)/store";
import stripe from "@/lib/stripe";
import { imageUrl } from "@/sanity/lib/imageUrl";

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

export async function createCheckoutSession(items: GroupedBasketItem[], metadata: Metadata) {
    try { 
        const itemsWithoutPrice = items.filter((item) => !item.product.price);
        if (itemsWithoutPrice.length > 0) {
            throw new Error("Some items do not have a price");
        }
        const customers = await stripe.customers.list({
            email: metadata.customerEmail,
            limit: 1,
        });
        let customerId:string | undefined;
        if (customers.data.length > 0) {
            customerId = customers.data[0].id;
        }

        const baseUrl = process.env.NODE_ENV === 'production' 
            ? `https://${process.env.VERCEL_URL}`
            : process.env.NEXT_PUBLIC_BASE_URL;

        const successUrl = `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}&orderNumber=${metadata.orderNumber}`;
        const cancelUrl = `${baseUrl}/cart`;

        const session = await stripe.checkout.sessions.create({
            customer: customerId,
            customer_creation: customerId ? undefined : "always",
            customer_email: !customerId ? metadata.customerEmail : undefined,
            metadata,
            mode:"payment",
            allow_promotion_codes: false,
            success_url: successUrl,
            cancel_url: cancelUrl,
            line_items: items.map((item) => ({
                price_data: {
                    currency: "GBP",
                    unit_amount: Math.round(item.product.price! * 100), //Stripe requires the price in pence
                    product_data: {
                        name: item.product.name || "Unnamed Product",
                        description: `Product ID: ${item.product._id}`,
                        metadata: {
                            id: item.product._id,
                        },
                        images: item.product.image ? [imageUrl(item.product.image).url()] : undefined,
                    },
                },
                quantity: item.quantity,
            })),
        });
        return session.url;
    } catch (error) {
        console.error(error);
        throw error;
    }
};