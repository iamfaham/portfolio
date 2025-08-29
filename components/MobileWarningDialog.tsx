"use client";

import React, { useState, useEffect } from "react";
import { FaMobile, FaTablet, FaTimes, FaRedo } from "react-icons/fa";
import { isTouchDevice } from "@/utils/detectTouchDevice";

interface MobileWarningDialogProps {
  isVisible: boolean;
  onClose: () => void;
}

export default function MobileWarningDialog({
  isVisible,
  onClose,
}: MobileWarningDialogProps) {
  const [deviceType, setDeviceType] = useState<"mobile" | "tablet" | "unknown">(
    "unknown"
  );
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    if (isVisible) {
      // Store current scroll position before opening dialog
      setScrollPosition(window.scrollY || 0);

      // Determine device type based on screen width
      const width = window.innerWidth;
      if (width < 768) {
        setDeviceType("mobile");
      } else if (width < 1024) {
        setDeviceType("tablet");
      } else {
        setDeviceType("unknown");
      }

      // Disable scrolling when dialog is open - improved method
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
      document.body.style.height = "100%";
      document.body.style.top = `-${scrollPosition}px`;

      // Add a class to the html element for additional CSS-based prevention
      document.documentElement.classList.add("dialog-open");

      // Dispatch custom event to disable portfolio's custom scroll handling
      window.dispatchEvent(
        new CustomEvent("dialogOpen", { detail: { isOpen: true } })
      );
    } else {
      // Re-enable scrolling when dialog is closed - improved method
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.height = "";
      document.body.style.top = "";
      document.documentElement.classList.remove("dialog-open");

      // Don't call window.scrollTo - let the custom scrolling handle it
      // Just ensure the body is properly positioned

      // Dispatch custom event to re-enable portfolio's custom scroll handling
      window.dispatchEvent(
        new CustomEvent("dialogOpen", { detail: { isOpen: false } })
      );
    }

    // Cleanup function to re-enable scrolling
    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.height = "";
      document.body.style.top = "";
      document.documentElement.classList.remove("dialog-open");

      // Don't call window.scrollTo - let the custom scrolling handle it

      // Ensure portfolio's custom scroll handling is re-enabled
      window.dispatchEvent(
        new CustomEvent("dialogOpen", { detail: { isOpen: false } })
      );
    };
  }, [isVisible, scrollPosition]);

  // Additional cleanup when component unmounts
  useEffect(() => {
    return () => {
      // Final cleanup to ensure scrolling is restored
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.height = "";
      document.body.style.top = "";
      document.documentElement.classList.remove("dialog-open");

      // Don't call window.scrollTo - let the custom scrolling handle it
    };
  }, [scrollPosition]);

  const handleRefresh = () => {
    window.location.reload();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-hidden">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-sm sm:max-w-md mx-4 p-4 sm:p-6 border border-gray-200 dark:border-gray-700 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3 min-w-0">
            {deviceType === "mobile" ? (
              <FaMobile className="text-xl sm:text-2xl text-blue-500 flex-shrink-0" />
            ) : (
              <FaTablet className="text-xl sm:text-2xl text-purple-500 flex-shrink-0" />
            )}
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white truncate">
              {deviceType === "mobile"
                ? "Mobile Device Detected"
                : "Tablet Device Detected"}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors flex-shrink-0 ml-2"
          >
            <FaTimes size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="mb-6">
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
            This website is optimized for desktops/laptops and may not display
            at its full potential on your{" "}
            {deviceType === "mobile" ? "mobile device" : "tablet"}.
          </p>
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mt-2">
            If you experience any issues, please try refreshing the page or
            visit on a desktop/laptop for the best experience.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleRefresh}
            className="flex-1 flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors font-medium text-sm"
          >
            <FaRedo size={14} />
            Refresh Page
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg transition-colors font-medium text-sm"
          >
            Continue Anyway
          </button>
        </div>
      </div>
    </div>
  );
}
