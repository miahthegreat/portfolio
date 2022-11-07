import { useContext, createContext, useState, useEffect } from "react";

const Context = createContext();

export const useStateContext = () => useContext(Context);

export const StateContext = ({ children }) => {
  const [commentModalOpen, setCommentModalOpen] = useState(false);

  return (
    <Context.Provider
      value={{
        commentModalOpen,
        setCommentModalOpen,
      }}
    >
      {children}
    </Context.Provider>
  );
};
