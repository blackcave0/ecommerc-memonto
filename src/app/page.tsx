"use client";

import { Header } from "@/components/home/Header";
import { HeroSection } from "@/components/home/HeroSection";
import { SecondHeroSection } from "@/components/home/SecondHeroSection";
import { CategoriesSection } from "@/components/home/CategoriesSection";
import { TestimonialSection } from "@/components/home/TestimonialSection";
import { GallerySection } from "@/components/home/GallerySection";
import { Footer } from "@/components/home/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white px-3 sm:px-6 md:px-8 lg:px-16 xl:px-24 py-3 sm:py-4 md:py-6 lg:py-8">
      <Header />
      <main className="relative">
        <HeroSection />
        <SecondHeroSection />
        <CategoriesSection />
        <TestimonialSection />
        <GallerySection />
      </main>
      <Footer />
    </div>
  );
}
