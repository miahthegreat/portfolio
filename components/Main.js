import Image from "next/image";
import React from "react";
import { useStateContext } from "../context/StateContext";
import logo from "../public/images/avatar.png";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Main = () => {
  const { accent } = useStateContext();
  return (
    <div className="main">
      <div>
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
          Jeremiah
        </h1>
        <h3 className="heading__sub1">Frontend Web Developer</h3>
        <p className="heading__sub2">
          Building Web apps, proficient in Frontend. Writing articles on my blog
          sometimes.
        </p>
      </div>
      <div>
        <div className="-z-10 h-32 w-32 overflow-hidden">
          <Image
            src={logo}
            alt="TMNT Avatar"
            className="object-cover"
            width={421}
            height={421}
          />
        </div>
      </div>
    </div>
  );
};

export default Main;
