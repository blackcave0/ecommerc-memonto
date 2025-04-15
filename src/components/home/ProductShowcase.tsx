"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProductModal } from "./ProductModal";
import Link from "next/link";
import Image from "next/image";

interface Product {
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
}

export function ProductShowcase() {
  const products: Product[] = [
    {
      id: 1,
      name: "Minimalist Jacket",
      description: "Premium cotton blend with modern silhouette",
      price: "$189",
      image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea",
      category: "JACKET",
      detailedDescription: "Our Minimalist Jacket combines sleek design with exceptional functionality. Crafted from premium cotton blend fabric, it features a modern silhouette that effortlessly transitions from casual to formal settings. The clean lines and subtle detailing make this a versatile addition to any wardrobe.",
      features: [
        "Water-resistant outer shell",
        "Breathable fabric technology",
        "Hidden interior pockets",
        "Adjustable cuffs",
        "Reinforced stitching for durability"
      ],
      material: "65% Cotton, 30% Polyester, 5% Elastane",
      sizes: ["XS", "S", "M", "L", "XL", "XXL"],
      colors: [
        { name: "Black", hex: "#000000" },
        { name: "Navy", hex: "#0a192f" },
        { name: "Olive", hex: "#556b2f" },
        { name: "Sand", hex: "#c2b280" }
      ],
      care: [
        "Machine wash cold with similar colors",
        "Do not bleach",
        "Tumble dry low",
        "Cool iron if needed",
        "Do not dry clean"
      ]
    },
    {
      id: 2,
      name: "Structured Blazer",
      description: "Tailored fit with subtle texture detail",
      price: "$245",
      image: "https://images.unsplash.com/photo-1550614000-4895a10e1bfd?q=80&w=1974&auto=format&fit=crop",
      category: "BLAZER",
      detailedDescription: "The Structured Blazer redefines contemporary elegance with its impeccable tailoring and subtle texture. Designed to create a refined silhouette, this blazer features precision cuts and thoughtful details that elevate any outfit. Perfect for professional settings or sophisticated casual occasions.",
      features: [
        "Half-canvas construction for shape retention",
        "Notched lapels with pick stitching",
        "Four-button functional cuffs",
        "Double-vented back for ease of movement",
        "Interior pocket system"
      ],
      material: "78% Wool, 20% Polyester, 2% Elastane",
      sizes: ["S", "M", "L", "XL", "XXL"],
      colors: [
        { name: "Charcoal", hex: "#36454f" },
        { name: "Navy", hex: "#0a192f" },
        { name: "Burgundy", hex: "#800020" },
        { name: "Forest", hex: "#228b22" }
      ]
    },
    {
      id: 3,
      name: "Casual Overshirt",
      description: "Versatile layering piece for any season",
      price: "$120",
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f",
      category: "SHIRT",
      detailedDescription: "Our Casual Overshirt is the ultimate versatile layering piece, designed to transition seamlessly between seasons. With its relaxed fit and premium fabric, it works equally well as a light jacket or a statement shirt. The thoughtful details and expert construction ensure both style and longevity.",
      features: [
        "Brushed cotton fabric for softness",
        "Reinforced button placket",
        "Chest and side pockets",
        "Adjustable cuffs",
        "Extended back hem"
      ],
      sizes: ["XS", "S", "M", "L", "XL"],
      colors: [
        { name: "Indigo", hex: "#3f5d9d" },
        { name: "Rust", hex: "#b7410e" },
        { name: "Sage", hex: "#b2ac88" },
        { name: "Stone", hex: "#928e85" }
      ]
    },
    {
      id: 4,
      name: "Statement Coat",
      description: "Bold silhouette with premium wool blend",
      price: "$320",
      image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b",
      category: "COAT",
      detailedDescription: "The Statement Coat makes a bold impression with its distinctive silhouette and luxurious wool blend. Designed to be both a functional winter layer and a fashion statement, this coat features architectural lines and premium details. The oversized fit allows for comfortable layering while maintaining an elegant drape.",
      features: [
        "Premium wool blend for warmth",
        "Satin lining for comfort and ease",
        "Concealed front closure",
        "Deep side pockets",
        "Dropped shoulder design"
      ],
      material: "70% Wool, 20% Polyester, 10% Cashmere",
      sizes: ["XS", "S", "M", "L", "XL"],
      colors: [
        { name: "Camel", hex: "#c19a6b" },
        { name: "Black", hex: "#000000" },
        { name: "Charcoal", hex: "#36454f" },
        { name: "Burgundy", hex: "#800020" }
      ],
      care: [
        "Dry clean only",
        "Use garment bag for storage",
        "Steam to remove wrinkles",
        "Avoid direct sunlight when drying"
      ]
    }
  ];

  const [[currentIndex, direction], setCurrentIndex] = useState([0, 0]);
  const [dragging, setDragging] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const paginate = (newDirection: number) => {
    const nextIndex = (currentIndex + newDirection + products.length) % products.length;
    setCurrentIndex([nextIndex, newDirection]);
  };

  const currentProduct = products[currentIndex];

  const fadeInVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.5 } }
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="relative w-full h-[400px] sm:h-[450px] md:h-[520px] overflow-hidden">
      <div className="absolute top-4 left-4 z-10 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs tracking-wider">
        {currentIndex + 1}/{products.length}
      </div>

      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={currentProduct.id}
          variants={fadeInVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="absolute inset-0 w-full h-full"
        >
          <div className="relative w-full h-full flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 h-1/2 md:h-full relative">
              <div className="relative w-full h-full">
                <Image
                  src={currentProduct.image}
                  alt={currentProduct.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>

            <div className="w-full md:w-1/2 h-1/2 md:h-full bg-white p-4 sm:p-6 md:p-8 flex flex-col justify-center">
              <div className="text-sm tracking-widest text-gray-500 mb-1 sm:mb-2">
                {currentProduct.category}
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium mb-2 sm:mb-4">
                {currentProduct.name}
              </h2>
              <p className="text-gray-600 mb-3 sm:mb-6 text-sm sm:text-base">
                {currentProduct.description}
              </p>
              <div className="text-xl sm:text-2xl font-medium mb-4 sm:mb-8">
                {currentProduct.price}
              </div>
              <div className="flex gap-3 sm:gap-4">
                <button className="bg-black text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full hover:bg-gray-800 transition-colors text-sm sm:text-base">
                  Add to Cart
                </button>
                <button
                  onClick={openModal}
                  className="border border-black px-4 sm:px-6 py-2 sm:py-3 rounded-full hover:bg-gray-100 transition-colors flex items-center justify-center text-sm sm:text-base"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
        {products.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex([i, i > currentIndex ? 1 : -1])}
            className={`w-2 h-2 rounded-full transition-colors ${i === currentIndex ? "bg-black" : "bg-gray-300"
              }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      <button
        className="absolute top-1/2 left-2 sm:left-4 transform -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center z-10 hover:bg-white transition-colors"
        onClick={() => !dragging && paginate(-1)}
        aria-label="Previous product"
      >
        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>

      <button
        className="absolute top-1/2 right-2 sm:right-4 transform -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center z-10 hover:bg-white transition-colors"
        onClick={() => !dragging && paginate(1)}
        aria-label="Next product"
      >
        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>

      {/* Product Modal */}
      <ProductModal
        isOpen={modalOpen}
        onClose={closeModal}
        product={currentProduct}
      />
    </div>
  );
}
