import Image from "next/image";
import React from "react";
import logo from "../public/images/avatar.png";

const Main = () => {
  return (
    <div className="main">
      <div>
        <h1 className="font-mono text-3xl text-gray-50">Jeremiah</h1>
        <h3 className="font-sans text-lg tracking-widest text-gray-400">
          Frontend Developer
        </h3>
        <p className="text-sm font-light text-gray-500">
          Building Web apps, proficient in Frontend. Writing articles on my blog
          sometimes.
        </p>
      </div>
      <div className="-z-10 w-32 overflow-hidden rounded-full">
        <Image
          src={logo}
          alt="TMNT Avatar"
          className="object-cover"
          width={600}
          height={449}
        />
      </div>
    </div>
  );
};

export default Main;
