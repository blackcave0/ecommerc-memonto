"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Heart, ShoppingCart, Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    id: number;
    name: string;
    description: string;
    price: string;
    image: string;
    category: string;
    detailedDescription?: string;
    features?: string[];
    sizes?: string[];
    colors?: { name: string; hex: string }[];
    material?: string;
    care?: string[];
  };
}

export function ProductModal({ isOpen, onClose, product }: ProductModalProps) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState<"description" | "features" | "care">("description");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Generate additional product images based on the main image
  const productImages = [
    product.image,
    `https://images.unsplash.com/photo-1552374196-c4e7ffc6e126`,
    `https://images.unsplash.com/photo-1515886657613-9f3515b0c78f`,
    `https://images.unsplash.com/photo-1539109136881-3be0616acf4b`,
  ];

  // Close modal on escape key press
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("keydown", handleEscKey);
      
      // Prevent body scrolling when modal is open
      if (isOpen) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("keydown", handleEscKey);
        document.body.style.overflow = "auto";
      }
    };
  }, [isOpen, onClose]);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setSelectedSize(null);
      setSelectedColor(null);
      setQuantity(1);
      setActiveTab("description");
      setCurrentImageIndex(0);
    }
  }, [isOpen]);

  const handleAddToCart = () => {
    // Add to cart logic would go here
    console.log("Added to cart:", {
      product,
      size: selectedSize,
      color: selectedColor,
      quantity,
    });
    
    // Show success message or close modal
    onClose();
  };

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  // Default product details if not provided
  const detailedDescription = product.detailedDescription || 
    "This premium product exemplifies our commitment to quality and style. Crafted with meticulous attention to detail, it combines contemporary design with exceptional comfort. Perfect for everyday wear or special occasions, this versatile piece will elevate your wardrobe.";
  
  const features = product.features || [
    "Premium quality materials",
    "Ethically manufactured",
    "Durable construction",
    "Versatile design",
    "Comfortable fit"
  ];
  
  const sizes = product.sizes || ["XS", "S", "M", "L", "XL"];
  
  const colors = product.colors || [
    { name: "Black", hex: "#000000" },
    { name: "Navy", hex: "#0a192f" },
    { name: "Gray", hex: "#808080" },
    { name: "Beige", hex: "#f5f5dc" }
  ];
  
  const care = product.care || [
    "Machine wash cold with similar colors",
    "Do not bleach",
    "Tumble dry low",
    "Cool iron if needed",
    "Do not dry clean"
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-6xl max-h-[90vh] overflow-auto bg-white rounded-xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col lg:flex-row">
              {/* Left: Product Images */}
              <div className="w-full lg:w-1/2 p-6">
                <div className="relative aspect-[3/4] rounded-lg overflow-hidden mb-4">
                  <div className="relative w-full h-full">
                    <motion.div
                      key={currentImageIndex}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="w-full h-full"
                    >
                      <Image
                        src={productImages[currentImageIndex]}
                        alt={product.name}
                        fill
                        className="object-cover"
                        priority
                      />
                    </motion.div>
                  </div>
                </div>
                
                {/* Thumbnail images */}
                <div className="flex gap-2 mt-4">
                  {productImages.map((img, index) => (
                    <div
                      key={index}
                      className={`relative w-20 h-20 rounded-md overflow-hidden cursor-pointer border-2 ${
                        currentImageIndex === index ? "border-black" : "border-transparent"
                      }`}
                      onClick={() => setCurrentImageIndex(index)}
                    >
                      <div className="relative w-full h-full">
                        <Image
                          src={img}
                          alt={`${product.name} view ${index + 1}`}
                          width={80}
                          height={80}
                          className="object-cover"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Product Details */}
              <div className="w-full lg:w-1/2 p-6 lg:p-8 flex flex-col">
                <div className="mb-2 text-sm tracking-widest text-gray-500">
                  {product.category}
                </div>
                
                <h2 className="text-3xl font-medium mb-2">{product.name}</h2>
                
                <div className="text-2xl font-medium mb-6">{product.price}</div>
                
                {/* Tabs */}
                <div className="flex border-b border-gray-200 mb-4">
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
                <div className="mb-6">
                  {activeTab === "description" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-gray-600"
                    >
                      <p className="mb-4">{detailedDescription}</p>
                      <p>Material: {product.material || "Premium cotton blend"}</p>
                    </motion.div>
                  )}
                  
                  {activeTab === "features" && (
                    <motion.ul
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="list-disc pl-5 text-gray-600 space-y-1"
                    >
                      {features.map((feature, index) => (
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
                      {care.map((instruction, index) => (
                        <li key={index}>{instruction}</li>
                      ))}
                    </motion.ul>
                  )}
                </div>
                
                {/* Size selection */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium mb-2">Size</h3>
                  <div className="flex flex-wrap gap-2">
                    {sizes.map((size) => (
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
                    {colors.map((color) => (
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
                <div className="flex gap-4 mt-auto">
                  <div className="flex gap-4 mt-auto">
                    <button
                      className="flex-1 bg-black text-white py-3 rounded-md hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                      onClick={handleAddToCart}
                    >
                      <ShoppingCart className="w-4 h-4" />
                      Add to Cart
                    </button>
                    <Link href={`/product/${product.id}`} className="flex-1">
                      <button
                        className="w-full bg-gray-100 text-black py-3 rounded-md hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                      >
                        View Details
                      </button>
                    </Link>
                  </div>
                  <button
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
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
