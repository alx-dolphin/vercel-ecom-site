import Link from "next/link";
import { getAllProducts } from "@/sanity/lib/products/getAllProducts";
import ProductThumbnail from "@/components/ProductThumbnail";
import { Product } from "@/sanity.types";

export const dynamic = "force-static";
export const revalidate = 60; // Revalidate at most every 60 seconds, in reality would probably be much higher

export default async function Home() {
  const allProducts = await getAllProducts();
  const featuredProducts = allProducts.slice(0, 5); // first 5 products

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 py-24 sm:py-32">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl font-semibold mb-6">
              Transform Your Fitness Journey
            </h1>
            <p className="text-xl sm:text-2xl mb-8 text-gray-300 max-w-3xl mx-auto">
              Premium gym equipment and fitness accessories to help you achieve your goals. 
              Professional quality, built to last.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/products" 
                className="bg-white text-black px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors"
              >
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-black mb-2">New Arrivals</h2>
              <p className="text-gray-700">Check out our latest premium fitness equipment</p>
            </div>
            {/* Desktop button - hidden on mobile */}
            <Link 
              href="/products" 
              className="hidden sm:flex bg-black text-white px-6 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors"
            >
              View All Products
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {featuredProducts.map((product: Product, index: number) => (
              <div 
                key={product._id} 
                className={index >= 3 ? "hidden sm:block" : ""}
              >
                <ProductThumbnail product={product} />
              </div>
            ))}
          </div>
          
          {/* Mobile button - centered and shown only on mobile */}
          <div className="flex justify-center mt-8 sm:hidden">
            <Link 
              href="/products" 
              className="bg-black text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-800 transition-colors"
            >
              View All Products
            </Link>
          </div>
          
          {featuredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600">No products available at the moment.</p>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-black mb-4">Why Choose GymDolphin?</h2>
            <p className="text-gray-700 text-lg">Experience the difference with our premium fitness solutions</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-black">Premium Quality</h3>
              <p className="text-gray-700">Professional-grade equipment built to withstand intensive use and deliver lasting performance.</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-black">Fast Shipping</h3>
              <p className="text-gray-700">Quick and reliable delivery to get your fitness journey started without delay.</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.5a9.5 9.5 0 100 19 9.5 9.5 0 000-19z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-black">Expert Support</h3>
              <p className="text-gray-700">Get guidance from fitness professionals to choose the right equipment for your goals.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold text-black mb-4">Ready to Start Your Fitness Journey?</h2>
          <p className="text-gray-700 text-lg mb-8">
            Join thousands of satisfied customers who have transformed their fitness with our premium equipment.
          </p>
          <Link 
            href="/products" 
            className="bg-black text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-800 transition-colors inline-block"
          >
            Explore Our Products
          </Link>
        </div>
      </section>
    </div>
  );
}
