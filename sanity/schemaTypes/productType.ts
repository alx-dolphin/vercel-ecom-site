import { TrolleyIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const productType = defineType({
    name: "product",
    title: "Product",
    type: "document",
    icon: TrolleyIcon,
    fields: [
        defineField({
            name: "name",
            title: "Product Name",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "slug",
            title: "Slug",
            type: "slug",
            options: {
                source: "title",
                maxLength: 96,
            }
        }),
        defineField({
            name: "image",
            title: "Product Image",
            type: "image",
            options: {
                hotspot: true,
            }
        }),
        defineField({
            // Have separate thumbnail for product grid for optimization
            name: "thumbnail",
            title: "Product Thumbnail",
            type: "image",
            options: {
                hotspot: true,
            }
        }),
        defineField({
            name: "description",
            title: "Description",
            type: "blockContent",
        }),
        defineField({
            name: "price",
            title: "Price",
            type: "number",
            validation: (Rule) => Rule.required().min(0),
        }),
        defineField({
            name: "categories",
            title: "Categories",
            type: "array",
            of: [{ type: "reference", to: { type: "category" } }],
        }),
        defineField({
            name: "stock",
            title: "Stock",
            type: "number",
            validation: (Rule) => Rule.min(0),
        }),
    ],

    // Product Type Preview
    preview: {
        select: {
            title: "name",
            subtitle: "price",
            media: "image",
        },
        prepare(select) {
            return {
                title: select.title,
                // change currency based on locale?
                subtitle: `£${select.subtitle}`,
                media: select.media,
            };
        },
    },
});