import React from "react";
import PropTypes from "prop-types";
import { cn } from "@/lib/utils"; // Assuming you have this utility

/**
 * A simple component to apply a linear gradient effect to text.
 */
export function TextGradient({
  children,
  fromColor = "#8B5CF6", // Default: Violet-500
  toColor = "#EC4899", // Default: Pink-500
  viaColor, // Optional middle color
  direction = "to right", // Default direction: 'to right', 'to bottom', '45deg', etc.
  as: Component = "span", // Default element type
  className,
  style, // Allow passing custom styles
  ...props // Pass rest of the props
}) {
  // Construct the color stops string
  const colorStops = viaColor
    ? `${fromColor}, ${viaColor}, ${toColor}`
    : `${fromColor}, ${toColor}`;

  // Define the inline styles for the gradient and clipping effect
  const gradientStyles = {
    display: "inline-block", // Necessary for bg-clip-text to work reliably on spans
    backgroundImage: `linear-gradient(${direction}, ${colorStops})`,
    WebkitBackgroundClip: "text", // Prefix for Safari/Chrome
    backgroundClip: "text",
    color: "transparent", // Hide the actual text color
    ...style, // Merge with any passed styles
  };

  return (
    <Component
      className={cn(className)} // Apply any passed className
      style={gradientStyles} // Apply the gradient styles
      {...props} // Apply any other passed props
    >
      {children}
    </Component>
  );
}

// Define PropTypes for basic validation and documentation
TextGradient.propTypes = {
  /** The text or elements to apply the gradient to */
  children: PropTypes.node.isRequired,
  /** Starting color of the gradient (CSS color format) */
  fromColor: PropTypes.string,
  /** Ending color of the gradient (CSS color format) */
  toColor: PropTypes.string,
  /** Optional middle/"via" color for a three-stop gradient */
  viaColor: PropTypes.string,
  /** CSS gradient direction (e.g., 'to right', 'to bottom left', '45deg') */
  direction: PropTypes.string,
  /** The HTML element type to render (e.g., 'span', 'h1', 'p', 'div') */
  as: PropTypes.elementType,
  /** Additional CSS class names */
  className: PropTypes.string,
  /** Additional inline styles to merge */
  style: PropTypes.object,
};
