import React from "react";
import { HoverBorderGradient } from "../components/howerButton"; // Assuming correct path
import { BackgroundGradient } from "../components/gradientBackground";

export default function Navbar() {
  const cvPath = "/Sheikh_Altamash_CV.pdf"; // IMPORTANT: Make sure this matches the filename in your /public folder
  const downloadFilename = "Sheikh_Altamash_Resume.pdf"; // 
  return (
    <div className="navbar">
      <div className="left_nav">
        <h2>Sheikh Altamash</h2>
      </div>

      <div className="right_nav">
        <BackgroundGradient className="right_nav_down">
          <a
            href={cvPath}
            download={downloadFilename}
            className="download_button"
          >
            Download CV
          </a>
        </BackgroundGradient>
      </div>
    </div>
  );
}
