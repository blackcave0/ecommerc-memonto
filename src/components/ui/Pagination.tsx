"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal, ArrowLeft, ArrowRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { motion } from "framer-motion";

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  initialPage?: number;
  siblingCount?: number;
}

export function Pagination({
  totalItems,
  itemsPerPage,
  onPageChange,
  initialPage = 1,
  siblingCount = 1,
}: PaginationProps) {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Reset to page 1 if totalItems or itemsPerPage changes
  useEffect(() => {
    setCurrentPage(1);
  }, [totalItems, itemsPerPage]);

  // Call the onPageChange callback when currentPage changes
  useEffect(() => {
    onPageChange(currentPage);
  }, [currentPage, onPageChange]);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    
    // Scroll to top of the page
    if (typeof window !== 'undefined') {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  // Generate page numbers to display
  const generatePagination = () => {
    // If there are 7 or fewer pages, show all pages
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // Calculate range based on current page and sibling count
    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    // Show dots when there's a gap
    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 1;

    // Always show first and last page
    if (shouldShowLeftDots && shouldShowRightDots) {
      // Show first, last, current and siblings
      const middleRange = Array.from(
        { length: rightSiblingIndex - leftSiblingIndex + 1 },
        (_, i) => leftSiblingIndex + i
      );
      return [1, "leftDots", ...middleRange, "rightDots", totalPages];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      // Show first, dots, and right range
      const rightRange = Array.from(
        { length: totalPages - leftSiblingIndex + 1 },
        (_, i) => leftSiblingIndex + i
      );
      return [1, "leftDots", ...rightRange];
    }

    if (!shouldShowLeftDots && shouldShowRightDots) {
      // Show left range, dots, and last
      const leftRange = Array.from(
        { length: rightSiblingIndex },
        (_, i) => i + 1
      );
      return [...leftRange, "rightDots", totalPages];
    }

    // Fallback (should never happen)
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  };

  const paginationItems = generatePagination();

  // Calculate the range of items being displayed
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="flex flex-col items-center gap-6 mb-20">
      {/* Page info */}
      <div className="text-sm text-gray-500">
        Showing <span className="font-medium text-black">{startItem}-{endItem}</span> of <span className="font-medium text-black">{totalItems}</span> products
      </div>
      
      <div className="flex items-center gap-3 bg-gray-50 px-6 py-4 rounded-xl shadow-md hover:shadow-lg transition-shadow">
        {/* First page button */}
        {currentPage > 3 && totalPages > 7 && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:border-black transition-colors"
            onClick={() => handlePageChange(1)}
            aria-label="First page"
          >
            <ArrowLeft className="w-4 h-4" />
          </motion.button>
        )}
        
        {/* Previous button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`w-10 h-10 rounded-full border flex items-center justify-center ${
            currentPage === 1
              ? "border-gray-200 text-gray-300 cursor-not-allowed"
              : "border-gray-300 hover:border-black transition-colors"
          }`}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous page"
        >
          <ChevronLeft className="w-4 h-4" />
        </motion.button>

        {/* Page numbers */}
        <div className="flex items-center gap-2">
          {paginationItems.map((item, index) => {
            if (item === "leftDots" || item === "rightDots") {
              return (
                <div
                  key={`dots-${index}`}
                  className="w-10 h-10 flex items-center justify-center text-gray-500"
                >
                  <MoreHorizontal className="w-4 h-4" />
                </div>
              );
            }

            return (
              <motion.button
                key={`page-${item}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`w-12 h-12 rounded-full flex items-center justify-center font-medium ${
                  currentPage === item
                    ? "bg-black text-white shadow-md transform scale-110"
                    : "border border-gray-300 hover:border-black hover:bg-gray-100 transition-all hover:shadow-md"
                }`}
                onClick={() => handlePageChange(item as number)}
                aria-label={`Page ${item}`}
                aria-current={currentPage === item ? "page" : undefined}
              >
                {item}
              </motion.button>
            );
          })}
        </div>

        {/* Next button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`w-10 h-10 rounded-full border flex items-center justify-center ${
            currentPage === totalPages
              ? "border-gray-200 text-gray-300 cursor-not-allowed"
              : "border-gray-300 hover:border-black transition-colors"
          }`}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Next page"
        >
          <ChevronRight className="w-4 h-4" />
        </motion.button>
        
        {/* Last page button */}
        {currentPage < totalPages - 2 && totalPages > 7 && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:border-black transition-colors"
            onClick={() => handlePageChange(totalPages)}
            aria-label="Last page"
          >
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        )}
      </div>
      
      {/* Quick navigation buttons */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
          className={`flex items-center gap-1 text-sm ${
            currentPage === 1 ? "text-gray-300 cursor-not-allowed" : "text-gray-600 hover:text-black"
          } transition-colors`}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>First</span>
        </button>
        
        <button
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
          className={`flex items-center gap-1 text-sm ${
            currentPage === totalPages ? "text-gray-300 cursor-not-allowed" : "text-gray-600 hover:text-black"
          } transition-colors`}
        >
          <span>Last</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
      
      {/* Jump to page (for many pages) */}
      {totalPages > 5 && (
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500">Jump to page:</span>
          <div className="relative">
            <input
              type="number"
              min={1}
              max={totalPages}
              value={currentPage}
              onChange={(e) => {
                const value = parseInt(e.target.value);
                if (value >= 1 && value <= totalPages) {
                  handlePageChange(value);
                }
              }}
              className="w-16 h-10 border border-gray-300 rounded-md px-3 text-center focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <button
            onClick={() => {
              const input = document.querySelector('input[type="number"]') as HTMLInputElement;
              const value = parseInt(input.value);
              if (value >= 1 && value <= totalPages) {
                handlePageChange(value);
              }
            }}
            className="px-3 py-2 bg-black text-white rounded-md text-sm hover:bg-gray-800 transition-colors"
          >
            Go
          </button>
        </div>
      )}
    </div>
  );
}
