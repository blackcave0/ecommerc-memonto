"use client";

import { ArrowRight, ShoppingCart, Eye } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";

interface GalleryItem {
  id: number;
  slug: string;
  image: string;
  title: string;
  subtitle: string;
  year: string;
  category: string;
}

export function GallerySection() {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 640);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);
  
  const galleryItems: GalleryItem[] = [
    {
      id: 1,
      slug: "structured-blazer",
      image: "https://images.unsplash.com/photo-1550614000-4895a10e1bfd?q=80&w=1974&auto=format&fit=crop",
      title: "©ikigai -",
      subtitle: "jacket momento",
      year: "2024",
      category: "BLAZER"
    },
    {
      id: 2,
      slug: "casual-overshirt",
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f",
      title: "©minimal -",
      subtitle: "overshirt collection",
      year: "2024",
      category: "SHIRT"
    },
    {
      id: 3,
      slug: "statement-coat",
      image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1974&auto=format&fit=crop",
      title: "©premium -",
      subtitle: "statement piece",
      year: "2024",
      category: "COAT"
    },
    {
      id: 4,
      slug: "minimalist-jacket",
      image: "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?q=80&w=1974&auto=format&fit=crop",
      title: "©signature -",
      subtitle: "minimalist design",
      year: "2024",
      category: "JACKET"
    }
  ];

  return (
    <section className="mt-20 sm:mt-28 md:mt-32 lg:mt-40 relative">
      <div className="flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-start mb-6 sm:mb-8 px-4 sm:px-0">
          <div className="text-xs sm:text-sm text-gray-400">[Other]</div>
          <Link href="/shop">
            <motion.div 
              className="bg-[#ff6b00] rounded-full p-1.5 sm:p-2 cursor-pointer group"
              whileHover={{ scale: 1.1, rotate: 12 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                initial={{ x: 0 }}
                whileHover={{ x: 3 }}
                whileTap={{ x: 6 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
              </motion.div>
            </motion.div>
          </Link>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6 px-4 sm:px-0">
          {/* Gallery Items */}
          {galleryItems.map((item, index) => (
            <div key={item.id} className="space-y-2 sm:space-y-3">
              <Link href={`/product/${item.slug}`}>
                <motion.div 
                  className="relative aspect-[3/4] bg-gray-100 rounded-2xl sm:rounded-3xl overflow-hidden group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                  style={{ marginTop: index % 2 !== 0 && !isMobile ? "2rem" : "0" }}
                >
                  <Image 
                    src={item.image}
                    alt={`${item.subtitle} fashion model`}
                    width={300}
                    height={400}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    priority
                  />
                  
                  {/* Overlay with actions */}
                  <div 
                    className="absolute inset-0 bg-black/40 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <Link href={`/product/${item.slug}`}>
                      <motion.button 
                        className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-gray-100 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Eye className="w-5 h-5" />
                      </motion.button>
                    </Link>
                    <motion.button 
                      className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-gray-100 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <ShoppingCart className="w-5 h-5" />
                    </motion.button>
                  </div>
                  
                  {/* Category badge */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium">
                    {item.category}
                  </div>
                </motion.div>
              </Link>
              <div className="space-y-0.5 sm:space-y-1">
                <div className="text-xs sm:text-sm">{item.title}</div>
                <div className="text-xs sm:text-sm">{item.subtitle}</div>
                <div className="text-[10px] sm:text-xs text-gray-400">{item.year}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 px-4 sm:px-0">
          <Link href="/shop" className="text-xs sm:text-sm hover:underline">View All</Link>
          <div className="text-xs sm:text-sm text-gray-400 text-center sm:text-left max-w-xs sm:max-w-none">
            From timeless classics to bold statement pieces, our collections are thoughtfully curated.
          </div>
          <div className="flex items-center gap-2">
            <div className="text-xs sm:text-sm">©Everyday Essentials</div>
            <div className="text-xs sm:text-sm text-gray-400">2025</div>
          </div>
        </div>

        {/* Momento Text Line */}
        
        <div className="mt-8 sm:mt-10 md:mt-12 py-3 sm:py-4 border-y border-gray-200">
          <div className="flex items-center gap-2 sm:gap-4 text-base sm:text-lg md:text-xl tracking-wide text-gray-400 max-w-full overflow-hidden">
          <div className="relative overflow-hidden whitespace-nowrap">
            <div className="flex animate-marquee">
              {Array.from({ length: 20 }, (_, index) => (
                <React.Fragment key={index}>
                  <span>momento.</span>
                  {index < 19 && <span className="mx-2 sm:mx-4">+</span>}
                </React.Fragment>
              ))}
              {Array.from({ length: 20 }, (_, index) => (
                <React.Fragment key={`duplicate-${index}`}>
                  <span>momento.</span>
                  {index < 19 && <span className="mx-2 sm:mx-4">+</span>}
                </React.Fragment>
              ))}
            </div>
          </div>
          </div>
        </div>


      </div>
    </section>
  );
}
