"use client";

import { useState } from "react";
import Link from "next/link";

import { navLinks } from "@/constants";
import { logo, menu, close } from "@/public/assets";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  return (
    <nav
      className={`
      sm:px-16 px-6 w-full flex items-center py-5 fixed top-0 z-20 bg-primary/20 backdrop-blur-md`}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        <Link
          href="/"
          className="flex items-center gap-2"
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <picture>
            <img src={logo.src} alt="logo" className="w-12 h-12" />
          </picture>
          <p className="text-white text-[18px] sm:text-sm md:text-[18px] font-bold cursor-pointer flex">
            Jeremiah&nbsp;
            <span className="sm:block hidden">|&nbsp;Full Stack Developer</span>
          </p>
        </Link>
        <ul className="list-none hidden sm:flex flex-row gap-10">
          {navLinks.map((link, idx) => (
            <li
              key={link.id}
              className={`
            ${active === link.title ? "text-white" : "text-secondary"}
            hover:text-white text-sm md:text-[18px] font-medium cursor-pointer`}
              onClick={() => setActive(link.title)}
            >
              <a href={`#${link.id}`}>{link.title}</a>
            </li>
          ))}
        </ul>
        <div className="sm:hidden flex flex-1 justify-end items-center relative">
          <picture
            className={`absolute w-[28px] h-[28px] object-contain cursor-pointer origin-center transition transform duration-200 ease-linear ${
              toggle ? "opacity-100 scale-100" : "opacity-0 scale-0"
            }`}
            onClick={() => setToggle(!toggle)}
          >
            <img
              src={close.src}
              alt="menu"
              className={`transition transform duration-200 ease-linear origin-center ${
                toggle ? "rotate-180 opacity-100" : "rotate-0 opacity-0"
              }`}
            />
          </picture>
          <picture
            className={`absolute w-[28px] h-[28px] object-contain cursor-pointer transition transform duration-200 ease-linear ${
              toggle
                ? "opacity-0 scale-0 origin-center"
                : "opacity-100 scale-100 origin-center"
            }`}
            onClick={() => setToggle(!toggle)}
          >
            <img
              src={menu.src}
              alt="menu"
              className={`transition transform origin-center duration-200 ease-linear  ${
                toggle ? "rotate-0 opacity-0 origin" : "rotate-180 opacity-100"
              }`}
            />
          </picture>
          <div
            className={`transition transform origin-center duration-200 ease-linear  ${
              !toggle ? "opacity-0 scale-0" : "opacity-100 scale-100"
            } p-6 black-gradient -right-8 top-2 absolute mx-4 my-2 max-h-max min-w-[140px] z-10 rounded-xl transition transform duration-200 ease-linear`}
          >
            <ul className="list-none flex sm:hidden justify-end flex-col gap-4 items-start">
              {navLinks.map((link, idx) => (
                <li
                  key={link.id}
                  className={`
            ${active === link.title ? "text-white" : "text-secondary"}
            hover:text-white text-[16px] font-medium cursor-pointer`}
                  onClick={() => {
                    setActive(link.title);
                    setToggle(!toggle);
                  }}
                >
                  <a href={`#${link.id}`}>{link.title}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
