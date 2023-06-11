"use client";

import { motion } from "framer-motion";
import { BsChevronDoubleDown } from "react-icons/bs";
import { ComputersCanvas } from "./canvas";
const Hero = () => {
  return (
    <section className="relative w-full h-screen mx-auto">
      <div
        className={`sm:px-16 px-6 absolute inset-0 rop-[20px] max-w-7xl mx-auto flex flex-row items-start gap-5`}
      >
        <div className="flex flex-col justify-center items-center mt-5">
          <div className="w-5 h-5 rounded-full bg-[#4d7887]" />
          <div className="w-1 sm:h-80 h-40 violet-gradient" />
        </div>
        <div>
          <h1 className="text-white font-black lg:text-[80px] sm:text-[60px] xs:text-[50px] text-[40px] lg:leading-[98px] mt-2">
            Hi, I&apos;m <span className="text-[#4d7887]">Jeremiah</span>
          </h1>
          <p className="mt-2 text-white-100 font-medium lg:text-[30px] sm:text-[26px] xs:text-[20px] text-[16px] lg:leading-[40px]">
            I develop 3D visuals, user&nbsp;
            <br className="sm:block hidden" />
            interfaces, and web applications
          </p>
        </div>
      </div>
      <ComputersCanvas />
      <div className="absolute md:bottom-36 bottom-48 w-full flex justify-center items-center">
        <a href="#about">
          <motion.div
            animate={{
              y: [0, 24, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "loop",
            }}
            className="w-10 h-10 rounded-full mb-1"
          >
            <BsChevronDoubleDown className="w-10 h-10" />
          </motion.div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
