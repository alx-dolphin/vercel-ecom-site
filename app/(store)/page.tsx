import ProductsView from "@/components/ProductsView";
import { getAllCategories } from "@/sanity/lib/products/getAllCategories";
import { getAllProducts } from "@/sanity/lib/products/getAllProducts";

export default async function Home() {

  const products = await getAllProducts();
  const categories = await getAllCategories();

  //console.log(
    // crypto.randomUUID().slice(0,5)+
    // `> rerender with ${products.length} products`
  //);
  
  return (
    <div >
      <h1>Hello World 11</h1>
      <div className="flex flex-col items-center justify-top min-h-screen bg-gray-100 p-4">
        <ProductsView products={products} categories={[]} />
      </div>
    </div>
  );
}
