// ===============================================================
// THEME PROVIDER — Modern, Accessible, Extendable (2025)
// ===============================================================

import React, { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react"; // ✅ Type-only import (fixes TS1484)

// ===============================================================
// ✅ Type Definitions
// ===============================================================
type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

interface ThemeProviderProps {
  children: ReactNode;
}

// ===============================================================
// ✅ Context Creation
// ===============================================================
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// ===============================================================
// ✅ Provider Component
// ===============================================================
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>("light");

  // Detect system theme preference and listen for OS-level changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const updateTheme = (isDark: boolean) => {
      const newTheme: Theme = isDark ? "dark" : "light";
      setTheme(newTheme);
      document.documentElement.setAttribute("data-theme", newTheme);
    };

    // Apply current system theme
    updateTheme(mediaQuery.matches);

    // Watch for system changes dynamically
    const handleChange = (event: MediaQueryListEvent) => updateTheme(event.matches);
    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  // Toggle manually between light and dark themes
  const toggleTheme = () => {
    setTheme((prev) => {
      const newTheme = prev === "light" ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", newTheme);
      return newTheme;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// ===============================================================
// ✅ Custom Hook for Easy Usage
// ===============================================================
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
