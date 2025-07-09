import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
  // https://www.sanity.io/docs/stega
  stega: {
    // if deployed on vercel, use the vercel url
    // if not, use the base url
    studioUrl: process.env.VERCEL_URL
     ? `https://${process.env.VERCEL_URL}/studio` 
     : `${process.env.NEXT_PUBLIC_BASE_URL}/studio`,
  }
})
