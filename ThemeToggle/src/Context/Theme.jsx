import { useState,useContext,useEffect, createContext } from "react";

const ThemeContext = createContext({
  themeMode : 'light',
  lightTheme : () => {},
  darkTheme : () => {}
});

const useTheme = () => {
  return useContext(ThemeContext)
}

const ThemeProvider = ({children}) => {

  const [themeMode, setThemeMode] = useState(()=>{
    const localTheme = localStorage.getItem('themeMode');
    const preferredTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    return localTheme || preferredTheme;
  });

  const lightTheme = () => {
    setThemeMode('light');
    localStorage.setItem('themeMode', 'light');
  }

  const darkTheme = () => {
    setThemeMode('dark');
    localStorage.setItem('themeMode', 'dark');
  }

  useEffect(()=>{
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(themeMode);
    localStorage.setItem('themeMode', themeMode);
  },[themeMode]) // Include themeMode as dependency

  return (
    <ThemeContext.Provider value={{themeMode, lightTheme, darkTheme}}>
      {children}
    </ThemeContext.Provider>
  )
}


export { ThemeProvider, useTheme };