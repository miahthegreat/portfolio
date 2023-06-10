"use client";

import React from "react";
import { motion } from "framer-motion";

import { styles } from "@/style";
import { services } from "@/constants";
import { SectionWrapper } from "@/hoc";
import { ServiceCard } from "./ServiceCard";
import { fadeIn, textVariant } from "../utils/motion";

const About = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className="heading__subtitle">Introduction</p>
        <h2 className="section__heading">Overview.</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]"
      >
        I'&apos;m a skilled software developer with experience in TypeScript and
        JavaScript, and expertise in frameworks like React, Node.js, and
        Three.js. I'&apos;m a quick learner and collaborate closely with clients
        to create efficient, scalable, and user-friendly solutions that solve
        real-world problems. Let'&apos;s work together to bring your ideas to
        life!
      </motion.p>

      <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8 lg:gap-6 xl:gap-10 justify-center">
        {services &&
          services.map((service, index) => (
            <ServiceCard key={service.title} index={index} {...service} />
          ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
