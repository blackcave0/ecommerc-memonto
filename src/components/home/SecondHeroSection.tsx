"use client";

import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function SecondHeroSection() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Text glitch and SVG animation
      const glitchTimeline = gsap.timeline({ repeat: -1, repeatDelay: 2 });
      glitchTimeline
        .to(textRef.current, {
          textShadow: "2px 2px 4px #ff6b00, -2px -2px 4px #00ff6b",
          duration: 0.1,
          ease: "power3.inOut",
        })
        .to(textRef.current, {
          textShadow: "none",
          duration: 0.1,
          ease: "power3.inOut",
        });

      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.5 }
      );

      // Image scroll-based rotation
      gsap.to(imageRef.current, {
        rotation: 360,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="mt-20 sm:mt-24 md:mt-28 lg:mt-32 relative"
    >
      <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8 sm:gap-10 md:gap-6 lg:gap-0">
        {/* Left Section */}
        <div
          ref={textRef}
          className="max-w-full sm:max-w-lg md:max-w-xl lg:max-w-2xl text-center md:text-left"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[0.85] tracking-tight font-bold mb-6 sm:mb-8 md:mb-10 lg:mb-16">
            It's - about<br />moments ©24
          </h1>

          <div className="flex items-center gap-4 sm:gap-6 mb-10 sm:mb-12 md:mb-16 justify-center md:justify-start">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#ff6b00] rounded-full" />
              <div className="w-2 h-2 bg-gray-200 rounded-full" />
            </div>
            <Link href="/featured-product">
              <button className="bg-white border border-gray-200 rounded-full px-4 sm:px-6 py-2 sm:py-2.5 flex items-center gap-2 sm:gap-3 hover:bg-gray-50 transition-colors group">
                <span className="text-xs sm:text-sm font-medium tracking-wide">
                  LEARN MORE
                </span>
                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </Link>
          </div>

          <div className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight">
            (45%)
          </div>
        </div>

        {/* Center Section */}
        <div className="relative mx-4 sm:mx-8 md:mx-12 lg:mx-16 my-8 md:my-0">
          <div
            ref={imageRef}
            className="relative w-[280px] sm:w-[340px] md:w-[380px] lg:w-[420px] aspect-[4/5] bg-gray-100 rounded-[24px] sm:rounded-[32px] md:rounded-[40px] overflow-hidden group"
          >
            <Image
              src="https://images.unsplash.com/photo-1603217192634-61068e4d4bf9?q=80&w=1974&auto=format&fit=crop"
              alt="Fashion model in stylish outfit"
              width={420}
              height={525}
              className="w-full h-full object-cover"
              priority
            />
            <Link href="/featured-product">
              <div className="absolute top-4 sm:top-5 md:top-6 right-4 sm:right-5 md:right-6 bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-sm cursor-pointer hover:bg-gray-50 transition-all hover:shadow-md">
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
            </Link>
            <div className="absolute inset-0 bg-gradient-to-b from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div className="mt-3 sm:mt-4 text-xs sm:text-sm text-gray-600 tracking-wide">
            ©international - going distance 2024
          </div>
        </div>

        {/* Right Section */}
        <div className="space-y-4 sm:space-y-6 text-center md:text-left">
          <div className="relative w-[180px] sm:w-[200px] md:w-[220px] aspect-square bg-gray-100 rounded-2xl sm:rounded-3xl overflow-hidden group mx-auto md:mx-0">
            <Image
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1920&auto=format&fit=crop"
              alt="Fashion model in stylish outfit"
              width={220}
              height={220}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div className="text-xs sm:text-sm text-gray-600 tracking-wide">
            ©international - just do it 2024
          </div>

          <div className="mt-auto pt-16 sm:pt-24 md:pt-32 lg:pt-40 text-xs sm:text-sm text-gray-600 tracking-wide">
            To Celebrate<br />Your Moments
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-0 right-0 text-[#ff6b00] text-5xl sm:text-6xl md:text-7xl">
        *
      </div>
    </section>
  );
}
