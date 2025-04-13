"use client";

import { Menu, X, User, LogOut, ShoppingBag } from "lucide-react";
import { Instagram, Twitter, Youtube } from "lucide-react";
import { CartIcon } from "@/components/cart/CartIcon";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { user, signOut } = useAuth();
  const router = useRouter();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleSignOut = async () => {
    setIsLoggingOut(true);
    try {
      const success = await signOut();
      console.log('Logout success:', success);

      // Force navigation to home page regardless of success status
      // This ensures we don't get stuck after logout
      window.location.href = '/';
    } catch (error) {
      console.error('Error during logout:', error);
      setIsLoggingOut(false);
      // Even on error, try to redirect to home
      router.push('/');
    }
  };

  return (
    <>
      <CartDrawer />
      <header className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6 lg:gap-0 mb-6 sm:mb-8 md:mb-12 lg:mb-16 xl:mb-20 px-2 sm:px-0 relative">
        <div className="space-y-0.5 text-sm font-light text-center md:text-left hidden sm:block">
          <div>info@momento.com</div>
          <div>(+12) 808 130 1190</div>
        </div>

        <div className="text-xl sm:text-2xl font-medium italic">
          <Link href="/" className="hover:text-gray-600 transition-colors">
            momento.
          </Link>
        </div>

        <div className="hidden sm:flex items-center gap-3 sm:gap-4">
          <div className="flex gap-3 sm:gap-4">
            <Instagram onClick={()=> open("https://www.instagram.com/")} className="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer hover:text-gray-600 transition-colors" />
            <Twitter className="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer hover:text-gray-600 transition-colors" />
            <Youtube className="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer hover:text-gray-600 transition-colors" />
          </div>
          <span className="hidden md:inline text-sm sm:text-base">Follow us</span>

          <div className="ml-6 flex items-center gap-4">
            {/* Cart Icon */}
            <CartIcon className="mr-2" />

            {user ? (
              <>
                <Link href="/profile" className="flex items-center gap-1 hover:text-gray-600 transition-colors">
                  <User className="w-4 h-4" />
                  <span>Profile</span>
                </Link>
                <button
                  onClick={handleSignOut}
                  disabled={isLoggingOut}
                  className="flex items-center gap-1 hover:text-gray-600 transition-colors disabled:opacity-50"
                >
                  {isLoggingOut ? (
                    <>
                      <div className="w-4 h-4 border-t-2 border-b-2 border-current rounded-full animate-spin"></div>
                      <span>Logging out...</span>
                    </>
                  ) : (
                    <>
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </>
                  )}
                </button>
              </>
            ) : (
              <Link href="/login" className="hover:text-gray-600 transition-colors">
                Login
              </Link>
            )}
          </div>
        </div>

        {/* Mobile menu button */}
        <button
          className="sm:hidden absolute right-2 top-1/2 transform -translate-y-1/2"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 top-16 bg-white z-50 p-6"
            >
              <div className="flex flex-col gap-6">
                <div className="space-y-4">
                  <h3 className="font-medium text-lg">Menu</h3>
                  <div className="flex flex-col gap-3">
                    <Link href="/" className="text-lg hover:text-gray-600 transition-colors" onClick={() => setMobileMenuOpen(false)}>
                      Home
                    </Link>
                    <Link href="/shop" className="text-lg hover:text-gray-600 transition-colors" onClick={() => setMobileMenuOpen(false)}>
                      Shop
                    </Link>
                    <Link href="/featured-product" className="text-lg hover:text-gray-600 transition-colors" onClick={() => setMobileMenuOpen(false)}>
                      Featured
                    </Link>
                    {user ? (
                      <>
                        <Link href="/profile" className="text-lg hover:text-gray-600 transition-colors" onClick={() => setMobileMenuOpen(false)}>
                          Profile
                        </Link>
                        <button
                          onClick={() => {
                            setMobileMenuOpen(false);
                            handleSignOut();
                          }}
                          disabled={isLoggingOut}
                          className="text-lg text-left hover:text-gray-600 transition-colors disabled:opacity-50"
                        >
                          {isLoggingOut ? 'Logging out...' : 'Logout'}
                        </button>
                      </>
                    ) : (
                      <Link href="/login" className="text-lg hover:text-gray-600 transition-colors" onClick={() => setMobileMenuOpen(false)}>
                        Login
                      </Link>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium text-lg">Contact</h3>
                  <div className="space-y-2">
                    <div>info@momento.com</div>
                    <div>(+12) 808 130 1190</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium text-lg">Follow us</h3>
                  <div className="flex gap-4">
                    <Instagram className="w-6 h-6" />
                    <Twitter className="w-6 h-6" />
                    <Youtube className="w-6 h-6" />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
