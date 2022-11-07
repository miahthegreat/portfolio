import React from "react";

const ProjectCard = ({ project }) => {
  const { title, description, demo, repo, color } = project;
  return (
    <div
      className={`rounded-md bg-gradient-to-r ${
        color === "red" ? "from-red-300 to-red-600" : ""
      } ${color === "sky" ? "from-blue-300 to-blue-600" : ""} ${
        color === "green" ? "from-green-300 to-green-600" : ""
      } p-[.05rem]`}
    >
      <div className="flex h-full flex-col justify-between gap-6 rounded-md bg-white p-2 shadow-lg dark:bg-black">
        <div>
          <h3 className="text-base font-bold">{title}</h3>
          <p className="text-sm text-gray-400">{description}</p>
        </div>
        <div className="flex flex-col gap-2 text-sm">
          <a href={repo} target="_blank" rel="noreferrer" className="app-link">
            Repository
          </a>
          <a href={demo} target="_blank" rel="noreferrer" className="app-link">
            Live Demo
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
