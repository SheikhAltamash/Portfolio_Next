import React from "react";
import PropTypes from "prop-types"; // Import PropTypes for runtime validation
import { IconArrowDown } from "@tabler/icons-react";
import { cn } from "@/lib/utils"; // Assuming you have this utility (ensure path is correct)

// JavaScript functional component
const ScrollIndicatorArrow = ({
  href,
  className = "", // Default value for className
  ariaLabel = "Scroll down", // Default value for ariaLabel
}) => {
  return (
    <a
      href={href}
      aria-label={ariaLabel}
      // Combine default classes, animation class, and any passed className
      className={cn(
        "animate-bounceUpDown", // Apply the custom animation class
        "inline-block", // Needed for transform to work correctly
        "cursor-pointer",
        "p-2", // Add some padding to make clicking easier
        "text-white", // Default text color (adjust as needed)
        "hover:text-blue-400", // Example hover effect
        "transition-colors duration-200",
        className // Allows overriding/adding styles via props
      )}
    >
      <IconArrowDown size={40} /> {/* Adjust size as needed */}
      {/* <span className="sr-only">{ariaLabel}</span> */}
    </a>
  );
};

// Define prop types for runtime validation (optional but recommended)
ScrollIndicatorArrow.propTypes = {
  /**
   * The target ID or URL for the link (e.g., "#about", "#projects")
   */
  href: PropTypes.string.isRequired, // href is a required string
  /**
   * Optional additional CSS classes for positioning or styling
   */
  className: PropTypes.string, // className is an optional string
  /**
   * Accessibility label for screen readers
   */
  ariaLabel: PropTypes.string, // ariaLabel is an optional string
};

export default ScrollIndicatorArrow;
