// import { Meteors } from "./components/meteors";
import { InfiniteMovingCards } from "./components/infiniteMovingCards";
import Name from "./ui/name";
import { LampContainer } from "./components/lamp";
import { motion } from "motion/react";
import { FloatingDock } from "./components/floatingicons";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandInstagram,
  IconBrandWhatsapp,
  IconMail,
} from "@tabler/icons-react";
import Navbar from "./ui/navbar";
import ScrollIndicatorArrow from "./components/ScrollDownIndicator";
import About from "./ui/about";
import { TextAnimate } from "./components/TextAnimate";
import { SmoothCursor } from "./components/smothCursor";
import { ScrollProgress } from "./components/scrollBarProgress";
import { ContainerScroll } from "./components/ContainerScroll";
import Projects from "./ui/projects";
import { TimelineDemo } from "./ui/education";
const testimonials = [
  { src: "/logos/css.png", alt: "Google Logo" },
  { src: "/logos/react.png", alt: "Microsoft Logo" },
  { src: "/logos/nodejs.png", alt: "Meta Logo" },
  { src: "/logos/java.png", alt: "Amazon Logo" },
  { src: "/logos/mongo-db.png", alt: "Apple Logo" },
  { src: "/logos/html.png", alt: "Apple Logo" },
  { src: "/logos/tailwind-css.png", alt: "Apple Logo" },
  { src: "/logos/javascript.png", alt: "Apple Logo" },
  { src: "/logos/postman.png", alt: "Apple Logo" },
  { src: "/logos/puppeteer.png", alt: "Apple Logo" },
  { src: "/logos/render.jpeg", alt: "Apple Logo" },
  { src: "/logos/vercel.png", alt: "Apple Logo" },
  { src: "/logos/cloudinary.png", alt: "Apple Logo" },
];
const links = [
  {
    title: "Mail",
    icon: (
      // Replaced text-neutral-500 dark:text-neutral-300 with text-blue-400
      <IconMail className="h-full w-full text-blue-400" />
    ),
    href: "mailto:altamashsheikh077@gmail.com",
  },
  {
    title: "Linkedin",
    icon: (
      // Replaced text-neutral-500 dark:text-neutral-300 with text-blue-400
      <IconBrandLinkedin className="h-full w-full text-blue-400" />
    ),
    href: "https://www.linkedin.com/in/sheikhaltamash",
  },
  {
    title: "Instagram",
    icon: (
      // Replaced text-neutral-500 dark:text-neutral-300 with text-blue-400
      <IconBrandInstagram className="h-full w-full text-blue-400" />
    ),
    href: "https://www.instagram.com/test_spys/?next=%2F",
  },
  {
    title: "WhatsAap",
    icon: (
      // Replaced text-neutral-500 dark:text-neutral-300 with text-blue-400
      <IconBrandWhatsapp className="h-full w-full text-blue-400" />
    ),
    href: "https://wa.me/7498399449",
  },
  {
    title: "GitHub",
    icon: (
      // Replaced text-neutral-500 dark:text-neutral-300 with text-blue-400
      <IconBrandGithub className="h-full w-full text-blue-400" />
    ),
    href: "https://github.com/SheikhAltamash",
  },
];
export default function Home() {
  return (
    <>
      <Navbar></Navbar>
      <ScrollProgress></ScrollProgress>
      {/* <SmoothCursor></SmoothCursor> */}
      <div className="lamp_div">
        <LampContainer>
          <motion.div
            initial={{ opacity: 0.5, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: "easeInOut",
            }}
            className="toph1 mt-5 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
          >
            Sheikh Altamash
            <Name className="typename"></Name>
            <h3 className="afternameh3 ">
              Passionate Computer Science student crafting dynamic and{" "}
              <br className="noBreak" />
              user-friendly web applications.
            </h3>{" "}
            <div className="floating_deck flex items-center justify-center h-[35rem] w-full">
              <FloatingDock items={links} className="float" />
            </div>
          </motion.div>
        </LampContainer>
      </div>
      <div className="view_touch">
        <a>View Project</a>
        <a>Get In Touch</a>
      </div>
      <ScrollIndicatorArrow />
      <About></About>

      <div className="afternav">
        <div className="top_About_h2 ">
          <h2>Skills</h2>
          <div className="underline_aboutME"></div>
        </div>
        <div className=" infite h-[20rem] rounded-md flex flex-col antialiased bg-white dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
          <InfiniteMovingCards
            items={testimonials}
            direction="right"
            speed="fast"
            className="infit"
          />
        </div>
        <div className="infite botttom h-[20rem] rounded-md flex flex-col antialiased bg-white dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
          <InfiniteMovingCards
            items={testimonials}
            direction="left"
            speed="fast"
          />
        </div>{" "}
      </div>
      <Projects></Projects>
      <TimelineDemo></TimelineDemo>
    </>
  );
}
