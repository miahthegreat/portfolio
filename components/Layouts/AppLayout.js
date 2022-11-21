import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useStateContext } from "../../context/StateContext";
import Header from "../Header";

const AppLayout = ({ children }) => {
  const { font } = useStateContext();
  return (
    <AnimatePresence exitBeforeEnter>
      <div
        className={`linear relative mx-auto min-h-screen max-w-5xl bg-zinc-50 dark:bg-zinc-900
      ${font?.name === "Fira" ? "font-fira" : ""}
      ${font?.name === "Syne Mono" ? "font-plexmono" : ""}
      ${font?.name === "Poppins" ? "font-poppins" : ""}
      `}
      >
        <Header />
        <motion.main
          className="text-zinc-900 dark:text-zinc-50"
          initial={{ opacity: 0, y: "100vh" }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.main>
      </div>
    </AnimatePresence>
  );
};

export default AppLayout;
