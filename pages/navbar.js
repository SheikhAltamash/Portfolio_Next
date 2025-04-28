import { HoverBorderGradient } from "./components/howerButton";

export default function Navbar() {
  return (
    <div className="navbar">
      <div className="left_nav">
        <h2>Sheikh Altamash</h2>
      </div>
      <div className="right_nav">
        <div className="rigth">
          <a>About</a>
          <a>Skills</a>
          <a>Project</a>
          <a>Experience</a>
          <a>Education</a>
          <a>Achievements</a>
          <a>Contact</a>
        </div>
        <div className="m-40 flex justify-center text-center">
          <HoverBorderGradient
            containerClassName="rounded-full"
            as="button"
            className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
          >
            <span>Download CV</span>
          </HoverBorderGradient>
        </div>
      </div>{" "}
    </div>
  );
}
