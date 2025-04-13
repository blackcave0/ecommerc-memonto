"use client";

import { useState } from "react";
import { Star, ThumbsUp } from "lucide-react";
import Image from "next/image";
import { Review } from "@/types/product";

interface ReviewCardProps {
  review: Review;
}

export function ReviewCard({ review }: ReviewCardProps) {
  const [helpfulCount, setHelpfulCount] = useState(review.helpful ?? 0);
  const [isHelpful, setIsHelpful] = useState(false);
  
  const handleHelpfulClick = () => {
    if (!isHelpful) {
      setHelpfulCount(prev => prev + 1);
      setIsHelpful(true);
    } else {
      setHelpfulCount(prev => prev - 1);
      setIsHelpful(false);
    }
  };
  
  return (
    <div className="border-b border-gray-200 pb-8">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-4">
          {review.userImage ? (
            <div className="relative w-12 h-12 rounded-full overflow-hidden">
              <Image 
                src={review.userImage} 
                alt={review.userName}
                width={48}
                height={48}
                className="object-cover"
              />
            </div>
          ) : (
            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500 font-medium">
                {review.userName.charAt(0)}
              </span>
            </div>
          )}
          <div>
            <div className="font-medium">{review.userName}</div>
            <div className="text-sm text-gray-500">{review.date}</div>
          </div>
        </div>
        
        <div className="flex items-center">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star 
              key={i} 
              className={`w-4 h-4 ${i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} 
            />
          ))}
          {review.verified && (
            <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
              Verified Purchase
            </span>
          )}
        </div>
      </div>
      
      <h4 className="font-medium mb-2">{review.title}</h4>
      <p className="text-gray-600 mb-4">{review.comment}</p>
      
      <button 
        className={`flex items-center gap-1 text-sm ${isHelpful ? "text-blue-600" : "text-gray-500"} hover:text-blue-600 transition-colors`}
        onClick={handleHelpfulClick}
      >
        <ThumbsUp className="w-4 h-4" />
        <span>Helpful ({helpfulCount})</span>
      </button>
    </div>
  );
}
