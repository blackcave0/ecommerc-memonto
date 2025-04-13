"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Star, ShoppingCart, Heart, Share2, Check, ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/home/Header";
import { getProductBySlug, getRelatedProducts, getProductReviews } from "@/data/products";
import { Product, Review } from "@/types/product";
import { ProductCard } from "@/components/product/ProductCard";
import { ReviewCard } from "@/components/product/ReviewCard";
import { useCart } from "@/context/CartContext";

export default function ProductPage() {
  const { slug } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [selectedImage, setSelectedImage] = useState<number>(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"description" | "features" | "care">("description");
  const [reviewsExpanded, setReviewsExpanded] = useState<boolean>(false);
  const [addedToCart, setAddedToCart] = useState<boolean>(false);

  useEffect(() => {
    if (typeof slug === "string") {
      const productData = getProductBySlug(slug);
      if (productData) {
        setProduct(productData);
        setRelatedProducts(getRelatedProducts(productData.id));
        setReviews(getProductReviews(productData.id));
        // Reset state when product changes
        setSelectedImage(0);
        setSelectedSize(null);
        setSelectedColor(null);
        setQuantity(1);
        setIsFavorite(false);
        setActiveTab("description");
      }
    }
  }, [slug]);

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    if (!product) return;

    // Add to cart using the CartContext
    addToCart(product, quantity, selectedSize, selectedColor);

    // Log for debugging
    console.log("Added to cart:", {
      product,
      size: selectedSize,
      color: selectedColor,
      quantity,
    });

    // Show success feedback
    setAddedToCart(true);

    // Reset success message after 3 seconds
    setTimeout(() => {
      setAddedToCart(false);
    }, 3000);
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-white px-3 sm:px-6 md:px-8 lg:px-16 xl:px-24 py-3 sm:py-4 md:py-6 lg:py-8">
        <Header />
        <div className="flex items-center justify-center h-[60vh]">
          <div className="text-2xl text-gray-400">Loading product...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="px-3 sm:px-6 md:px-8 lg:px-16 xl:px-24 py-3 sm:py-4 md:py-6 lg:py-8">
        <Header />

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-black transition-colors">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-black transition-colors">Shop</Link>
          <span>/</span>
          <Link href={`/category/${product.category.toLowerCase()}`} className="hover:text-black transition-colors">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-black">{product.name}</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 mb-20">
          {/* Product Images */}
          <div className="w-full lg:w-3/5">
            <div className="flex gap-6">
              {/* Thumbnails */}
              <div className="flex flex-col gap-4">
                {product.images?.map((image, index) => (
                  <div
                    key={index}
                    className={`w-20 h-20 rounded-md overflow-hidden cursor-pointer border-2 ${selectedImage === index ? "border-black" : "border-transparent"
                      }`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} view ${index + 1}`}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>

              {/* Main Image */}
              <div className="flex-1">
                <motion.div
                  key={selectedImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="relative aspect-[3/4] rounded-lg overflow-hidden"
                >
                  <Image
                    src={product.images?.[selectedImage] ?? product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                    priority
                  />
                </motion.div>
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="w-full lg:w-2/5">
            <div className="mb-2 text-sm tracking-widest text-gray-500">
              {product.category}
            </div>

            <h1 className="text-4xl font-medium mb-2">{product.name}</h1>

            <div className="flex items-center gap-4 mb-4">
              <div className="text-2xl font-medium">{product.price}</div>
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < Math.floor(product.rating ?? 0) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                  />
                ))}
                <span className="text-sm text-gray-600 ml-1">({product.reviewCount})</span>
              </div>
            </div>

            <div className="text-gray-600 mb-8">
              {product.description}
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-200 mb-6">
              <button
                className={`py-2 px-4 text-sm font-medium ${activeTab === "description" ? "border-b-2 border-black" : "text-gray-500"
                  }`}
                onClick={() => setActiveTab("description")}
              >
                Description
              </button>
              <button
                className={`py-2 px-4 text-sm font-medium ${activeTab === "features" ? "border-b-2 border-black" : "text-gray-500"
                  }`}
                onClick={() => setActiveTab("features")}
              >
                Features
              </button>
              <button
                className={`py-2 px-4 text-sm font-medium ${activeTab === "care" ? "border-b-2 border-black" : "text-gray-500"
                  }`}
                onClick={() => setActiveTab("care")}
              >
                Care
              </button>
            </div>

            {/* Tab content */}
            <div className="mb-8">
              {activeTab === "description" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-gray-600"
                >
                  <p className="mb-4">{product.detailedDescription}</p>
                  <p>Material: {product.material}</p>
                </motion.div>
              )}

              {activeTab === "features" && (
                <motion.ul
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="list-disc pl-5 text-gray-600 space-y-1"
                >
                  {product.features?.map((feature, index) => (
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
                  {product.care?.map((instruction, index) => (
                    <li key={index}>{instruction}</li>
                  ))}
                </motion.ul>
              )}
            </div>

            {/* Size selection */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-medium">Size</h3>
                <button className="text-xs text-gray-500 underline">Size Guide</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes?.map((size) => (
                  <button
                    key={size}
                    className={`px-4 py-2 border rounded-md text-sm ${selectedSize === size
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
                {product.colors?.map((color) => (
                  <button
                    key={color.name}
                    className={`w-8 h-8 rounded-full relative ${selectedColor === color.name ? "ring-2 ring-offset-2 ring-black" : ""
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

            {/* Stock and SKU */}
            <div className="flex justify-between text-sm text-gray-500 mb-6">
              <div>In Stock: {product.stock}</div>
              <div>SKU: {product.sku}</div>
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
            <div className="flex gap-4 mb-8">
              <button
                className="flex-1 bg-black text-white py-3 rounded-md hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 relative"
                onClick={handleAddToCart}
                disabled={addedToCart}
              >
                {addedToCart ? (
                  <>
                    <Check className="w-4 h-4" />
                    Added to Cart
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4" />
                    Add to Cart
                  </>
                )}
              </button>
              <button
                className={`p-3 rounded-md border ${isFavorite
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
              <button
                className="p-3 rounded-md border border-gray-300 text-gray-500"
                aria-label="Share product"
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>

            {/* Delivery info */}
            <div className="border-t border-gray-200 pt-6 mb-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <div className="font-medium">Fast Delivery</div>
                  <div className="text-sm text-gray-500">2-3 business days</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 16V8C20.9996 7.64927 20.9071 7.30481 20.7315 7.00116C20.556 6.69751 20.3037 6.44536 20 6.27L13 2.27C12.696 2.09446 12.3511 2.00205 12 2.00205C11.6489 2.00205 11.304 2.09446 11 2.27L4 6.27C3.69626 6.44536 3.44398 6.69751 3.26846 7.00116C3.09294 7.30481 3.00036 7.64927 3 8V16C3.00036 16.3507 3.09294 16.6952 3.26846 16.9988C3.44398 17.3025 3.69626 17.5546 4 17.73L11 21.73C11.304 21.9055 11.6489 21.9979 12 21.9979C12.3511 21.9979 12.696 21.9055 13 21.73L20 17.73C20.3037 17.5546 20.556 17.3025 20.7315 16.9988C20.9071 16.6952 20.9996 16.3507 21 16Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M3.27002 6.96L12 12.01L20.73 6.96" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 22.08V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <div className="font-medium">Free Returns</div>
                  <div className="text-sm text-gray-500">Within 30 days</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mb-20">
          <h2 className="text-2xl font-medium mb-8">You May Also Like</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mb-20">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-medium">Customer Reviews</h2>
            <button className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition-colors">
              Write a Review
            </button>
          </div>

          {/* Review Summary */}
          <div className="flex gap-12 mb-12">
            <div className="w-64">
              <div className="text-5xl font-medium mb-2">{product.rating?.toFixed(1)}</div>
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${i < Math.floor(product.rating ?? 0) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                  />
                ))}
              </div>
              <div className="text-sm text-gray-500">Based on {product.reviewCount} reviews</div>
            </div>

            <div className="flex-1">
              {[5, 4, 3, 2, 1].map((rating) => {
                const count = reviews.filter(r => r.rating === rating).length;
                const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;

                return (
                  <div key={rating} className="flex items-center gap-3 mb-2">
                    <div className="flex items-center gap-1 w-24">
                      <span>{rating}</span>
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    </div>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-yellow-400 rounded-full"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <div className="w-12 text-sm text-gray-500">{count}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Reviews List */}
          <div className="space-y-8">
            {reviews.slice(0, reviewsExpanded ? reviews.length : 3).map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>

          {/* Show More Reviews Button */}
          {reviews.length > 3 && (
            <div className="flex justify-center mt-8">
              <button
                className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors"
                onClick={() => setReviewsExpanded(!reviewsExpanded)}
              >
                {reviewsExpanded ? (
                  <>
                    <span>Show Less</span>
                    <ChevronUp className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    <span>Show More Reviews</span>
                    <ChevronDown className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
