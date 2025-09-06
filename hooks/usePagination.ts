import { useState, useRef, useCallback } from "react";

interface UsePaginationProps {
  totalItems: number;
  itemsPerPage: number;
}

export const usePagination = ({
  totalItems,
  itemsPerPage,
}: UsePaginationProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [slideDirection, setSlideDirection] = useState<"left" | "right" | null>(
    null
  );
  const containerRef = useRef<HTMLDivElement>(null);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const goToNext = useCallback(() => {
    if (currentPage < totalPages - 1) {
      setSlideDirection("left");
      setCurrentPage((prev) => prev + 1);

      // Reset direction after animation completes
      setTimeout(() => {
        setSlideDirection(null);
      }, 300);
    }
  }, [currentPage, totalPages]);

  const goToPrevious = useCallback(() => {
    if (currentPage > 0) {
      setSlideDirection("right");
      setCurrentPage((prev) => prev - 1);

      // Reset direction after animation completes
      setTimeout(() => {
        setSlideDirection(null);
      }, 300);
    }
  }, [currentPage]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrevious();
    }

    setTouchStart(0);
    setTouchEnd(0);
  }, [touchStart, touchEnd, goToNext, goToPrevious]);

  const getVisibleItems = useCallback(
    (items: any[]) => {
      const startIndex = currentPage * itemsPerPage;
      return items.slice(startIndex, startIndex + itemsPerPage);
    },
    [currentPage, itemsPerPage]
  );

  const getSlideVariants = useCallback(() => {
    if (slideDirection === "left") {
      return {
        initial: { opacity: 0, x: 100 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -100 },
      };
    } else if (slideDirection === "right") {
      return {
        initial: { opacity: 0, x: -100 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: 100 },
      };
    }

    // Default direction (first load)
    return {
      initial: { opacity: 0, x: 0 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: 0 },
    };
  }, [slideDirection]);

  return {
    currentPage,
    totalPages,
    goToNext,
    goToPrevious,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    getVisibleItems,
    containerRef,
    slideDirection,
    getSlideVariants,
  };
};
