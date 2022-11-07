import React from "react";
import {
  SiCss3,
  SiHtml5,
  SiFirebase,
  SiGraphql,
  SiJavascript,
  SiNextdotjs,
  SiNodedotjs,
  SiReact,
  SiTailwindcss,
} from "react-icons/si";
import Parallax from "./Parallax";

const Skills = () => {
  return (
    <div className="skills" id="skills">
      <Parallax>
        <div className="flex flex-col gap-5">
          <h1 className="heading">Skills</h1>
          <ul className="grid grid-cols-3 gap-5 font-mono md:flex">
            <li className="skill-li">
              <span className="text-sm">HTML5</span>
              <SiHtml5 className="text-[#d74a23]" />
            </li>
            <li className="skill-li">
              <span className="text-sm">JavaScript</span>
              <SiJavascript className="text-[#ebd41c]" />
            </li>
            <li className="skill-li">
              <span className="text-sm">CSS3</span>

              <SiCss3 className="text-[#2549d9]" />
            </li>
            <li className="skill-li">
              <span className="text-sm">TailwindCSS</span>
              <SiTailwindcss className="text-[#35b3ec]" />
            </li>
            <li className="skill-li">
              <span className="text-sm">React</span>
              <SiReact className="text-[#5ccfee]" />
            </li>
            <li className="skill-li">
              <span className="text-sm">Next.js</span>
              <SiNextdotjs />
            </li>
            <li className="skill-li">
              <span className="text-sm">Firebase</span>
              <SiFirebase className="text-[#ffcb2b]" />
            </li>
            <li className="skill-li">
              <span className="text-sm">GraphQL</span>
              <SiGraphql className="text-[#d833a3]" />
            </li>
            <li className="skill-li">
              <span className="text-sm">Node.js</span>
              <SiNodedotjs className="text-[#89ba3d]" />
            </li>
          </ul>
        </div>
      </Parallax>
    </div>
  );
};

export default Skills;
