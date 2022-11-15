import { useContext, createContext, useState } from "react";

const Context = createContext();

export const useStateContext = () => useContext(Context);

export const StateContext = ({ children }) => {
  const [commentModalOpen, setCommentModalOpen] = useState(false);
  const [font, setFont] = useState({
    name: "Fira",
  });
  const [accent, setAccent] = useState({
    name: "Purple",
    bgColor: "bg-purple-500",
    selectedColor: "ring-purple-500",
  });

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
