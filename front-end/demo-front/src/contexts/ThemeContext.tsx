"use client";

import { ConfigProvider, theme } from "antd";
import {
  createContext,
  useState,
  useMemo,
  ReactNode,
  useContext,
  useEffect,
} from "react";

type ThemeContextType = {
  theme: "light" | "dark";
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [userTheme, setUserTheme] = useState<"light" | "dark">("light");

  const toggleTheme = () => {
    setUserTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    console.log("Theme toggled: ", userTheme);
  }, [userTheme]);

  const value = useMemo(() => ({ theme: userTheme, toggleTheme }), [userTheme]);

  return (
    <ThemeContext.Provider value={value}>
      <ConfigProvider
        theme={{
          algorithm:
            userTheme === "dark" ? theme.darkAlgorithm : theme.defaultAlgorithm,
          // token: userTheme === 'dark' ? theme.defaultSeed
        }}
      >
        {children}
      </ConfigProvider>
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
