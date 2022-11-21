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
import { useStateContext } from "../context/StateContext";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Skills = () => {
  const { accent } = useStateContext();
  return (
    <div className="skills" id="skills">
      <div>
        <div className="flex flex-col gap-5">
          <h1
            className={classNames(
              accent?.name === "Purple"
                ? "text-purple-600 dark:text-purple-400"
                : "",
              accent?.name === "Pink" ? "text-pink-600 dark:text-pink-400" : "",
              accent?.name === "Blue" ? "text-blue-600 dark:text-blue-400" : "",
              accent?.name === "Green"
                ? "text-green-600 dark:text-green-400"
                : "",
              accent?.name === "Orange"
                ? "text-orange-600 dark:text-orange-400"
                : "",
              "heading"
            )}
          >
            Skills
          </h1>
          <ul className="grid grid-cols-3 gap-5 md:flex">
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
      </div>
    </div>
  );
};

export default Skills;
