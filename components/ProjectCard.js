import React from "react";

const ProjectCard = ({ project }) => {
  const { title, description, demo, repo, color } = project;
  return (
    <div className={`rounded-md bg-gradient-to-r from-sky-300 to-sky-600 p-1`}>
      <div className="flex h-full flex-col justify-between gap-6 rounded-md bg-black p-2 text-gray-50">
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
