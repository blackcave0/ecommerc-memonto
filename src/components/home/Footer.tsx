"use client";

import { Instagram, Twitter, Youtube } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-black text-white mt-20 sm:mt-28 md:mt-32 lg:mt-40">
      <div className="px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24 py-8 sm:py-10 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 md:gap-16 lg:gap-20 mb-8 sm:mb-10 md:mb-12">
          {/* Social & Contact */}
          <div className="space-y-4 sm:space-y-6 col-span-1 sm:col-span-2 md:col-span-1">
            <div className="flex gap-4 sm:gap-6 justify-center sm:justify-start">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer">
                <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer">
                <Twitter className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer">
                <Youtube className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
            </div>
            <div className="space-y-1 text-sm sm:text-base text-center sm:text-left">
              <div>9 Pearse Street, Kinsale,</div>
              <div>Cork, China</div>
            </div>
            <div className="text-sm sm:text-base text-center sm:text-left">info@momento.com</div>
            <div className="text-sm sm:text-base text-center sm:text-left">(+12) 808 130 1190</div>
          </div>

          {/* Menu */}
          <div className="text-center sm:text-left">
            <div className="text-base sm:text-lg mb-4 sm:mb-6">MENU</div>
            <div className="space-y-2 sm:space-y-3 text-white/60 text-sm sm:text-base">
              <Link href="/about" className="block hover:text-white transition-colors">About</Link>
              <Link href="/industries" className="block hover:text-white transition-colors">Industries</Link>
              <Link href="/product" className="block hover:text-white transition-colors">Product</Link>
              <Link href="/categories" className="block hover:text-white transition-colors">Categories</Link>
            </div>
          </div>

          {/* Shop */}
          <div className="text-center sm:text-left">
            <div className="text-base sm:text-lg mb-4 sm:mb-6">SHOP</div>
            <div className="space-y-2 sm:space-y-3 text-white/60 text-sm sm:text-base">
              <Link href="/jacket" className="block hover:text-white transition-colors">Jacket</Link>
              <Link href="/totebag" className="block hover:text-white transition-colors">Totebag</Link>
              <Link href="/hat" className="block hover:text-white transition-colors">Hat</Link>
              <Link href="/blouse" className="block hover:text-white transition-colors">Blouse</Link>
            </div>
          </div>

          {/* Cart */}
          <div className="col-span-1 sm:col-span-1 text-center sm:text-left">
            <div className="text-base sm:text-lg mb-4 sm:mb-6">CART</div>
            <div className="space-y-2 sm:space-y-3 text-white/60 text-sm sm:text-base">
              <Link href="/blog" className="block hover:text-white transition-colors">Blog</Link>
              <Link href="/contact" className="block hover:text-white transition-colors">Contact</Link>
              <Link href="/terms" className="block hover:text-white transition-colors">Terms</Link>
              <Link href="/tutorials" className="block hover:text-white transition-colors">Tutorials</Link>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 sm:pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-6 sm:gap-8 md:gap-0">
            <div className="max-w-xs sm:max-w-sm md:max-w-md text-white/60 text-center md:text-left text-sm sm:text-base">
              From branding to digital marketing, our expert team is here to elevate your brand and connect you with your audience.
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 md:gap-8 lg:gap-12">
              <Link href="/terms" className="text-white/60 hover:text-white transition-colors text-xs sm:text-sm">
                TERMS & CONDITIONS
              </Link>
              <Link href="/privacy" className="text-white/60 hover:text-white transition-colors text-xs sm:text-sm">
                PRIVACY POLICY
              </Link>
              <button className="bg-white text-black px-4 sm:px-6 py-1.5 sm:py-2 rounded-full hover:bg-white/90 transition-colors text-xs sm:text-sm">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
