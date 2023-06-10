"use client";

import { motion } from "framer-motion";
import { fadeIn } from "@/utils/motion";

export const TechCard = ({ index, icon, title }) => {
  return (
    <motion.div
      variants={fadeIn("up", "spring", index * 0.15, 0.75)}
      className="green-pink-gradient p-[1px] rounded-lg shadow-card"
    >
      <div className="bg-tertiary rounded-lg p-2 flex justify-evenly items-center flex-col">
        <picture>
          <img
            src={icon.src}
            alt="web-development"
            className="w-12 h-12 object-contain"
          />
        </picture>
      </div>
    </motion.div>
  );
};
