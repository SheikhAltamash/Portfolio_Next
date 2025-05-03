"use client";

import { cn } from "@/lib/utils";
import { motion, useScroll } from "motion/react";
import React from "react";
import PropTypes from "prop-types";

export const ScrollProgress = React.forwardRef(
  ({ className, ...props }, ref) => {
    const { scrollYProgress } = useScroll();

    return (
      <motion.div
        ref={ref}
        className={cn(
          // Base styles for the progress bar
          "fixed inset-x-0 top-0 z-50 origin-left",
          // --- CHANGE: Set height to 2px ---
          "h-1", // Tailwind class for height: 0.125rem (2px with default base font size)
          // Or use arbitrary value: "h-[2px]",
          // Default gradient background
          "bg-gradient-to-r from-[#A97CF8] via-[#F38CB8] to-[#FDCC92]",
          // Allow overriding classes
          className
        )}
        style={{
          // Scale the div horizontally based on scroll progress (0 to 1)
          scaleX: scrollYProgress,
          // Ensure transform origin is left for scaling
          // originX: 0, // Already set by `origin-left` class
        }}
        {...props} // Spread any additional props
      />
    );
  }
);

// Assign display name for React DevTools
ScrollProgress.displayName = "ScrollProgress";

// Define PropTypes for runtime type checking
ScrollProgress.propTypes = {
  /**
   * Optional className to be added to the progress bar element.
   */
  className: PropTypes.string,
  // Implicitly accepts other standard HTML attributes and MotionProps via ...props
};
