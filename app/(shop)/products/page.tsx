import Loader from "@/components/Loader";
import ProductsView from "@/components/ProductsView";
import { Suspense } from "react";

export const dynamic = "force-static";
export const revalidate = 900; // 15 minutes

export default async function ProductsPage() {
  
  return (
    <div>
      <div className="mt-6 flex flex-col items-start max-w-7xl mx-auto justify-top min-h-screen p-4">
        <div className="w-full mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Our Products</h1>
          <p className="text-gray-600">Discover our complete range of premium gym equipment and fitness accessories</p>
        </div>
        <Suspense fallback={<Loader />}>
          <ProductsView/>
        </Suspense>
      </div>
    </div>
  );
} 