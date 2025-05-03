"use client";

import React, { useEffect, useRef, useState } from "react"; // Import necessary React hooks
import PropTypes from "prop-types"; // Import PropTypes for runtime type checking
import { motion, useSpring } from "motion/react"; // Or "framer-motion"

// Default Cursor Component (remains the same, just remove FC type)
const DefaultCursorSVG = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={50}
      height={54}
      viewBox="0 0 50 54"
      fill="none"
      style={{ scale: 0.5 }} // Apply scale directly if needed, or adjust SVG size
    >
      <g filter="url(#filter0_d_91_7928)">
        <path
          d="M42.6817 41.1495L27.5103 6.79925C26.7269 5.02557 24.2082 5.02558 23.3927 6.79925L7.59814 41.1495C6.75833 42.9759 8.52712 44.8902 10.4125 44.1954L24.3757 39.0496C24.8829 38.8627 25.4385 38.8627 25.9422 39.0496L39.8121 44.1954C41.6849 44.8902 43.4884 42.9759 42.6817 41.1495Z"
          fill="black"
        />
        <path
          d="M43.7146 40.6933L28.5431 6.34306C27.3556 3.65428 23.5772 3.69516 22.3668 6.32755L6.57226 40.6778C5.3134 43.4156 7.97238 46.298 10.803 45.2549L24.7662 40.109C25.0221 40.0147 25.2999 40.0156 25.5494 40.1082L39.4193 45.254C42.2261 46.2953 44.9254 43.4347 43.7146 40.6933Z"
          stroke="white"
          strokeWidth={2.25825}
        />
      </g>
      <defs>
        <filter
          id="filter0_d_91_7928"
          x={0.602397}
          y={0.952444}
          width={49.0584}
          height={52.428}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy={2.25825} />
          <feGaussianBlur stdDeviation={2.25825} />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_91_7928"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_91_7928"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

// Default spring configuration
const defaultSpringConfig = {
  damping: 45,
  stiffness: 400,
  mass: 1,
  restDelta: 0.001,
};

export function SmoothCursor({
  cursor = <DefaultCursorSVG />,
  springConfig = defaultSpringConfig, // Use the constant for default
}) {
  // State remains the same
  const [isMoving, setIsMoving] = useState(false);
  // Refs - remove explicit types
  const lastMousePos = useRef({ x: 0, y: 0 });
  const velocity = useRef({ x: 0, y: 0 });
  const lastUpdateTime = useRef(Date.now());
  const previousAngle = useRef(0);
  const accumulatedRotation = useRef(0);

  // useSpring calls remain the same, springConfig object structure is validated by PropTypes later
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);
  const rotation = useSpring(0, {
    ...springConfig,
    damping: 60, // Example override
    stiffness: 300, // Example override
  });
  const scale = useSpring(1, {
    ...springConfig,
    stiffness: 500,
    damping: 35,
  });

  // useEffect logic remains largely the same, remove type annotations from parameters
  useEffect(() => {
    const updateVelocity = (currentPos) => {
      // removed : Position type
      const currentTime = Date.now();
      const deltaTime = currentTime - lastUpdateTime.current;

      if (deltaTime > 0) {
        velocity.current = {
          x: (currentPos.x - lastMousePos.current.x) / deltaTime,
          y: (currentPos.y - lastMousePos.current.y) / deltaTime,
        };
      }

      lastUpdateTime.current = currentTime;
      lastMousePos.current = currentPos;
    };

    const smoothMouseMove = (e) => {
      // removed : MouseEvent type
      const currentPos = { x: e.clientX, y: e.clientY };
      updateVelocity(currentPos);

      const speed = Math.sqrt(
        Math.pow(velocity.current.x, 2) + Math.pow(velocity.current.y, 2)
      );

      cursorX.set(currentPos.x);
      cursorY.set(currentPos.y);

      let timeoutId = null; // Store timeout ID for clearing

      if (speed > 0.1) {
        const currentAngle =
          Math.atan2(velocity.current.y, velocity.current.x) * (180 / Math.PI) +
          90; // Angle adjustment for pointer shape

        let angleDiff = currentAngle - previousAngle.current;
        // Normalize angle difference to be within [-180, 180]
        if (angleDiff > 180) angleDiff -= 360;
        if (angleDiff < -180) angleDiff += 360;

        accumulatedRotation.current += angleDiff;
        rotation.set(accumulatedRotation.current);
        previousAngle.current = currentAngle;

        scale.set(0.95); // Scale down slightly when moving fast
        setIsMoving(true);

        // Set timeout to scale back up and reset moving state
        timeoutId = setTimeout(() => {
          scale.set(1);
          setIsMoving(false);
        }, 150); // Adjust timeout duration as needed
      } else {
        // Optional: If speed drops below threshold, immediately reset scale/moving state
        // if (isMoving) { // Only reset if it was moving
        //    scale.set(1);
        //    setIsMoving(false);
        // }
      }

      // Return cleanup function for the timeout inside the event handler scope
      return () => {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
      };
    };

    let rafId; // Keep track of requestAnimationFrame ID
    const throttledMouseMove = (e) => {
      // removed : MouseEvent type
      if (rafId) return; // Throttle using requestAnimationFrame

      rafId = requestAnimationFrame(() => {
        const cleanupTimeout = smoothMouseMove(e); // Get potential timeout cleanup
        rafId = 0; // Reset rafId

        // Note: Returning cleanupTimeout here doesn't fit the raf callback pattern.
        // Timeout cleanup needs to be handled differently if necessary outside smoothMouseMove scope,
        // but the current structure where it's cleared within smoothMouseMove's closure might suffice.
      });
    };

    // --- Side Effects ---
    const bodyCursor = document.body.style.cursor; // Store original cursor
    document.body.style.cursor = "none"; // Hide default cursor
    window.addEventListener("mousemove", throttledMouseMove);

    // --- Cleanup Function ---
    return () => {
      window.removeEventListener("mousemove", throttledMouseMove);
      document.body.style.cursor = bodyCursor; // Restore original cursor
      if (rafId) {
        cancelAnimationFrame(rafId); // Cancel pending animation frame on cleanup
      }
      // Note: Any active setTimeout from smoothMouseMove will still run unless explicitly cleared here,
      // which would require managing the timeoutId outside the handler.
      // The current logic assumes the component unmounting makes the timeout irrelevant.
    };
  }, [cursorX, cursorY, rotation, scale, springConfig]); // Include springConfig in dependencies if it can change

  return (
    <motion.div
      style={{
        position: "fixed",
        left: cursorX, // Drive position with spring values
        top: cursorY,
        translateX: "-50%", // Center the cursor element
        translateY: "-50%",
        rotate: rotation, // Drive rotation with spring value
        scale: scale, // Drive scale with spring value
        zIndex: 9999, // Ensure high z-index
        pointerEvents: "none", // Prevent cursor from interfering with interactions
        willChange: "transform", // Optimize rendering
      }}
      // Initial animation for the cursor itself appearing
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 30,
      }}
    >
      {cursor} {/* Render the provided or default cursor element */}
    </motion.div>
  );
}

// --- PropTypes Definition ---
SmoothCursor.propTypes = {
  /**
   * Optional custom cursor element (JSX). Defaults to an SVG pointer.
   */
  cursor: PropTypes.node, // Use PropTypes.node for JSX elements
  /**
   * Optional spring configuration object for Framer Motion's useSpring.
   * Defines the physics of the cursor movement.
   */
  springConfig: PropTypes.shape({
    damping: PropTypes.number,
    stiffness: PropTypes.number,
    mass: PropTypes.number,
    restDelta: PropTypes.number,
  }),
};
