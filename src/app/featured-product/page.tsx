"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Star, ShoppingCart, Heart, Share2, Check } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/home/Header";

export default function FeaturedProductPage() {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState<"description" | "features" | "care">("description");
  const [selectedImage, setSelectedImage] = useState(0);

  const featuredProduct = {
    id: "featured-1",
    name: "Premium Signature Collection",
    description: "Limited edition designer piece with exceptional craftsmanship",
    price: "$299",
    originalPrice: "$399",
    discount: "25% OFF",
    category: "EXCLUSIVE",
    detailedDescription: "Our Premium Signature Collection represents the pinnacle of contemporary fashion. Each piece is meticulously crafted using the finest materials and cutting-edge techniques. The result is a garment that not only looks exceptional but feels extraordinary to wear. This limited edition release combines timeless elegance with modern design sensibilities, creating a versatile addition to any sophisticated wardrobe.",
    features: [
      "Handcrafted by master artisans",
      "Exclusive premium materials",
      "Signature detailing and finishes",
      "Sustainable production methods",
      "Limited edition numbering"
    ],
    material: "85% Premium Cotton, 12% Cashmere, 3% Elastane",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Midnight Black", hex: "#0a0a0a" },
      { name: "Ivory White", hex: "#f5f5f0" },
      { name: "Navy Blue", hex: "#0a192f" },
      { name: "Burgundy", hex: "#800020" }
    ],
    care: [
      "Dry clean only",
      "Store in garment bag when not in use",
      "Avoid direct sunlight for extended periods",
      "Handle with care to preserve detailing"
    ],
    images: [
      "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3",
      "https://images.unsplash.com/photo-1551489186-cf8726f514f8",
      "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8",
      "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126"
    ],
    rating: 4.9,
    reviewCount: 87,
    stock: 15,
    sku: "PSC-001-LTD"
  };

  const relatedProducts = [
    {
      id: 1,
      slug: "minimalist-jacket",
      name: "Minimalist Jacket",
      description: "Premium cotton blend with modern silhouette",
      price: "$189",
      image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea",
      category: "JACKET"
    },
    {
      id: 2,
      slug: "structured-blazer",
      name: "Structured Blazer",
      description: "Tailored fit with subtle texture detail",
      price: "$245",
      image: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8",
      category: "BLAZER"
    },
    {
      id: 3,
      slug: "casual-overshirt",
      name: "Casual Overshirt",
      description: "Versatile layering piece for any season",
      price: "$120",
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f",
      category: "SHIRT"
    },
    {
      id: 4,
      slug: "statement-coat",
      name: "Statement Coat",
      description: "Bold silhouette with premium wool blend",
      price: "$320",
      image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b",
      category: "COAT"
    }
  ];

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    // Add to cart logic would go here
    console.log("Added to cart:", {
      product: featuredProduct,
      size: selectedSize,
      color: selectedColor,
      quantity,
    });
    
    // Show success message
    alert("Product added to cart!");
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="px-3 sm:px-6 md:px-8 lg:px-16 xl:px-24 py-3 sm:py-4 md:py-6 lg:py-8">
        <Header />
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-black transition-colors flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </div>
        
        {/* Featured Product Banner */}
        <div className="relative w-full h-[200px] rounded-xl overflow-hidden mb-12 bg-black">
          <Image 
            src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e" 
            alt="Featured Collection"
            fill
            className="object-cover opacity-70"
            priority
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-sm tracking-widest mb-2"
            >
              FEATURED COLLECTION
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl font-medium"
            >
              Premium Signature Series
            </motion.h1>
          </div>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-12 mb-20">
          {/* Product Images */}
          <div className="w-full lg:w-3/5">
            <div className="flex gap-6">
              {/* Thumbnails */}
              <div className="flex flex-col gap-4">
                {featuredProduct.images.map((image, index) => (
                  <motion.div 
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-20 h-20 rounded-md overflow-hidden cursor-pointer border-2 ${
                      selectedImage === index ? "border-black" : "border-transparent"
                    }`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <Image
                      src={image}
                      alt={`${featuredProduct.name} view ${index + 1}`}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                ))}
              </div>
              
              {/* Main Image */}
              <div className="flex-1">
                <motion.div 
                  key={selectedImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="relative aspect-[3/4] rounded-lg overflow-hidden"
                >
                  <Image
                    src={featuredProduct.images[selectedImage]}
                    alt={featuredProduct.name}
                    fill
                    className="object-cover"
                    priority
                  />
                  
                  {/* Discount Badge */}
                  <div className="absolute top-4 right-4 bg-black text-white px-3 py-1 rounded-full text-sm">
                    {featuredProduct.discount}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
          
          {/* Product Details */}
          <div className="w-full lg:w-2/5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-2 text-sm tracking-widest text-gray-500">
                {featuredProduct.category}
              </div>
              
              <h1 className="text-4xl font-medium mb-2">{featuredProduct.name}</h1>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="text-2xl font-medium">{featuredProduct.price}</div>
                <div className="text-lg text-gray-500 line-through">{featuredProduct.originalPrice}</div>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${i < Math.floor(featuredProduct.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} 
                    />
                  ))}
                  <span className="text-sm text-gray-600 ml-1">({featuredProduct.reviewCount})</span>
                </div>
              </div>
              
              <div className="text-gray-600 mb-8">
                {featuredProduct.description}
              </div>
              
              {/* Limited Edition Badge */}
              <div className="flex items-center gap-2 bg-gray-100 px-4 py-3 rounded-lg mb-8">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <div className="text-sm font-medium">Limited Edition - Only {featuredProduct.stock} pieces available</div>
              </div>
              
              {/* Tabs */}
              <div className="flex border-b border-gray-200 mb-6">
                <button
                  className={`py-2 px-4 text-sm font-medium ${
                    activeTab === "description" ? "border-b-2 border-black" : "text-gray-500"
                  }`}
                  onClick={() => setActiveTab("description")}
                >
                  Description
                </button>
                <button
                  className={`py-2 px-4 text-sm font-medium ${
                    activeTab === "features" ? "border-b-2 border-black" : "text-gray-500"
                  }`}
                  onClick={() => setActiveTab("features")}
                >
                  Features
                </button>
                <button
                  className={`py-2 px-4 text-sm font-medium ${
                    activeTab === "care" ? "border-b-2 border-black" : "text-gray-500"
                  }`}
                  onClick={() => setActiveTab("care")}
                >
                  Care
                </button>
              </div>
              
              {/* Tab content */}
              <div className="mb-8">
                {activeTab === "description" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-gray-600"
                  >
                    <p className="mb-4">{featuredProduct.detailedDescription}</p>
                    <p>Material: {featuredProduct.material}</p>
                  </motion.div>
                )}
                
                {activeTab === "features" && (
                  <motion.ul
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="list-disc pl-5 text-gray-600 space-y-1"
                  >
                    {featuredProduct.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </motion.ul>
                )}
                
                {activeTab === "care" && (
                  <motion.ul
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="list-disc pl-5 text-gray-600 space-y-1"
                  >
                    {featuredProduct.care.map((instruction, index) => (
                      <li key={index}>{instruction}</li>
                    ))}
                  </motion.ul>
                )}
              </div>
              
              {/* Size selection */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm font-medium">Size</h3>
                  <button className="text-xs text-gray-500 underline">Size Guide</button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {featuredProduct.sizes.map((size) => (
                    <button
                      key={size}
                      className={`px-4 py-2 border rounded-md text-sm ${
                        selectedSize === size
                          ? "border-black bg-black text-white"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Color selection */}
              <div className="mb-6">
                <h3 className="text-sm font-medium mb-2">Color</h3>
                <div className="flex flex-wrap gap-3">
                  {featuredProduct.colors.map((color) => (
                    <button
                      key={color.name}
                      className={`w-8 h-8 rounded-full relative ${
                        selectedColor === color.name ? "ring-2 ring-offset-2 ring-black" : ""
                      }`}
                      style={{ backgroundColor: color.hex }}
                      onClick={() => setSelectedColor(color.name)}
                      aria-label={`Select ${color.name} color`}
                    >
                      {selectedColor === color.name && (
                        <span className="absolute inset-0 flex items-center justify-center">
                          <Check className="w-4 h-4 text-white" />
                        </span>
                      )}
                    </button>
                  ))}
                </div>
                {selectedColor && (
                  <p className="text-sm text-gray-500 mt-2">Selected: {selectedColor}</p>
                )}
              </div>
              
              {/* Stock and SKU */}
              <div className="flex justify-between text-sm text-gray-500 mb-6">
                <div>In Stock: {featuredProduct.stock}</div>
                <div>SKU: {featuredProduct.sku}</div>
              </div>
              
              {/* Quantity */}
              <div className="mb-8">
                <h3 className="text-sm font-medium mb-2">Quantity</h3>
                <div className="flex items-center border border-gray-300 rounded-md w-32">
                  <button
                    className="px-3 py-1 text-gray-500 hover:text-black"
                    onClick={decrementQuantity}
                  >
                    -
                  </button>
                  <input
                    type="text"
                    value={quantity}
                    readOnly
                    className="w-full text-center border-0 focus:ring-0"
                  />
                  <button
                    className="px-3 py-1 text-gray-500 hover:text-black"
                    onClick={incrementQuantity}
                  >
                    +
                  </button>
                </div>
              </div>
              
              {/* Action buttons */}
              <div className="flex gap-4 mb-8">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 bg-black text-white py-3 rounded-md hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="w-4 h-4" />
                  Add to Cart
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-3 rounded-md border ${
                    isFavorite
                      ? "bg-red-50 border-red-200 text-red-500"
                      : "border-gray-300 text-gray-500"
                  }`}
                  onClick={() => setIsFavorite(!isFavorite)}
                  aria-label="Add to favorites"
                >
                  <Heart
                    className={`w-5 h-5 ${isFavorite ? "fill-red-500 text-red-500" : ""}`}
                  />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 rounded-md border border-gray-300 text-gray-500"
                  aria-label="Share product"
                >
                  <Share2 className="w-5 h-5" />
                </motion.button>
              </div>
              
              {/* Delivery info */}
              <div className="border-t border-gray-200 pt-6 mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium">Express Delivery</div>
                    <div className="text-sm text-gray-500">1-2 business days</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21 16V8C20.9996 7.64927 20.9071 7.30481 20.7315 7.00116C20.556 6.69751 20.3037 6.44536 20 6.27L13 2.27C12.696 2.09446 12.3511 2.00205 12 2.00205C11.6489 2.00205 11.304 2.09446 11 2.27L4 6.27C3.69626 6.44536 3.44398 6.69751 3.26846 7.00116C3.09294 7.30481 3.00036 7.64927 3 8V16C3.00036 16.3507 3.09294 16.6952 3.26846 16.9988C3.44398 17.3025 3.69626 17.5546 4 17.73L11 21.73C11.304 21.9055 11.6489 21.9979 12 21.9979C12.3511 21.9979 12.696 21.9055 13 21.73L20 17.73C20.3037 17.5546 20.556 17.3025 20.7315 16.9988C20.9071 16.6952 20.9996 16.3507 21 16Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M3.27002 6.96L12 12.01L20.73 6.96" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 22.08V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium">Premium Returns</div>
                    <div className="text-sm text-gray-500">90-day return policy</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Related Products */}
        <div className="mb-20">
          <h2 className="text-2xl font-medium mb-8">You May Also Like</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((product) => (
              <Link key={product.id} href={`/product/${product.slug}`}>
                <motion.div 
                  className="group relative"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative aspect-[3/4] rounded-lg overflow-hidden mb-4">
                    <div className="relative w-full h-full">
                      <Image 
                        src={product.image} 
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    
                    {/* Overlay with actions */}
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-gray-100 transition-colors">
                        <ShoppingCart className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-500 mb-1">{product.category}</div>
                  <h3 className="font-medium mb-1">{product.name}</h3>
                  <div className="text-lg">{product.price}</div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
