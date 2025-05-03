import React from "react";
import { Timeline } from "../components/timeLine";

export function TimelineDemo() {
  const data = [
    {
      title: "2022-Present",
      content: (
        <div className="under_line">
          <h1>Graduation</h1>
          <h2 className="first_time_sc">
            Bachelor of Technology in Computer Science and Engineering
          </h2>
          <h2 className="second_time_sc">
            Anjuman College Of Engineering and Technology, Nagpur, Maharashtra
          </h2>
        </div>
      ),
    },
    {
      title: "2020-2022",
      content: (
        <div className="under_line">
          <h1>High School</h1>
          <h2 className="first_time_sc">
            Higher Secondary School Certificate{" "}
          </h2>
          <h2 className="second_time_sc">
            Seth Kesrimal Porwal College, Kamptee, Maharashtra
          </h2>
        </div>
      ),
    },
    {
      title: "2019-2020",
      content: (
        <div className="under_line">
          <h1>School</h1>
          <h2 className="first_time_sc">Secondary School Certificate </h2>
          <h2 className="second_time_sc">
            Sree Narayana Vidiyalaya, Kanhan, Maharashtra
          </h2>
        </div>
      ),
    },
  ];
  return (
    <div className="time_main relative w-full overflow-clip light-section">
      <div className="top_About_h2">
        <h2>Education</h2>
        <div className="underline_aboutME"></div>
      </div>
      <Timeline data={data} className="light-section" />
    </div>
  );
}
