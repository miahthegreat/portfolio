import { useContext, createContext, useState } from "react";

const Context = createContext();

export const useStateContext = () => useContext(Context);

export const StateContext = ({ children }) => {
  const [commentModalOpen, setCommentModalOpen] = useState(false);
  const [font, setFont] = useState({
    name: "Fira",
  });

  return (
    <Context.Provider
      value={{
        commentModalOpen,
        setCommentModalOpen,
        font,
        setFont,
      }}
    >
      {children}
    </Context.Provider>
  );
};
