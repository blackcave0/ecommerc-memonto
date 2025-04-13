"use client";

import { Star } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

export function TestimonialSection() {
  return (
    <section className="mt-20 sm:mt-28 md:mt-32 lg:mt-40 relative px-4 sm:px-0">
      <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8 sm:gap-10 md:gap-6 lg:gap-0">
        {/* Left Section */}
        <div className="space-y-3 sm:space-y-4">
          <div className="text-xs sm:text-sm text-gray-500 text-center md:text-left">[Testimonial]</div>
          <div className="relative w-[220px] sm:w-[250px] md:w-[280px] aspect-square bg-gray-100 rounded-2xl sm:rounded-3xl overflow-hidden">
            <Image 
              src="https://images.unsplash.com/photo-1531384441138-2736e62e0919"
              alt="Jon Snow profile"
              width={280}
              height={280}
              className="w-full h-full object-cover"
              priority
            />
            <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4">
              <motion.button
                className="bg-[#ff6b00] text-white px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                JON SNOW
              </motion.button>
            </div>
          </div>
        </div>

        {/* Center Section */}
        <div className="max-w-sm sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-4 sm:mx-8 md:mx-12 my-6 md:my-0">
          <div className="flex items-start gap-2 sm:gap-3 mb-4 sm:mb-6 md:mb-8">
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 1 }}
              className="text-[#ff6b00] text-2xl sm:text-3xl flex-shrink-0 mt-1"
            >
              <Star className="fill-current w-5 h-5 sm:w-6 sm:h-6" />
            </motion.div>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-light leading-[1.1] tracking-tight">
              Finally, a brand that understands modern elegance! The quality is amazing & I always get when I wear my Momento.
            </h2>
          </div>
          <div className="flex items-center gap-4 sm:gap-6 justify-center md:justify-start">
            <img 
              src="/goldlines.svg" 
              alt="Goldlines logo" 
              className="h-4 sm:h-5 md:h-6 opacity-50"
            />
            <img 
              src="/velocity9.svg" 
              alt="Velocity9 logo" 
              className="h-4 sm:h-5 md:h-6 opacity-50"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="space-y-4 sm:space-y-6 mt-6 md:mt-0">
          <div className="text-center md:text-right">
            <div className="text-4xl sm:text-5xl md:text-6xl font-medium">400+</div>
            <div className="text-xs sm:text-sm text-gray-500 mt-1">COLLECTIONS</div>
          </div>
          <div className="w-full h-px bg-gray-200" />
          <div className="text-center md:text-right">
            <div className="text-4xl sm:text-5xl md:text-6xl font-medium">320K</div>
            <div className="text-xs sm:text-sm text-gray-500 mt-1">CUSTOMERS WORLDWIDE</div>
          </div>
        </div>
      </div>
    </section>
  );
}
