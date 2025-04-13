"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, ChevronDown, X, Check, Search, ArrowLeft, ArrowRight } from "lucide-react";
import { Header } from "@/components/home/Header";
import { ProductCard } from "@/components/product/ProductCard";
import { products } from "@/data/products";
import { Pagination } from "@/components/ui/Pagination";
import Image from "next/image";
import Link from "next/link";

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string>("featured");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6); // Show more products per page
  
  const categories = Array.from(new Set(products.map(p => p.category)));
  
  // Filter products based on all criteria
  const filteredProducts = products.filter(product => {
    // Category filter
    if (activeCategory && product.category !== activeCategory) return false;
    
    // Price filter
    const productPrice = parseFloat(product.price.replace(/[^0-9.]/g, ''));
    if (productPrice < priceRange[0] || productPrice > priceRange[1]) return false;
    
    // Size filter
    if (selectedSizes.length > 0 && product.sizes) {
      if (!selectedSizes.some(size => product.sizes?.includes(size))) return false;
    }
    
    // Color filter
    if (selectedColors.length > 0 && product.colors) {
      if (!selectedColors.some(color => product.colors?.some(c => c.name === color))) return false;
    }
    
    // Search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        product.name.toLowerCase().includes(query) || 
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
      );
    }
    
    return true;
  });
    
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return parseFloat(a.price.replace(/[^0-9.]/g, '')) - parseFloat(b.price.replace(/[^0-9.]/g, ''));
      case "price-high":
        return parseFloat(b.price.replace(/[^0-9.]/g, '')) - parseFloat(a.price.replace(/[^0-9.]/g, ''));
      case "rating":
        return (b.rating ?? 0) - (a.rating ?? 0);
      default:
        return 0;
    }
  });
  
  const toggleSize = (size: string) => {
    setSelectedSizes(prev => 
      prev.includes(size) 
        ? prev.filter(s => s !== size) 
        : [...prev, size]
    );
    setCurrentPage(1); // Reset to first page when filter changes
  };
  
  const toggleColor = (color: string) => {
    setSelectedColors(prev => 
      prev.includes(color) 
        ? prev.filter(c => c !== color) 
        : [...prev, color]
    );
    setCurrentPage(1); // Reset to first page when filter changes
  };
  
  const resetFilters = () => {
    setActiveCategory(null);
    setPriceRange([0, 500]);
    setSelectedSizes([]);
    setSelectedColors([]);
    setSearchQuery("");
    setCurrentPage(1); // Reset to first page
  };
  
  const allColors = Array.from(
    new Set(
      products
        .flatMap(p => p.colors ?? [])
        .map(c => c.name)
    )
  );
  
  const allSizes = Array.from(
    new Set(
      products
        .flatMap(p => p.sizes ?? [])
    )
  );
  
  return (
    <div className="min-h-screen bg-white">
      <div className="px-3 sm:px-6 md:px-8 lg:px-16 xl:px-24 py-3 sm:py-4 md:py-6 lg:py-8">
        <Header />
        
        {/* Hero Section */}
        <div className="relative h-80 rounded-xl overflow-hidden mb-12">
          <Image 
            src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04" 
            alt="Shop Collection"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center text-white">
            <h1 className="text-4xl font-bold mb-4">Our Collection</h1>
            <p className="text-lg max-w-lg text-center">
              Discover our carefully curated selection of premium clothing designed for style and comfort
            </p>
          </div>
        </div>
        
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1); // Reset to first page when search changes
              }}
              className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
        
        {/* Filters and Sorting */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
          <div className="flex items-center gap-4">
            <button 
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              onClick={() => setFiltersOpen(!filtersOpen)}
            >
              <Filter className="w-4 h-4" />
              <span>Filters</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${filtersOpen ? "rotate-180" : ""}`} />
            </button>
            
            <div className="flex flex-wrap gap-2">
              <button 
                className={`px-3 py-1 rounded-full text-sm ${activeCategory === null ? "bg-black text-white" : "bg-gray-100 hover:bg-gray-200 transition-colors"}`}
                onClick={() => {
                  setActiveCategory(null);
                  setCurrentPage(1); // Reset to first page
                }}
              >
                All
              </button>
              {categories.map(category => (
                <button 
                  key={category}
                  className={`px-3 py-1 rounded-full text-sm ${activeCategory === category ? "bg-black text-white" : "bg-gray-100 hover:bg-gray-200 transition-colors"}`}
                  onClick={() => {
                    setActiveCategory(category);
                    setCurrentPage(1); // Reset to first page
                  }}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {(selectedSizes.length > 0 || selectedColors.length > 0 || activeCategory || searchQuery) && (
              <button 
                onClick={resetFilters}
                className="text-sm text-gray-500 hover:text-black flex items-center gap-1"
              >
                <X className="w-4 h-4" />
                Clear filters
              </button>
            )}
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Sort by:</span>
              <select 
                className="border border-gray-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-black"
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  setCurrentPage(1); // Reset to first page when sort changes
                }}
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Active Filters */}
        {(selectedSizes.length > 0 || selectedColors.length > 0) && (
          <div className="flex flex-wrap gap-2 mb-6">
            {selectedSizes.map(size => (
              <div key={size} className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                <span>Size: {size}</span>
                <button onClick={() => toggleSize(size)}>
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
            
            {selectedColors.map(color => (
              <div key={color} className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                <span>Color: {color}</span>
                <button onClick={() => toggleColor(color)}>
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
        
        {/* Filter Panel */}
        <AnimatePresence>
          {filtersOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-gray-50 p-6 rounded-lg mb-8 overflow-hidden"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h3 className="font-medium mb-4">Price Range</h3>
                  <div className="flex items-center gap-4">
                    <input 
                      type="range" 
                      min="0" 
                      max="500" 
                      value={priceRange[1]}
                      onChange={(e) => {
                        setPriceRange([priceRange[0], parseInt(e.target.value)]);
                        setCurrentPage(1); // Reset to first page when price range changes
                      }}
                      className="w-full accent-black" 
                    />
                  </div>
                  <div className="flex justify-between mt-2 text-sm text-gray-500">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-4">Size</h3>
                  <div className="grid grid-cols-4 gap-2">
                    {allSizes.map(size => (
                      <button 
                        key={size}
                        className={`px-3 py-1.5 border rounded-md transition-colors ${
                          selectedSizes.includes(size) 
                            ? "bg-black text-white border-black" 
                            : "border-gray-300 hover:bg-gray-100"
                        }`}
                        onClick={() => toggleSize(size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-4">Color</h3>
                  <div className="flex flex-wrap gap-3">
                    {allColors.map(colorName => {
                      const colorObj = products
                        .flatMap(p => p.colors ?? [])
                        .find(c => c.name === colorName);
                      
                      return (
                        <button
                          key={colorName}
                          className={`w-8 h-8 rounded-full border relative ${
                            selectedColors.includes(colorName) 
                              ? "ring-2 ring-offset-2 ring-black" 
                              : "border-gray-300"
                          }`}
                          style={{ backgroundColor: colorObj?.hex ?? "#000000" }}
                          onClick={() => toggleColor(colorName)}
                          aria-label={`Filter by ${colorName}`}
                        >
                          {selectedColors.includes(colorName) && (
                            <span className="absolute inset-0 flex items-center justify-center">
                              <Check className="w-4 h-4 text-white" />
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end mt-6">
                <button 
                  onClick={() => setFiltersOpen(false)}
                  className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition-colors"
                >
                  Apply Filters
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Products Count */}
        <div className="mb-6">
          <p className="text-gray-500">
            Showing {Math.min(itemsPerPage, sortedProducts.length - (currentPage - 1) * itemsPerPage)} of {sortedProducts.length} {sortedProducts.length === 1 ? 'product' : 'products'}
            {activeCategory ? ` in ${activeCategory}` : ''}
            {searchQuery ? ` for "${searchQuery}"` : ''}
            {sortedProducts.length > itemsPerPage ? ` (Page ${currentPage})` : ''}
          </p>
        </div>
        
        {/* Products Grid */}
        {sortedProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-16">
              <AnimatePresence mode="wait">
                <motion.div 
                  key={currentPage}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 w-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {sortedProducts
                    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                    .map((product, index) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                      >
                        <ProductCard product={product} />
                      </motion.div>
                    ))}
                </motion.div>
              </AnimatePresence>
            </div>
            
            {/* Product count indicator */}
            <div className="text-center mb-8">
              <motion.div 
                className="inline-block bg-black text-white px-8 py-3 rounded-full shadow-md"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                key={currentPage}
              >
                <span className="font-medium">
                  Page {currentPage} of {Math.ceil(sortedProducts.length / itemsPerPage)}
                </span>
              </motion.div>
              <motion.div 
                className="mt-3 text-sm text-gray-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Showing {Math.min(itemsPerPage, sortedProducts.length - (currentPage - 1) * itemsPerPage)} out of {sortedProducts.length} products
              </motion.div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 mb-12">
            <div className="text-2xl font-medium mb-4">No products found</div>
            <p className="text-gray-600 mb-8 text-center">
              We couldn't find any products matching your criteria.<br />
              Try adjusting your filters or search query.
            </p>
            <button 
              onClick={resetFilters}
              className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
        
        {/* Pagination */}
        {sortedProducts.length > 0 && (
          <div className="border-t border-gray-200 pt-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Pagination 
                totalItems={sortedProducts.length} 
                itemsPerPage={itemsPerPage} 
                onPageChange={(page) => {
                  setCurrentPage(page);
                  // Scroll to top when page changes
                  if (typeof window !== 'undefined') {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
                initialPage={currentPage}
              />
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
