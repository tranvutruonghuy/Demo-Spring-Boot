"use client";

import { useTheme } from "../../contexts/ThemeContext";

export const ThemeToggleButton = () => {
  // Sử dụng custom hook để lấy theme và hàm toggle
  const { theme, toggleTheme } = useTheme();

  return (
    <div style={{ padding: "1rem" }}>
      <p>Current theme: {theme}</p>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
};
