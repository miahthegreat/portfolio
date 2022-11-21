import { useContext, createContext, useState, useEffect } from "react";

const Context = createContext();

export const useStateContext = () => useContext(Context);

export const StateContext = ({ children }) => {
  const [commentModalOpen, setCommentModalOpen] = useState(false);
  const [font, setFont] = useState(null);
  const [accent, setAccent] = useState(null);

  useEffect(() => {
    if (typeof window !== undefined) {
      if (localStorage.getItem("font")) {
        const localFont = localStorage.getItem("font");
        setFont(JSON.parse(localFont));
      } else {
        setFont({
          name: "Fira",
        });
      }
      if (localStorage.getItem("accent")) {
        const localAccent = localStorage.getItem("accent");
        setAccent(JSON.parse(localAccent));
      } else {
        setAccent({
          name: "Pink",
          bgColor: "bg-pink-500",
          selectedColor: "ring-pink-500",
        });
      }
    }
  }, []);

  return (
    <Context.Provider
      value={{
        commentModalOpen,
        setCommentModalOpen,
        font,
        setFont,
        accent,
        setAccent,
      }}
    >
      {children}
    </Context.Provider>
  );
};
