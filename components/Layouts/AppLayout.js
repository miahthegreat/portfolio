import React from "react";
import Header from "../Header";

const AppLayout = ({ children }) => {
  return (
    <div className="mx-auto min-h-screen max-w-5xl bg-zinc-50 dark:bg-zinc-900">
      <header>
        <Header />
      </header>
      <main className="text-zinc-900 dark:text-zinc-50">{children}</main>
    </div>
  );
};

export default AppLayout;
