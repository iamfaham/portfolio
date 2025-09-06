import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { usePagination } from "@/hooks/usePagination";

interface PaginationCarouselProps {
  items: any[];
  itemsPerPage: number;
  renderItem: (item: any, index: number) => React.ReactNode;
  className?: string;
}

export default function PaginationCarousel({
  items,
  itemsPerPage,
  renderItem,
  className = "",
}: PaginationCarouselProps) {
  const {
    currentPage,
    totalPages,
    goToNext,
    goToPrevious,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    getVisibleItems,
    containerRef,
    getSlideVariants,
  } = usePagination({ totalItems: items.length, itemsPerPage });

  const visibleItems = getVisibleItems(items);
  const slideVariants = getSlideVariants();

  return (
    <div className={`relative ${className}`}>
      {/* Navigation Arrows */}
      {totalPages > 1 && (
        <>
          <button
            onClick={goToPrevious}
            disabled={currentPage === 0}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 p-2 rounded-full bg-black/50 hover:bg-black/70 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 backdrop-blur-sm"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <button
            onClick={goToNext}
            disabled={currentPage === totalPages - 1}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 p-2 rounded-full bg-black/50 hover:bg-black/70 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 backdrop-blur-sm"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </>
      )}

      {/* Carousel Container */}
      <div
        ref={containerRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="relative overflow-hidden rounded-lg"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            variants={slideVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
              duration: 0.3,
            }}
            className="flex"
          >
            {visibleItems.map((item, index) => (
              <motion.div
                key={`${currentPage}-${index}`}
                className="flex-1 min-w-0 px-2"
                initial={{ scale: 0.95, opacity: 0.8 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                  delay: index * 0.1,
                }}
              >
                {renderItem(item, index)}
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
