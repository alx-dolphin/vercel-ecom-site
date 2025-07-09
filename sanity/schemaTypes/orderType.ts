import { ClipboardIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const orderType = defineType({
    name: "order",
    title: "Order",
    type: "document",
    icon: ClipboardIcon,
    fields: [
        defineField({
            name: "orderNumber",
            title: "Order Number",
            type: "string",
        }),
        defineField({
            name: "stripeCustomerId",
            title: "Stripe Customer ID",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "stripePaymentIntentId",
            title: "Stripe Payment Intent ID",
            type: "string",
        }),
        defineField({
            name: "stripeCheckoutSessionId",
            title: "Stripe Checkout Session ID",
            type: "string",
        }),
        defineField({
            name: "clerkUserId",
            title: "Store User ID",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "customerName",
            title: "Customer Name",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "customerEmail",
            title: "Customer Email",
            type: "string",
            validation: (Rule) => Rule.required().email(),
        }),
        defineField({
            name: "products",
            title: "Products",
            type: "array",
            // https://www.sanity.io/docs/studio/array-type
            of: [
                defineArrayMember({
                    type: "object",
                    fields: [
                        defineField({
                            name: "product",
                            title: "Product Sold",
                            type: "reference",
                            to: [{ type: "product" }],
                        }),
                        defineField({
                            name: "quantity",
                            title: "Quantity",
                            type: "number",
                        }),
                    ],
                    preview: {
                        select: {
                            title: "product.name",
                            subtitle: "quantity",
                            image: "product.image",
                            price: "product.price",
                            currency: "product.currency",

                        },
                        prepare(select) {
                            return {
                                title: '$(select.product) x $(select.quantitys}',
                                subtitle: '${select.price * select.quantity}',
                                media: select.image,
                            };
                        },
                    },
                }),
            ],
        }),
        defineField({
            name: "totalAmount",
            title: "Total Amount",
            type: "number",
            validation: (Rule) => Rule.required().min(0),
        }),
        defineField({
            name: "currency",
            title: "Currency",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "discountAmount",
            title: "Discount Amount",
            type: "number",
            validation: (Rule) => Rule.min(0),
        }),
        defineField({
            name: "discountCode",
            title: "Discount Code",
            type: "string",
        }),
        defineField({
            name: "status",
            title: "Status",
            type: "string",
            options: {
                list: [
                    { title: "Pending", value: "pending" },
                    { title: "Paid", value: "paid" }, 
                    { title: "Shipped", value: "shipped" },
                    { title: "Delivered", value: "delivered" },    
                    { title: "Cancelled", value: "cancelled" },
                ],
            },
        }),
        defineField({
            name: "orderDate",
            title: "Order Date",
            type: "datetime",
            validation: (Rule) => Rule.required(),
        }),
    ],
    preview: {
        select: {
            name: "customerName",
            amount: "totalPrice",
            currency: "currency",
            orderId: "orderNumber",
            email: "customerEmail",
        },
        prepare(select) {
            const orderId = select.orderId.slice(0, 6);
            return {
                title: `${select.name} - ${orderId}`,
                subtitle: `${select.amount}, ${select.currency}, ${select.email}`,
                media: ClipboardIcon,
            };
        },
    },
});