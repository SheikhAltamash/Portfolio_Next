import React, { useEffect, useRef } from "react";
import { HoverBorderGradient } from "../components/howerButton"; // Assuming correct path
import { BackgroundGradient } from "../components/gradientBackground";
import { TextGradient } from "../components/TextGradient";

export default function Navbar() {
  const cvPath = "/Sheikh_Altamash_CV.pdf";
  const downloadFilename = "Sheikh_Altamash_Resume.pdf";
  const titleRef = useRef(null);

  useEffect(() => {
    const titleElement = titleRef.current;
    if (!titleElement) {
      console.error("Navbar Title Ref not found!"); // Log if ref fails
      return;
    }
    console.log("Navbar Effect Running. Title Element:", titleElement); // Log effect start

    const darkTextClass = "text-black";
    const lightTextClass = "text-white";

    // --- Adjust this value if needed ---
    const navbarOffset = 60; // Pixels roughly below your navbar
    // ---
    const rootMarginBottom = -(window.innerHeight - navbarOffset);
    console.log(
      `Calculated rootMargin bottom: ${rootMarginBottom}px (using offset: ${navbarOffset}px)`
    ); // Log margin

    const observerOptions = {
      root: null,
      rootMargin: `0px 0px ${rootMarginBottom}px 0px`,
      threshold: 0.01,
    };

    let isCurrentlyDark = titleElement.classList.contains(darkTextClass); // Check initial state
    console.log("Initial state isCurrentlyDark:", isCurrentlyDark);

    const observerCallback = (entries) => {
      console.log("Observer Callback Triggered. Entries:", entries); // Log callback trigger

      let shouldBeDark = false; // Default to not dark unless a light section intersects

      entries.forEach((entry) => {
        const targetHasLightClass =
          entry.target.classList.contains("light-section");
        console.log(
          `Entry target:`,
          entry.target,
          `Is intersecting: ${entry.isIntersecting}`,
          `Has light-section class: ${targetHasLightClass}`
        ); // Log entry details

        // We want it dark if a 'light-section' IS intersecting the top zone
        if (entry.isIntersecting && targetHasLightClass) {
          shouldBeDark = true;
        }
      });

      // *** Important Refinement ***
      // If multiple elements are observed, we need to know if *any* intersecting element
      // in the top zone is a light section. We might need to check *all* observed elements' status,
      // not just the ones in the current `entries` batch if the logic gets complex.
      // However, let's stick to the simple check for now. If a light section IS intersecting, be dark.

      console.log(`Based on entries, shouldBeDark is now: ${shouldBeDark}`); // Log decision

      // Update class only if the state needs to change
      if (shouldBeDark && !isCurrentlyDark) {
        console.log("CHANGING TO DARK"); // Log change
        titleElement.classList.add(darkTextClass);
        titleElement.classList.remove(lightTextClass);
        isCurrentlyDark = true;
      } else if (!shouldBeDark && isCurrentlyDark) {
        console.log("CHANGING TO LIGHT"); // Log change
        titleElement.classList.remove(darkTextClass);
        titleElement.classList.add(lightTextClass);
        isCurrentlyDark = false;
      } else {
        console.log(
          "No change needed. shouldBeDark:",
          shouldBeDark,
          "isCurrentlyDark:",
          isCurrentlyDark
        ); // Log no change
      }
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    const lightSections = document.querySelectorAll(".light-section");
    console.log(
      `Found ${lightSections.length} elements with class 'light-section'`,
      lightSections
    ); // Log found elements

    if (lightSections.length === 0) {
      console.warn(
        "WARNING: No elements with class 'light-section' found to observe."
      );
    } else {
      lightSections.forEach((section) => observer.observe(section));
    }

    // --- Initial Check (Optional but Recommended) ---
    // You might want to run a check immediately on mount
    // This is more complex as it requires checking positions manually
    // For now, let's rely on the observer triggering as sections scroll into view.
    // ---

    return () => {
      console.log("Navbar Effect Cleanup: Disconnecting observer."); // Log cleanup
      lightSections.forEach((section) => observer.unobserve(section)); // Use the same list
      observer.disconnect();
    };
  }, []); // Empty dependency array

  return (
    <div
      className="navbar"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 50,
        padding: "1rem 2rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        pointerEvents: "none" /* Allow clicks through container */,
      }}
    >
      <div
        className="left_nav"
        style={{ pointerEvents: "auto" /* Re-enable for content */ }}
      >
        {/* Ensure initial class is set */}
        <h2
          ref={titleRef}
          className="text-white"
          // style={{
          //   transition: "color 0.2s ease",
          //   fontSize: "1.5rem",
          //   fontWeight: "bold",
          // }}
        >
         <TextGradient>Sheikh Altamash</TextGradient> 
        </h2>
      </div>

      <div
        className="right_nav"
        style={{ pointerEvents: "auto" /* Re-enable for content */ }}
      >
        <BackgroundGradient className="right_nav_down">
          <a
            href={cvPath}
            download={downloadFilename}
            className="download_button" // Make sure this class allows pointer events if needed
          >
            Download CV
          </a>
        </BackgroundGradient>
      </div>
    </div>
  );
}
