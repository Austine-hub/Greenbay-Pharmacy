// ===============================================================
// THEME PROVIDER — Modern, Accessible, Extendable (2025)
// ===============================================================

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";

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
// ✅ Create Context
// ===============================================================
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// ===============================================================
// ✅ Provider Component
// ===============================================================
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>("light");

  // Detect system preference & listen for changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const applyTheme = (isDark: boolean) => {
      setTheme(isDark ? "dark" : "light");
    };

    applyTheme(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => applyTheme(e.matches);
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Apply current theme to <html>
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Theme toggle for user control
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// ===============================================================
// ✅ Hook for Easy Access
// ===============================================================
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
