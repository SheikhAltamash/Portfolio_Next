import { useState, useEffect } from "react";
import { TypewriterEffect } from "../components/typeWritterText";
export default function Name() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const allWords = [
    // Phrase 1: Focus on building and scale
    [
      { text: "Building " },
      { text: "Scalable " },
      { text: "Web " },
      { text: "Applications.", className: "!text-blue-500 dark:text-blue-500" }, // Highlight last word
    ],
    // Phrase 2: Focus on specific tech and outcome
    [
      { text: "Modern " },
      { text: "Solutions " },
      { text: "with " },
      { text: "Node, " },
      { text: "React " },
      { text: "& " }, // Can use symbols too
      { text: "MongoDB.", className: "!text-green-500 dark:text-green-500" }, // Different highlight color
    ],
    // Phrase 3: Focus on user experience and craft
    [
      { text: "Crafting " },
      { text: "Engaging " },
      { text: "Digital " },
      {
        text: "Experiences.",
        className: "!text-purple-500 dark:text-purple-500",
      },
    ],
    // Phrase 4: Focus on quality and engineering principle
    [
      { text: "Architecting " },
      { text: "Performance-Driven " },
      { text: "Software.", className: "!text-red-500 dark:text-red-500" },
    ],
    // Phrase 5: Focus on forward-looking skill / interest
    [
      { text: "Exploring " },
      { text: "AI " },
      { text: "for " },
      { text: "Enhanced " },
      {
        text: "Functionality.",
        className: "!text-yellow-500 dark:text-yellow-500",
      },
    ],
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        return (prevIndex + 1) % allWords.length;
      });
    }, 4000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);
  return (
    <div className="top_type">
      <div className=" typediv flex flex-col items-center justify-center h-[40rem]  ">
        <TypewriterEffect
          className="typeWritter"
          words={allWords[currentIndex]}
          key={currentIndex}
        />
      </div>
    </div>
  );
}
