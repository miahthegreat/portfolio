import { Dispatch, SetStateAction } from 'react';

export const VIEWS = {
  '6mo': 6,
  '13mo': 13,
  '25mo': 25,
} as const;

export interface StateContextType {
  username: string;
  setUsername: Dispatch<SetStateAction<string>>;
  isLoggedIn: boolean;
  
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
  isSidebarOpen: boolean;
  setSideBarOpen: Dispatch<SetStateAction<boolean>>;

  theme: string | undefined;
  setTheme: (theme: string) => void;

  view: "6mo" | "13mo" | "25mo";
  setView: Dispatch<SetStateAction<"6mo" | "13mo" | "25mo">>;

}