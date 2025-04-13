"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Eye, Heart, Star } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Add to cart logic would go here
    console.log("Added to cart:", product);
    
    // Show success message
    if (typeof window !== 'undefined') {
      // Using a more subtle notification instead of alert
      const notification = document.createElement('div');
      notification.className = 'fixed bottom-4 right-4 bg-black text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in-up';
      notification.textContent = `${product.name} added to cart!`;
      document.body.appendChild(notification);
      
      setTimeout(() => {
        notification.classList.add('animate-fade-out-down');
        setTimeout(() => {
          document.body.removeChild(notification);
        }, 500);
      }, 3000);
    }
  };
  
  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };
  
  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Quick view logic would go here
    if (typeof window !== 'undefined') {
      window.location.href = `/product/${product.slug}`;
    }
  };
  
  return (
    <motion.div 
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -8 }}
    >
      <Link href={`/product/${product.slug}`}>
        <div className="relative aspect-[4/5] rounded-xl overflow-hidden mb-5 shadow-sm group-hover:shadow-md transition-shadow">
          <div className="relative w-full h-full bg-gray-50">
            <Image 
              src={product.image} 
              alt={product.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          
          {/* Category badge */}
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium">
            {product.category}
          </div>
          
          {/* Overlay with actions */}
          <motion.div 
            className="absolute inset-0 bg-black/40 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
          >
            <motion.button 
              className="w-12 h-12 rounded-full bg-white flex items-center justify-center hover:bg-gray-100 transition-colors shadow-md"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleQuickView}
              aria-label="Quick view"
            >
              <Eye className="w-5 h-5" />
            </motion.button>
            <motion.button 
              className="w-12 h-12 rounded-full bg-white flex items-center justify-center hover:bg-gray-100 transition-colors shadow-md"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleAddToCart}
              aria-label="Add to cart"
            >
              <ShoppingCart className="w-5 h-5" />
            </motion.button>
            <motion.button 
              className={`w-12 h-12 rounded-full bg-white flex items-center justify-center hover:bg-gray-100 transition-colors shadow-md ${
                isFavorite ? "text-red-500" : ""
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleToggleFavorite}
              aria-label="Add to favorites"
            >
              <Heart className={`w-5 h-5 ${isFavorite ? "fill-red-500" : ""}`} />
            </motion.button>
          </motion.div>
          
          {/* Rating badge (if available) */}
          {product.rating && (
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 shadow-sm">
              <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
              <span>{product.rating.toFixed(1)}</span>
              <span className="text-gray-500">({product.reviewCount})</span>
            </div>
          )}
          
          {/* Stock indicator */}
          {product.stock && product.stock < 10 && (
            <div className="absolute bottom-4 right-4 bg-red-500/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-medium text-white shadow-sm">
              Only {product.stock} left
            </div>
          )}
        </div>
        
        <div className="space-y-2 px-1">
          <div className="flex justify-between items-start">
            <h3 className="font-medium text-lg transition-colors group-hover:text-black line-clamp-1">{product.name}</h3>
            <div className="text-lg font-semibold">{product.price}</div>
          </div>
          <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
          
          {/* Size indicators */}
          {product.sizes && (
            <div className="flex flex-wrap gap-1 mt-2">
              {product.sizes.slice(0, 5).map((size) => (
                <span key={size} className="text-xs px-2 py-1 bg-gray-100 rounded-md">
                  {size}
                </span>
              ))}
              {product.sizes.length > 5 && (
                <span className="text-xs px-2 py-1 bg-gray-100 rounded-md">
                  +{product.sizes.length - 5}
                </span>
              )}
            </div>
          )}
          
          {/* Color indicators */}
          {product.colors && (
            <div className="flex gap-1 mt-3">
              {product.colors.slice(0, 4).map((color) => (
                <div 
                  key={color.name}
                  className="w-4 h-4 rounded-full border border-gray-300"
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              ))}
              {product.colors.length > 4 && (
                <div className="w-4 h-4 rounded-full bg-gray-200 flex items-center justify-center text-[8px] font-medium">
                  +{product.colors.length - 4}
                </div>
              )}
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
