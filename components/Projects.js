import React from "react";
import { useStateContext } from "../context/StateContext";
import ProjectCard from "./ProjectCard";

const projects = [
  {
    title: "Temperature Conversion App",
    description: "Web app for temperature conversion",
    repo: "https://github.com/miahthegreat/temperature-conversion-app",
    demo: "https://temperature-conversion-app.vercel.app/",
    color: "sky",
  },
  {
    title: "Countries App",
    description: "Web app to find country flag, capital, and currency",
    repo: "https://github.com/miahthegreat/countries-app",
    demo: "https://countries-app-lake.vercel.app/",
    color: "red",
  },
  {
    title: "Spotify Clone App",
    description:
      "Web app that clones the desktop Spotify design, purely aesthetic",
    repo: "https://github.com/miahthegreat/spotify-clone",
    demo: "https://spotify-clone-lilac.vercel.app/",
    color: "green",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Projects = () => {
  const { accent } = useStateContext();
  return (
    <div className="projects" id="projects">
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
            Featured Projects
          </h1>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            {projects.map((project) => {
              return <ProjectCard key={project.title} project={project} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
