/**
 * FloatingDock Component
 * Renders a dock with icons that animate/scale based on mouse position.
 * Note: This version displays the same dock on all screen sizes.
 * The hover/mouse-based animation effect will be limited on touch devices.
 **/

import { cn } from "@/lib/utils"; // Ensure this path is correct & cn function is set up
// Using framer-motion for all animation/motion features
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import React, { useRef, useState } from "react"; // Added React import explicitly

// Main component simplified to always render the desktop-style dock
export const FloatingDock = ({
  items,
  className, // Simplified from desktopClassName
}) => {
  // Directly render the dock component, passing through items and any additional className
  return <FloatingDockComponent items={items} className={className} />;
};

// Renamed FloatingDockDesktop to FloatingDockComponent as it's now the only version
const FloatingDockComponent = ({ items, className }) => {
  // useMotionValue tracks the mouse's X position
  let mouseX = useMotionValue(Infinity); // Initialize to Infinity when mouse is not over the dock

  return (
    <motion.div
      // Update mouseX when the mouse moves over the dock container
      onMouseMove={(e) => mouseX.set(e.pageX)}
      // Reset mouseX when the mouse leaves the container
      onMouseLeave={() => mouseX.set(Infinity)}
      // Base styles for the dock container
      // Removed 'hidden' and 'md:flex', added 'flex' to display always
      // Removed potentially confusing 'float' class name
      className={cn(
        "mx-auto h-16 items-end gap-4 rounded-2xl bg-gray-50 px-4 pb-3 flex dark:bg-neutral-900",
        className // Merge with any custom classes passed via props
      )}
    >
      {/* Map over the items array to render each icon */}
      {items.map((item) => (
        <IconContainer mouseX={mouseX} key={item.title} {...item} />
      ))}
    </motion.div>
  );
};

// Component for each individual icon within the dock
function IconContainer({ mouseX, title, icon, href }) {
  // useRef to get a reference to the DOM element for measurements
  let ref = useRef(null);

  // useTransform to calculate the distance between the mouse cursor and the center of the icon
  let distance = useTransform(mouseX, (val) => {
    // Get the bounding box of the icon element
    let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    // Calculate distance from mouse X to the icon's center X
    return val - bounds.x - bounds.width / 2;
  });

  // Define the range of distance values and corresponding size transformations
  // Icons further away are smaller (40px), the icon closest to the mouse is largest (80px)
  const distanceThreshold = [-150, 0, 150]; // How far away the mouse affects the size
  const sizeRange = [40, 80, 40]; // Min/Max/Min size of the icon container
  const iconSizeRange = [20, 40, 20]; // Min/Max/Min size of the inner icon element

  // Apply transformations based on distance
  let widthTransform = useTransform(distance, distanceThreshold, sizeRange);
  let heightTransform = useTransform(distance, distanceThreshold, sizeRange);
  let widthTransformIcon = useTransform(
    distance,
    distanceThreshold,
    iconSizeRange
  );
  let heightTransformIcon = useTransform(
    distance,
    distanceThreshold,
    iconSizeRange
  );

  // Use useSpring to smoothly animate the size changes
  const springConfig = { mass: 0.1, stiffness: 150, damping: 12 };
  let width = useSpring(widthTransform, springConfig);
  let height = useSpring(heightTransform, springConfig);
  let widthIcon = useSpring(widthTransformIcon, springConfig);
  let heightIcon = useSpring(heightTransformIcon, springConfig);

  // State to manage whether the icon is currently being hovered (for tooltip)
  const [hovered, setHovered] = useState(false);

  // Determine if the link is external (http/https) or mailto
  const isHttpLink = href.startsWith("http");
  const isMailtoLink = href.startsWith("mailto:");

  // Set target and rel attributes appropriately
  // _blank for external http links, _self (default) for others (including mailto)
  const targetValue = isHttpLink ? "_blank" : "_self";
  // Add rel="noopener noreferrer" for security on external links opened in new tabs
  const relValue = isHttpLink ? "noopener noreferrer" : "";

  return (
    // Link wrapping the icon
    <a href={href} target={targetValue} rel={relValue}>
      {/* The animated container for the icon */}
      <motion.div
        ref={ref} // Attach the ref
        style={{ width, height }} // Apply animated width and height
        onMouseEnter={() => setHovered(true)} // Show tooltip on hover
        onMouseLeave={() => setHovered(false)} // Hide tooltip when hover ends
        className="relative flex aspect-square cursor-pointer items-center justify-center rounded-full bg-gray-200 transition-colors duration-300 hover:bg-gray-300 dark:bg-neutral-800 dark:hover:bg-neutral-700"
      >
        {/* Tooltip displayed above the icon on hover */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 10, x: "-50%" }} // Initial state (hidden below)
              animate={{ opacity: 1, y: 0, x: "-50%" }} // Animate to visible state
              exit={{ opacity: 0, y: 2, x: "-50%" }} // Animate out
              className="nameicon absolute -top-9 left-1/2 w-auto min-w-max transform-gpu whitespace-pre rounded-md border border-gray-300 bg-white px-2 py-1  font-sans shadow-md dark:border-neutral-700 dark:bg-black dark:text-white"
            >
              {title}
            </motion.div>
          )}
        </AnimatePresence>
        {/* The inner div containing the actual icon, also animated */}
        <motion.div
          style={{ width: widthIcon, height: heightIcon }} // Apply animated icon size
          className="flex items-center justify-center"
        >
          {icon} {/* Render the icon passed via props */}
        </motion.div>
      </motion.div>
    </a>
  );
}
