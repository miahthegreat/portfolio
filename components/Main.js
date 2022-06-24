import Image from "next/image";
import React from "react";
import logo from "../public/images/avatar.png";
import Parallax from "./Parallax";

const Main = () => {
  return (
    <div className="main">
      <Parallax>
        <h1 className="font-mono text-3xl text-gray-50">Jeremiah</h1>
        <h3 className="font-sans text-lg tracking-widest text-gray-400">
          Frontend Web Developer
        </h3>
        <p className="text-sm font-light text-gray-500">
          Building Web apps, proficient in Frontend. Writing articles on my blog
          sometimes.
        </p>
      </Parallax>
      <Parallax>
        <div className="-z-10 h-32 w-32 overflow-hidden">
          <Image
            src={logo}
            alt="TMNT Avatar"
            className="object-cover"
            width={421}
            height={421}
          />
        </div>
      </Parallax>
    </div>
  );
};

export default Main;
