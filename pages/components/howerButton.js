"use client";

import * as React from "react";
import PropTypes from "prop-types"; // Import PropTypes
import { cn } from "@/lib/utils"; // Ensure this path is correct

// Interface ShineBorderProps removed

/**
 * Shine Border
 *
 * An animated background border effect component with configurable properties.
 * Renders a div element with animated radial gradient background masked to appear as a border.
 */
export function ShineBorder({
  borderWidth = 1,
  duration = 14,
  shineColor = "#000000",
  className,
  style,
  ...props // Collect remaining props like id, data-*, etc.
  // Removed type annotation: ShineBorderProps
}) {
  return (
    <div
      style={{
        // Set CSS custom properties for dynamic values
        "--border-width": `${borderWidth}px`,
        "--duration": `${duration}s`,
        // Define the radial gradient background using the shineColor(s)
        backgroundImage: `radial-gradient(transparent, transparent, ${
          Array.isArray(shineColor) ? shineColor.join(",") : shineColor // Handle single or multiple colors
        }, transparent, transparent)`,
        backgroundSize: "300% 300%", // Make background larger than the element for animation
        // Masking to create the border effect:
        // 1. Mask out the content area (content-box)
        // 2. Use a second mask layer covering the whole element
        mask: `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
        // Webkit prefix for wider browser compatibility
        WebkitMask: `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
        // Composite operation: Exclude the content area mask from the full mask, leaving only the border area
        WebkitMaskComposite: "xor", // For Webkit browsers
        maskComposite: "exclude", // Standard property
        // Padding equal to the border width makes the mask work correctly
        padding: "var(--border-width)",
        // Spread any additional custom styles
        ...style,
        // No need for 'as React.CSSProperties' assertion in JS
      }}
      className={cn(
        // Base styles
        "pointer-events-none absolute inset-0 size-full rounded-[inherit] will-change-[background-position]",
        // Apply animation class (assuming 'animate-shine' is defined in your CSS/Tailwind config)
        "motion-safe:animate-shine",
        // Apply custom className if provided
        className
      )}
      // Spread remaining props onto the div element
      {...props}
    />
  );
}

// Define PropTypes for runtime type checking and documentation
ShineBorder.propTypes = {
  /**
   * Width of the border in pixels.
   * @default 1
   */
  borderWidth: PropTypes.number,
  /**
   * Duration of the background position animation cycle in seconds.
   * @default 14
   */
  duration: PropTypes.number,
  /**
   * Color(s) for the radial gradient. Can be a single CSS color string
   * or an array of color strings to create multi-color gradients.
   * @default "#000000"
   */
  shineColor: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  /**
   * Additional CSS class names to apply to the div element.
   */
  className: PropTypes.string,
  /**
   * Additional CSS styles to apply to the div element.
   */
  style: PropTypes.object,
  // Implicitly accepts other standard HTML div attributes via ...props
};
