import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
  } = usePagination({ totalItems: items.length, itemsPerPage });

  const visibleItems = getVisibleItems(items);

  return (
    <div className={`relative ${className}`}>
      {/* Navigation Arrows */}
      {totalPages > 1 && (
        <>
          <button
            onClick={goToPrevious}
            disabled={currentPage === 0}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 p-2 rounded-full bg-black/50 hover:bg-black/70 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <button
            onClick={goToNext}
            disabled={currentPage === totalPages - 1}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 p-2 rounded-full bg-black/50 hover:bg-black/70 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
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
        className="relative overflow-hidden"
      >
        <div className="flex transition-transform duration-300 ease-in-out">
          {visibleItems.map((item, index) => (
            <div key={index} className="flex-1 min-w-0 px-2">
              {renderItem(item, index)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
