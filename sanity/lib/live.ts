// This is what powers the live content api, so when changes are made in the CMS/studio, 
// the changes are reflected in the site instance (local or live)
// https://github.com/sanity-io/next-sanity#live-content-api 

import "server-only";
import { defineLive } from "next-sanity/live";
import { client } from './client'

const token = process.env.SANITY_API_READ_TOKEN;
if (!token) {
    throw new Error("Missing SANITY_API_READ_TOKEN");
}

export const { sanityFetch, SanityLive } = defineLive({ 
    client,
    serverToken: token,
    browserToken: token,
    fetchOptions: {
        revalidate: 0,
    },
});
