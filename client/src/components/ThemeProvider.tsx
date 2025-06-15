import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark" | "system";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
  theme: "dark",
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "dark", // Manteniamo "dark" come predefinito
  storageKey = "leader24-ui-theme",
  ...props
}: ThemeProviderProps) {
  // Determina il tema iniziale in base a:
  // 1. Tema salvato in localStorage (se disponibile)
  // 2. Tema predefinito "dark" altrimenti
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem(storageKey) as Theme | null;
    return savedTheme || defaultTheme;
  });

  // Applica il tema al documento HTML
  useEffect(() => {
    const root = window.document.documentElement;
    
    // Rimuovi tutte le classi di tema
    root.classList.remove("light", "dark");
    
    // Se il tema è "system", applica il tema basato sulle preferenze del sistema
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
        
      root.classList.add(systemTheme);
      root.setAttribute("data-theme", systemTheme);
      return;
    }
    
    // Altrimenti, applica il tema scelto
    root.classList.add(theme);
    root.setAttribute("data-theme", theme);
  }, [theme]);

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);
  
  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");
    
  return context;
};