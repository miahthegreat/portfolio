/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
} from 'react';
import { useTheme } from 'next-themes';
import { StateContextType } from '@/lib/types';

// State Context

const StateContext = createContext<StateContextType | undefined>(undefined);

export const StateProvider = ({ children }: { children: ReactNode }) => {

  const VIEWS = {
    '6mo': 6,
    '13mo': 13,
    '25mo': 25,
  } as const;
  
  type ViewKey = keyof typeof VIEWS;

  const [username, setUsername] = useState<string>('');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isSidebarOpen, setSideBarOpen] = useState<boolean>(false);
  const { theme, setTheme } = useTheme();
  const [view, setView] = useState<ViewKey>('6mo');

  return (
    <StateContext.Provider value={{ 
      username, setUsername, 
      isLoggedIn, setIsLoggedIn, 
      isSidebarOpen, setSideBarOpen,
      theme, setTheme,
      view, setView
      }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => {
  const context = useContext(StateContext);
  if (context === undefined) {
    throw new Error('useStateContext must be used within a StateProvider');
  }
  return context;
};


// Page Title Context 

const PageTitleContext = createContext({
  title: "",
  setTitle: (_: string) => {},
});

export const PageTitleProvider = ({ children }: { children: React.ReactNode }) => {
  const [title, setTitle] = useState("");
  return (
    <PageTitleContext.Provider value={{ title, setTitle }}>
      {children}
    </PageTitleContext.Provider>
  );
};

export const usePageTitle = () => useContext(PageTitleContext);