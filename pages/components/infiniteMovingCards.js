"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState, useRef } from "react"; // useRef was already used but added explicitly here for clarity

export const InfiniteMovingCards = ({
  // Renamed for clarity, but you can keep the original name
  items, // Expect items = [{ src: string, alt: string }, ...]
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
  itemClassName, // Optional: Add a prop for custom styling of each logo item container
  imgClassName, // Optional: Add a prop for custom styling of the img tag itself
}) => {
  const containerRef = useRef(null);
  const scrollerRef = useRef(null);

  useEffect(() => {
    addAnimation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Add dependency array if addAnimation uses props/state that might change, though here it seems fine

  const [start, setStart] = useState(false);

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      // Duplicate items for seamless looping
      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        // Type assertion to satisfy TypeScript if needed, or check if appendChild exists
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }

  const getDirection = () => {
    if (containerRef.current) {
      containerRef.current.style.setProperty(
        "--animation-direction",
        direction === "left" ? "forwards" : "reverse"
      );
    }
  };

  const getSpeed = () => {
    if (containerRef.current) {
      let duration;
      switch (speed) {
        case "fast":
          duration = "30s";
          break;
        case "normal":
          duration = "40s";
          break;
        case "slow": // Corrected from the original code which repeated 'normal' logic
          duration = "80s";
          break;
        default:
          duration = "40s"; // Default to normal speed
      }
      containerRef.current.style.setProperty("--animation-duration", duration);
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        // Basic scroller styles - mask is important for fading edges
        "scroller relative z-20 w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]",
        className // Allow external override/addition of classes
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          // Flex container for logos
          "flex w-max min-w-full shrink-0 flex-nowrap items-center gap-8 sm:gap-12 md:gap-16 py-4", // Adjust gap as needed
          start && "animate-scroll", // Apply animation class when ready
          pauseOnHover && "hover:[animation-play-state:paused]" // Pause on hover
        )}
      >
        {/* Map over items to render logos */}
        {items.map((item, idx) => (
          <li
            // Styling for the container of each logo
            // Removed card-specific styles (background, padding, border)
            // Added flex centering and defined a base width/height - adjust as needed!
            className={cn(
              "relative flex h-16 w-32 shrink-0 items-center justify-center", // Example size: h-16 w-32. Adjust!
              itemClassName // Allow external override/addition of classes per item
            )}
            // Use a combination of src and index for a more robust key, or just index if src might not be unique
            key={`${item.alt}-${idx}`}
          >
            {/* The Logo Image */}
            <img
              src={item.src}
              alt={item.alt}
              // Ensure image fits within the container, maintains aspect ratio
              className={cn(
                "h-auto max-h-full w-auto max-w-full object-contain",
                imgClassName // Allow external override/addition of classes per image
              )}
              // Consider adding loading="lazy" for performance if many logos
              loading="lazy"
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

// IMPORTANT: Make sure you have the `animate-scroll` animation defined in your CSS.
// Example (in your global CSS file like globals.css):
/*
@keyframes scroll {
	to {
		transform: translate(calc(-50% - 0.5rem)); // Adjust based on gap
	}
}

.animate-scroll {
  animation: scroll var(--animation-duration) linear infinite var(--animation-direction);
}

// Scroller specific styles (if not using utility classes fully)
.scroller {
  // max-width: 600px; // Or set via className prop
}

.scroller ul {
 // gap: 1rem; // Or set via utility class
}
*/
