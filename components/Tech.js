"use client";

import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";
import { TechCard } from "./TechCard";

const Tech = () => {
  return (
    <div className="my-10 flex flex-row flex-wrap justify-center gap-10">
      {technologies.map((technology, idx) => (
        <TechCard key={technology.name} icon={technology.icon} index={idx} />
      ))}
    </div>
  );
};

export default SectionWrapper(Tech, "");
