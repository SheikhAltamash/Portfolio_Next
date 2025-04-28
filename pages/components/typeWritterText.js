"use client";

import { cn } from "@/lib/utils"; // Make sure this path is correct
import { motion, stagger, useAnimate, useInView } from "framer-motion";
import { useEffect } from "react";
import React from "react";
export const TypewriterEffect = ({ words, className, cursorClassName }) => {
  const wordsArray = words.map((word) => {
    return {
      ...word,
      text: word.text.split(""),
    };
  });

  const [scope, animate] = useAnimate();
  const isInView = useInView(scope);

  useEffect(() => {
    if (isInView) {
      animate(
        "span.char-span", // Target only character spans specifically
        {
          display: "inline-block",
          opacity: 1,
          width: "fit-content",
        },
        {
          duration: 0.5,
          delay: stagger(0.05),
          ease: "easeInOut",
        }
      );
    }
  }, [isInView, animate]);

  const renderWords = () => {
    return (
      <motion.div ref={scope} className="inline typein">
        {wordsArray.map((word, idx) => {
          return (
            // Use React.Fragment to group word div and space span without adding extra DOM node
            <React.Fragment key={`word-${idx}`}>
              {/* Word container - REMOVED mr-2 */}
              <div className="inline-block typeWritter">
                {word.text.map((char, index) => (
                  <motion.span
                    initial={{}}
                    key={`char-${index}`}
                    // Added a specific class 'char-span' for the animation target
                    className={cn(
                      `char char-span dark:text-white text-black opacity-0 hidden`,
                      word.className
                    )}
                  >
                    {char}
                  </motion.span>
                ))}
              </div>
              {/* Add a space span *after* each word div, except the last one */}
              {idx !== wordsArray.length - 1 && (
                <span className="inline-block w-2 md:w-3 lg:w-4"></span> // Use width for space amount
                // Alternatively, use a literal space if width doesn't work:
                // <span className="inline-block"> </span>
              )}
            </React.Fragment>
          );
        })}
      </motion.div>
    );
  };

  return (
    <div
      className={cn(
        "text-base sm:text-xl md:text-3xl lg:text-5xl font-bold text-center",
        className
      )}
    >
      {renderWords()}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className={cn(
          "inline-block rounded-sm w-[4px] h-4 md:h-6 lg:h-10 bg-blue-500 ml-1", // Keep slight space before cursor
          cursorClassName
        )}
      ></motion.span>
    </div>
  );
};

// --- TypewriterEffectSmooth remains the same as the previous version ---
// (Assuming it was working correctly)
export const TypewriterEffectSmooth = ({
  words,
  className,
  cursorClassName,
}) => {
  const wordsArray = words.map((word) => {
    return {
      ...word,
      text: word.text.split(""),
    };
  });

  const renderWords = () => {
    return (
      <div>
        {wordsArray.map((word, idx) => {
          return (
            <React.Fragment key={`word-${idx}`}>
              <div className="inline-block">
                {word.text.map((char, index) => (
                  <span
                    key={`char-${index}`}
                    className={cn(
                      `dark:text-white text-black `,
                      word.className
                    )}
                  >
                    {char}
                  </span>
                ))}
              </div>
              {/* Add space between words here too if needed, though flex gap should handle it */}
              {idx !== wordsArray.length - 1 && (
                <span className="inline-block"> </span>
              )}
            </React.Fragment>
          );
        })}
      </div>
    );
  };

  return (
    <div className={cn("flex space-x-1 my-6 items-center", className)}>
      <motion.div
        className="overflow-hidden"
        initial={{ width: "0%" }}
        whileInView={{ width: "100%" }}
        transition={{
          duration: 2,
          ease: "linear",
          delay: 0.5,
        }}
      >
        <div className="text-xs sm:text-base md:text-xl lg:text:3xl xl:text-5xl font-bold whitespace-nowrap">
          {renderWords()}
        </div>
      </motion.div>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className={cn(
          "block rounded-sm w-[4px] h-4 sm:h-6 xl:h-12 bg-blue-500",
          cursorClassName
        )}
      ></motion.span>
    </div>
  );
};
