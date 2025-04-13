"use client";

import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { ProductShowcase } from "./ProductShowcase";
import Link from "next/link";
import Image from "next/image";

export function HeroSection() {
  return (
    <div className="mt-8 sm:mt-12 md:mt-16 lg:mt-20">
      <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8 mb-16 lg:mb-24">
        {/* Left Section - "where" */}
        <div className="w-full md:w-1/4 space-y-4 sm:space-y-6 md:space-y-8 text-center md:text-left">
          <div className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-none font-bold tracking-tight">where</div>
          
          <div className="flex items-center gap-3 justify-center md:justify-start">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden">
              <Image 
                src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d" 
                alt="Team member 1" 
                width={40}
                height={40}
                className="w-full h-full object-cover" 
                priority
              />
            </div>
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden">
              <Image 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb" 
                alt="Team member 2" 
                width={40}
                height={40}
                className="w-full h-full object-cover" 
                priority
              />
            </div>
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#ff6b00] flex items-center justify-center text-white">
              +
            </div>
          </div>

          <div className="text-xs sm:text-sm font-light tracking-wide">[©2015]</div>

          <div className="text-gray-600 text-xs sm:text-sm leading-relaxed max-w-xs mx-auto md:mx-0">
            From everyday essentials to statement pieces, our curated collection is designed to celebrate your style, wherever life takes you.
          </div>

          <motion.div 
            className="text-[#ff6b00] text-4xl sm:text-5xl mx-auto md:mx-0"
            initial={{ opacity: 0, rotate: 0 }}
            animate={{ opacity: 1, rotate: 360 }}
            transition={{ duration: 1 }}
          >
            *
          </motion.div>
        </div>

        {/* Center Section - Image */}
        <div className="w-full md:w-2/4 flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative w-full max-w-[500px] h-[400px] sm:h-[500px] md:h-[600px] rounded-2xl overflow-hidden"
          >
            <Image
              src="https://images.unsplash.com/photo-1581044777550-4cfa60707c03?q=80&w=1972&auto=format&fit=crop"
              alt="Fashion model in elegant outfit"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            
            {/* [CHECK] button */}
            <div className="absolute bottom-8 right-8 bg-white rounded-full p-4 shadow-lg">
              <ArrowUpRight className="w-6 h-6" />
              <div className="absolute -bottom-6 text-xs font-medium">[CHECK]</div>
            </div>
          </motion.div>
        </div>

        {/* Right Section - "a style moment" */}
        <div className="w-full md:w-1/4 space-y-6 sm:space-y-8 text-center md:text-right">
          <div className="space-y-1">
            <div className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.9] font-bold tracking-tight">- a style</div>
            <div className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.9] font-bold tracking-tight">moment</div>
            <div className="text-gray-600 text-xs sm:text-sm tracking-wide mt-2">{`// FASHION`}</div>
          </div>

          <div className="space-y-1">
            <div className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">320K</div>
            <div className="text-gray-600 text-xs sm:text-sm tracking-wide">INFLUENCED PEOPLE</div>
          </div>

          <Link href="/featured-product">
            <div className="flex justify-center md:justify-end items-center gap-2">
              <motion.div 
                className="border border-black rounded-full p-2 sm:p-3 cursor-pointer hover:bg-black hover:text-white transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </motion.div>
            </div>
          </Link>

          <div className="text-center md:text-right text-gray-600 text-xs sm:text-sm leading-relaxed">
            Step into effortless<br />
            elegance with Momento
          </div>
        </div>
      </div>
      
      {/* Product Showcase */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="w-full rounded-2xl overflow-hidden shadow-lg"
      >
        <ProductShowcase />
      </motion.div>

      {/* Featured Product Link */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-12 flex justify-center"
      >
        <Link 
          href="/featured-product"
          className="group flex items-center gap-3 bg-black text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full hover:bg-gray-800 transition-all"
        >
          <span className="text-base sm:text-lg font-medium">See Featured Product</span>
          <motion.div
            initial={{ x: 0 }}
            whileHover={{ x: 5 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </motion.div>
        </Link>
      </motion.div>
    </div>
  );
}
