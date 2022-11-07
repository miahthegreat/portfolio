import Image from "next/image";
import React from "react";
import logo from "../public/images/avatar.png";
import Parallax from "./Parallax";

const Main = () => {
  return (
    <div className="main">
      <Parallax>
        <h1 className="heading">Jeremiah</h1>
        <h3 className="heading__sub1">Frontend Web Developer</h3>
        <p className="heading__sub2">
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
