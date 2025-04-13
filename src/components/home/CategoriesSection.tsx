"use client";

import { ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export function CategoriesSection() {
  const categories = [
    { 
      id: "01", 
      name: "Jacket", 
      count: 361,
      description: "Premium jackets crafted with attention to detail and style."
    },
    { 
      id: "02", 
      name: "Shirt", 
      count: 174, 
      featured: true,
      description: "Contemporary shirts designed for comfort and versatility."
    },
    { 
      id: "03", 
      name: "Jeans", 
      count: 368,
      description: "Classic denim pieces that blend tradition with modern trends."
    },
    { 
      id: "04", 
      name: "Outer", 
      count: 117,
      description: "Sophisticated outerwear for every season and occasion."
    },
    { 
      id: "05", 
      name: "Shoes", 
      count: 78,
      description: "Footwear that combines style with exceptional comfort."
    },
  ];

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <section className="mt-20 sm:mt-24 md:mt-28 lg:mt-32 relative">
      <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8 sm:gap-10 md:gap-6 lg:gap-0">
        {/* Left Categories */}
        <div className="w-full max-w-[320px] sm:max-w-[350px] md:max-w-[380px] space-y-3 sm:space-y-4 px-4 md:px-0">
          {categories.map((category) => (
            <div 
              key={category.id}
              className={`group cursor-pointer ${
                category.featured ? "" : "text-gray-400"
              }`}
              onClick={() => setSelectedCategory(
                selectedCategory === category.id ? null : category.id
              )}
            >
              <div className="space-y-1 sm:space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 sm:gap-2">
                    <span className="text-xs sm:text-sm font-light tracking-wide text-gray-400">[{category.id}]</span>
                    <h3 className={`text-xl sm:text-2xl md:text-3xl font-light tracking-wider ${
                      category.featured ? "text-black" : ""
                    } group-hover:text-black transition-colors`}>
                      {category.name}
                    </h3>
                  </div>
                  <span className="text-lg sm:text-xl md:text-2xl font-light">({category.count})</span>
                </div>
                <AnimatePresence>
                  {selectedCategory === category.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-xs sm:text-sm text-gray-500 pl-6 sm:pl-8"
                    >
                      {category.description}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          ))}

          <div className="mt-8 sm:mt-10 md:mt-12">
            <Link href="/featured-product">
              <motion.button 
                className="flex items-center gap-2 text-xs sm:text-sm tracking-wider hover:gap-3 transition-all group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                SEE PRODUCT
                <motion.div
                  initial={{ x: 0 }}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                </motion.div>
              </motion.button>
            </Link>
          </div>

          <div className="max-w-[240px] sm:max-w-[280px] text-xs sm:text-sm text-gray-400 leading-relaxed mt-6 sm:mt-8">
            From everyday essentials to statement pieces, our curated collection is designed to celebrate your style, wherever life takes you.
          </div>
        </div>

        {/* Center Image */}
        <div className="relative mx-4 sm:mx-8 md:mx-12 my-6 md:my-0">
          <motion.div 
            className="relative w-[280px] sm:w-[340px] md:w-[420px] lg:w-[480px] xl:w-[520px] aspect-[4/5] bg-gray-100 rounded-[16px] sm:rounded-[24px] md:rounded-[32px] overflow-hidden group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Image 
              src="https://images.unsplash.com/photo-1496217590455-aa63a8350eea?q=80&w=1974&auto=format&fit=crop"
              alt="Model in stylish fashion outfit"
              width={520}
              height={650}
              className="w-full h-full object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute top-4 sm:top-5 md:top-6 right-4 sm:right-5 md:right-6 bg-white/95 backdrop-blur-sm rounded-lg sm:rounded-xl px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm tracking-wider">
              [BEST PART]
            </div>
            <motion.div 
              className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/40 to-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            />
          </motion.div>
          <Link href="/featured-product">
            <motion.div 
              className="absolute -bottom-3 right-3 bg-[#ff6b00] rounded-full p-2 sm:p-3 cursor-pointer hover:bg-[#ff5500] transition-all group"
              whileHover={{ scale: 1.1, rotate: 12 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                initial={{ x: 0 }}
                whileHover={{ x: 4 }}
                whileTap={{ x: 8 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </motion.div>
            </motion.div>
          </Link>
          <motion.div 
            className="mt-3 text-xs sm:text-sm text-gray-400 tracking-wider"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            ©international - going distance 2024
          </motion.div>
        </div>

        {/* Right Asterisk */}
        <motion.div
          className="text-[#ff6b00] text-4xl sm:text-5xl hidden md:block"
          initial={{ opacity: 0, rotate: 0, scale: 0.8 }}
          animate={{ opacity: 1, rotate: 360, scale: 1 }}
          transition={{ 
            duration: 1.2,
            ease: [0.4, 0, 0.2, 1],
            scale: {
              duration: 0.8,
              ease: "easeOut"
            }
          }}
        >
          *
        </motion.div>
      </div>
    </section>
  );
}
