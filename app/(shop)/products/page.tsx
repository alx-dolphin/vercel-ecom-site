import ProductsView from "@/components/ProductsView";
import { getAllCategories } from "@/sanity/lib/products/getAllCategories";
import { getAllProducts } from "@/sanity/lib/products/getAllProducts";

export const dynamic = "force-static";
export const revalidate = 60; // Revalidate at most every 60 seconds

export default async function ProductsPage() {
  const products = await getAllProducts();
  const categories = await getAllCategories();
  
  return (
    <div>
      <div className="mt-6 flex flex-col items-start max-w-7xl mx-auto justify-top min-h-screen p-4">
        <div className="w-full mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Our Products</h1>
          <p className="text-gray-600">Discover our complete range of premium gym equipment and fitness accessories</p>
        </div>
        <ProductsView products={products} categories={categories} />
      </div>
    </div>
  );
} 