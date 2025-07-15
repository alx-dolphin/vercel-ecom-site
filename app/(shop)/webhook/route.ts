//https://docs.stripe.com/stripe-cli?install-method=homebrew

import { Metadata } from "@/actions/createCheckoutSession";
import stripe from "@/lib/stripe";
import { backendClient } from "@/sanity/lib/backendClient";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(request: NextRequest) {
    const body = await request.text();
    const headersList = await headers();
    const signature = headersList.get("stripe-signature");

    if (!signature) {
        return NextResponse.json({ error: "Missing Stripe signature" }, { status: 400 });
    }

    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!webhookSecret) {
        console.log("Missing Stripe webhook secret");
        return NextResponse.json({ error: "Missing Stripe webhook secret" }, { status: 400 });
    }

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (error) {
        console.error("Error constructing event", error);
        return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    if (event.type === "checkout.session.completed") {
        const session = event.data.object as Stripe.Checkout.Session;

        try {
            const order = await createOrderInSanity(session);
            console.log("Order successfully created in Sanity", order);
        } catch (error) {
            console.error("Error creating order in Sanity", error);
            return NextResponse.json({ error: "Error creating order in Sanity" }, { status: 500 });
        }
    }

    return NextResponse.json({ received: true });
}

async function createOrderInSanity(session: Stripe.Checkout.Session) { 
    const {
        id,
        amount_total,
        currency,
        metadata,
        payment_intent,
        customer,
    } = session;
    const {orderNumber, customerName, customerEmail, clerkUserId} = metadata as Metadata;
    
    const lineItemsWithProduct = await stripe.checkout.sessions.listLineItems(
        id, {
            expand: ["data.price.product"],
        }
    );

    const sanityProducts = lineItemsWithProduct.data.map((item) => ({
        _key: crypto.randomUUID(),
        product: {
            _type: "reference",
            _ref: (item.price?.product as Stripe.Product)?.metadata?.id,
        },
        quantity: item.quantity || 0,
    }));
    
    const order = await backendClient.create({
        _type: "order",
        orderNumber,
        stripeCheckoutSessionId: id,
        stripePaymentIntentId: payment_intent,
        customerName,
        stripeCustomerId: customer,
        clerkUserId: clerkUserId,
        customerEmail: customerEmail,
        currency,
        products: sanityProducts,
        totalAmount: amount_total ? amount_total / 100 : 0,
        status: "paid",
        orderDate: new Date().toISOString(),
    });

    return order;
}