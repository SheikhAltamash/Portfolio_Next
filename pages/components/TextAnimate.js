// pages/components/allProjects.js (or wherever TextAnimate is defined)
"use client";

import React from "react";
import PropTypes from "prop-types";
import { cn } from "@/lib/utils"; // Ensure this path is correct
import { AnimatePresence, motion } from "motion/react"; // Or "framer-motion"

// ... (keep all the constants like staggerTimings, default variants, etc.)
const staggerTimings = {
  text: 0.06,
  word: 0.05,
  character: 0.03,
  line: 0.06,
};

const defaultContainerVariants = {
  hidden: { opacity: 1 }, // Keep container itself visible initially for layout
  show: {
    opacity: 1,
    transition: {
      delayChildren: 0,
      staggerChildren: 0.05, // Default stagger if not overridden
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

// ... (keep defaultItemVariants and defaultItemAnimationVariants)
const defaultItemVariants = {
  /* ... */
};
const defaultItemAnimationVariants = {
  /* ... */
};

export function TextAnimate({
  children,
  delay = 0,
  duration = 0.3,
  variants, // External variants for the items/container override presets
  className,
  segmentClassName,
  as: Component = "p",
  startOnView = true, // Default behavior
  once = false,
  by = "word",
  animation = "fadeIn",
  // Allow passing animation controls externally (for parent staggering)
  initial: initialProp,
  animate: animateProp,
  exit: exitProp,
  ...props
}) {
  const MotionComponent = motion.create(Component);

  let segments = [];
  switch (by) {
    case "word":
      segments = children.split(/(\s+)/);
      break;
    case "character":
      segments = children.split("");
      break;
    case "line":
      segments = children.split("\n");
      break;
    case "text":
    default:
      segments = [children];
      break;
  }

  if (by !== "character") {
    segments = segments.filter((segment) => segment.length > 0);
  }

  // Use preset or custom variants for ITEMS
  const itemVariants = variants // If custom variants obj is passed, assume it's for the items
    ? variants
    : animation && defaultItemAnimationVariants[animation]
    ? defaultItemAnimationVariants[animation].item
    : defaultItemVariants;

  // Define container variants *specifically for staggering the internal items (spans)*
  const containerVariants = {
    hidden: { opacity: 1 }, // Container itself is initially visible unless hidden by parent
    show: {
      opacity: 1,
      transition: {
        delayChildren: delay,
        // Stagger calculation based on *internal* segments
        staggerChildren: staggerTimings[by] ?? 0.05,
        // Apply overall item duration from props to the item animation itself (within itemVariants)
      },
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: staggerTimings[by] ?? 0.05,
        staggerDirection: -1,
      },
    },
  };

  // Apply the overall duration to the show/exit transitions *within* the itemVariants
  const effectiveItemVariants = {
    ...itemVariants,
    show: {
      ...itemVariants.show,
      transition: {
        ...(itemVariants.show?.transition ?? {}),
        duration: duration, // Apply the prop duration here
      },
    },
    exit: {
      ...itemVariants.exit,
      transition: {
        ...(itemVariants.exit?.transition ?? {}),
        duration: duration, // Apply the prop duration here
      },
    },
  };

  // Determine animation control props
  // If animateProp is passed (e.g., from parent stagger), use it.
  // Otherwise, use the startOnView logic.
  const initialControl = initialProp ?? "hidden";
  const animateControl = animateProp // Priority to externally passed control
    ? animateProp
    : startOnView
    ? undefined
    : "show"; // If not external, use internal logic (but whileInView handles the trigger)
  const whileInViewControl = !animateProp && startOnView ? "show" : undefined; // Only use whileInView if not controlled externally

  return (
    // AnimatePresence here handles the exit of the *entire block* if the component unmounts
    // It doesn't interfere with parent staggering for the *entry* animation.
    <AnimatePresence mode="wait">
      {/* Key added here if children can change causing remount/re-animation */}
      <MotionComponent
        key={children} // Add key if text content changes and you want re-animation
        variants={containerVariants} // Variants for staggering internal spans
        initial={initialControl}
        animate={animateControl}
        whileInView={whileInViewControl}
        exit={exitProp ?? "exit"} // Use external exit or default
        viewport={{ once }}
        className={cn("whitespace-pre-wrap", className)}
        {...props}
      >
        {segments.map((segment, i) => (
          <motion.span
            key={`${by}-${segment}-${i}`}
            variants={effectiveItemVariants} // Use the item variants defined above
            className={cn(
              by === "line" ? "block" : "inline-block",
              (by === "word" || by === "character") && segment === " "
                ? "whitespace-pre"
                : "",
              segmentClassName
            )}
          >
            {segment === " " ? "\u00A0" : segment}
          </motion.span>
        ))}
      </MotionComponent>
    </AnimatePresence>
  );
}

// Add prop-types if you haven't already
TextAnimate.propTypes = {
  children: PropTypes.string.isRequired,
  className: PropTypes.string,
  segmentClassName: PropTypes.string,
  delay: PropTypes.number, // Delay for *internal* stagger start
  duration: PropTypes.number, // Duration for *each item's* animation
  variants: PropTypes.object, // Custom variants for the *items*
  as: PropTypes.elementType,
  by: PropTypes.oneOf(["text", "word", "character", "line"]),
  startOnView: PropTypes.bool, // Whether this component triggers itself on view
  once: PropTypes.bool,
  animation: PropTypes.oneOf([
    "fadeIn",
    "blurIn",
    "blurInUp",
    "blurInDown",
    "slideUp",
    "slideDown",
    "slideLeft",
    "slideRight",
    "scaleUp",
    "scaleDown",
  ]),
  initial: PropTypes.oneOfType([PropTypes.string, PropTypes.object]), // Allow passing controls
  animate: PropTypes.oneOfType([PropTypes.string, PropTypes.object]), // Allow passing controls
  exit: PropTypes.oneOfType([PropTypes.string, PropTypes.object]), // Allow passing controls
};
