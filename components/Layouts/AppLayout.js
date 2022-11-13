import React from "react";
import { useStateContext } from "../../context/StateContext";
import Header from "../Header";

const AppLayout = ({ children }) => {
  const { font } = useStateContext();
  return (
    <div
      className={`linear mx-auto min-h-screen max-w-5xl bg-zinc-50 transition-colors duration-200 dark:bg-zinc-900
      ${font.name === "Fira" ? "font-fira" : ""}
      ${font.name === "IBM Plex Mono" ? "font-plexmono" : ""}
      ${font.name === "Poppins" ? "font-poppins" : ""}
      `}
    >
      <header>
        <Header />
      </header>
      <main className="text-zinc-900 dark:text-zinc-50">{children}</main>
    </div>
  );
};

export default AppLayout;
