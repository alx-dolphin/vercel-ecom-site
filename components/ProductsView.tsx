import ProductsGrid from "./ProductsGrid";
import { CategorySelector } from "./CategorySelector";
import { getAllProducts } from "@/sanity/lib/products/getAllProducts";
import { getAllCategories } from "@/sanity/lib/products/getAllCategories";
import { getProductsByCategory } from "@/sanity/lib/products/getProductsByCategory";

interface ProductsViewProps {
  categorySlug?: string;
}

const ProductsView = async ({ categorySlug }: ProductsViewProps = {}) => {
  // Fetch categories - always needed
  const categories = await getAllCategories();
  
  // Fetch products based on whether we have a category slug
  const products = categorySlug 
    ? await getProductsByCategory(categorySlug)
    : await getAllProducts();

	console.log("categories", categories);

  return (
    <div className="flex flex-col">
      {/* Categories */}
      <div className="w-full md:w-[200px]">
			  <CategorySelector categories={categories} />
      </div>

      {/* Products */}
    	<div className="flex-1">
        <div>
            <ProductsGrid products={products} />
            {/* <hr className="w-1/2 sm:w-3/4"/> */}
        </div>
    	</div>
    </div>
  )
}

export default ProductsView