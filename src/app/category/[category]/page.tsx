"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Header } from "@/components/home/Header";
import { ProductCard } from "@/components/product/ProductCard";
import { products } from "@/data/products";
import { Product } from "@/types/product";
import Link from "next/link";

export default function CategoryPage() {
  const { category } = useParams();
  const [categoryProducts, setCategoryProducts] = useState<Product[]>([]);
  
  useEffect(() => {
    if (typeof category === "string") {
      const filteredProducts = products.filter(
        p => p.category.toLowerCase() === category.toLowerCase()
      );
      setCategoryProducts(filteredProducts);
    }
  }, [category]);
  
  const categoryName = typeof category === "string" 
    ? category.charAt(0).toUpperCase() + category.slice(1).toLowerCase() 
    : "";
  
  return (
    <div className="min-h-screen bg-white">
      <div className="px-3 sm:px-6 md:px-8 lg:px-16 xl:px-24 py-3 sm:py-4 md:py-6 lg:py-8">
        <Header />
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-black transition-colors">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-black transition-colors">Shop</Link>
          <span>/</span>
          <span className="text-black">{categoryName}</span>
        </div>
        
        {/* Category Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-medium mb-4">{categoryName} Collection</h1>
          <p className="text-gray-600 max-w-3xl">
            Explore our premium selection of {categoryName.toLowerCase()} pieces, designed with attention to detail and crafted from the finest materials for exceptional quality and style.
          </p>
        </div>
        
        {/* Products Grid */}
        {categoryProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-20">
            {categoryProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="text-2xl font-medium mb-4">No products found</div>
            <p className="text-gray-600 mb-8">We couldn't find any products in this category.</p>
            <Link 
              href="/shop" 
              className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition-colors"
            >
              Browse All Products
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
