import React from "react";
import { useStateContext } from "../context/StateContext";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const ProjectCard = ({ project }) => {
  const { title, description, demo, repo, color } = project;
  const { accent } = useStateContext();
  return (
    <div
      className={classNames(
        "rounded-md bg-gradient-to-r p-[.09rem]",
        accent?.gradientColor
      )}
    >
      <div className="flex h-full flex-col justify-between gap-6 rounded-md bg-white p-4 shadow-lg dark:bg-black">
        <div>
          <h3 className="text-base font-bold">{title}</h3>
          <p className="text-sm text-gray-400">{description}</p>
        </div>
        <div className="flex flex-col gap-2 text-sm">
          <a
            href={repo}
            target="_blank"
            rel="noreferrer"
            className={classNames("app-link", accent?.hoverColor)}
          >
            Repository
          </a>
          <a
            href={demo}
            target="_blank"
            rel="noreferrer"
            className={classNames("app-link", accent?.hoverColor)}
          >
            Live Demo
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
