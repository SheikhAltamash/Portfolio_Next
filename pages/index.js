// import { Meteors } from "./components/meteors";
import { InfiniteMovingCards } from "./components/infiniteMovingCards";
import Name from "./name";
import AllProjects from "./components/allProjects";
import { LampContainer } from "./components/lamp";
import { motion } from "motion/react";
import { FloatingDock } from "./components/floatingicons";
import {
  IconBrandGithub,
  IconBrandX,
  IconExchange,
  IconHome,
  IconNewSection,
  IconTerminal2,
} from "@tabler/icons-react";
import Navbar from "./navbar";
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
    title: "Home",
    icon: (
      // Replaced text-neutral-500 dark:text-neutral-300 with text-blue-400
      <IconHome className="h-full w-full text-blue-400" />
    ),
    href: "#",
  },
  {
    title: "Products",
    icon: (
      // Replaced text-neutral-500 dark:text-neutral-300 with text-blue-400
      <IconTerminal2 className="h-full w-full text-blue-400" />
    ),
    href: "#",
  },
  {
    title: "Components",
    icon: (
      // Replaced text-neutral-500 dark:text-neutral-300 with text-blue-400
      <IconNewSection className="h-full w-full text-blue-400" />
    ),
    href: "#",
  },
  {
    title: "Aceternity UI",
    // This uses an img tag, so no text color class to change here
    icon: (
      <img
        src="https://assets.aceternity.com/logo-dark.png"
        width={20}
        height={20}
        alt="Aceternity Logo"
        // If you wanted to apply a filter or border color, you'd add classes here
      />
    ),
    href: "#",
  },
  {
    title: "Changelog",
    icon: (
      // Replaced text-neutral-500 dark:text-neutral-300 with text-blue-400
      <IconExchange className="h-full w-full text-blue-400" />
    ),
    href: "#",
  },
  {
    title: "Twitter",
    icon: (
      // Replaced text-neutral-500 dark:text-neutral-300 with text-blue-400
      <IconBrandX className="h-full w-full text-blue-400" />
    ),
    href: "#",
  },
  {
    title: "GitHub",
    icon: (
      // Replaced text-neutral-500 dark:text-neutral-300 with text-blue-400
      <IconBrandGithub className="h-full w-full text-blue-400" />
    ),
    href: "#",
  },
];
export default function Home() {
  return (
    <>
      <Navbar></Navbar>
      <div className="lam">
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
              Passionate Computer Science student crafting dynamic and <br />
              user-friendly web applications.
            </h3>{" "}
            <div className="floating_deck flex items-center justify-center h-[35rem] w-full">
              <FloatingDock items={links} className="float" />
            </div>
          </motion.div>
        </LampContainer>
      </div>
      <div className="afternav">
        {/* <AllProjects></AllProjects> */}
        <div className=" infite h-[20rem] rounded-md flex flex-col antialiased bg-white dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
          <InfiniteMovingCards
            items={testimonials}
            direction="right"
            speed="fast"
            className="infit"
          />
        </div>
        <div className="infite h-[20rem] rounded-md flex flex-col antialiased bg-white dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
          <InfiniteMovingCards
            items={testimonials}
            direction="left"
            speed="fast"
          />
        </div>{" "}
        {/* <Meteors className="meteor" /> */}{" "}
      </div>
    </>
  );
}
