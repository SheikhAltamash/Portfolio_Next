import { ContainerScroll } from "../components/ContainerScroll";
import { BackgroundGradient } from "../components/gradientBackground";
import { BorderBeam, Button } from "../components/howerButton";

export default function Projects() {
  return (
    <div className="Mainproject light-section">
      <div>
        <div className="top_About_h2">
          <h2 className="text_white_pro">Projects</h2>
          <div className="underline_aboutME"></div>
        </div>
      </div>
      <div className="flex first_container_scroll flex-col overflow-hidden main_flow_project_first">
        <ContainerScroll className="scroll_container ">
          <div className="content_in_container">
            <h2>Social Forensics</h2>
            <p>
              Automated Social Media parsing tool incorporating detailed report
              generation
            </p>
            <img src="/images/social.png"></img>
            <div className="live_buttons ">
            <a>  Live Link</a>
              <a>Repo</a>
            </div>
          </div>
        </ContainerScroll>
      </div>

      <div className="first_container_scroll flex flex-col overflow-hidden up_contain">
        <ContainerScroll>
          {" "}
          <div className="content_in_container">
            <h2>Nault</h2>
            <p>
              Online notes sharing platform incorporating gemini for doubt
              solving
            </p>
            <img src="/images/nault.png"></img>
            <div className="live_buttons ">
              <a>Live Link</a>
              <a>Repo</a>
            </div>
          </div>
        </ContainerScroll>
      </div>
      <div className="first_container_scroll flex flex-col overflow-hidden up_contain bottom_container_up">
        <ContainerScroll>
          {" "}
          <div className="content_in_container">
            <h2>Portfolio</h2>
            <p>My Portfolio</p>
            <img src="/images/portfolio.png"></img>
            <div className="live_buttons ">
              <a>Live Link</a>
              <a>Repo</a>
            </div>
          </div>
        </ContainerScroll>
      </div>
    </div>
  );
}
