// pages/ui/about.js
import { motion } from "motion/react"; // Or "framer-motion"
import { TextAnimate } from "../components/TextAnimate"; // Adjust path if needed

// Define variants for the container that will stagger its children
const containerVariants = {
  hidden: { opacity: 1 }, // Parent container itself doesn't need to animate opacity here
  show: {
    opacity: 1,
    transition: {
      // Delay between the START of each child's animation.
      // Needs to be long enough for one paragraph's animation to feel complete.
      // Let's estimate based on block animation (0.6s) + some time for characters.
      staggerChildren: 0.8, // Adjust this value (in seconds) as needed for desired pacing
      // delayChildren: 0.2, // Optional: delay before the very first paragraph starts
    },
  },
};

// Define variants for the children (the TextAnimate components themselves)
// These variants control the animation of the *entire paragraph block*
const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6, // How long each paragraph block takes to fade/slide in
      ease: "easeOut",
    },
  },
  exit: {
    // Optional exit animation if the whole About section unmounts
    opacity: 0,
    y: -20,
    transition: { duration: 0.3 },
  },
};

export default function About() {
  return (
    <div className="About_main light-section">
      <div className="top_About_h2">
        <h2>About Me</h2>
        <div className="underline_aboutME"></div>
      </div>
      <div className="bottom_About">
        <div className="about_circle">
          <h1>SA</h1>
        </div>

        {/* Wrap the paragraphs in a motion container */}
        {/* Use initial/animate to trigger on mount, remove whileInView/viewport */}
        <motion.div
          className="About_p"
          variants={containerVariants}
          initial="hidden"
          animate="show" // Trigger animation automatically on component mount
          exit="hidden" // Optional: define exit state if About unmounts
        >
          {/* Pass the itemVariants to control the stagger */}
          {/* TextAnimate internal animation settings */}
          <TextAnimate
            animation="blurInUp"
            duration={0.03} // Speed for *each character* within this block
            by="character"
            variants={itemVariants} // Pass variants for the *block* animation
          >
            I'm Sheikh Altamash, a B.Tech Computer Science student from Nagpur,
            driven by a passion for building impactful web solutions using the
            MERN stack. I love the challenge of turning complex problems into
            clean, responsive, and user-friendly applications.
          </TextAnimate>

          <TextAnimate
            animation="blurInUp"
            duration={0.03}
            by="character"
            variants={itemVariants} // Pass the same variants for staggering
          >
            My journey includes hands-on projects and competitive experiences
            like winning Aavishkar 2025 and reaching the Patent Connect finals
            opportunities that have significantly sharpened my technical
            abilities and collaborative skills.
          </TextAnimate>

          <TextAnimate
            animation="blurInUp"
            duration={0.03}
            by="character"
            variants={itemVariants} // Pass the same variants for staggering
          >
            I'm constantly learning and eager to apply my skills to create
            meaningful digital experiences.
          </TextAnimate>
        </motion.div>
      </div>
    </div>
  );
}
