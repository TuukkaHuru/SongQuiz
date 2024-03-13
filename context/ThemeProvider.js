import React, {useState} from "react";
import { ThemeContext } from './ThemeContext'

export default function ThemeProvider ({ children })  {
    const [isDarkMode, setIsDarkMode] = useState(false);
  
    const toggleDarkMode = () => {
      setIsDarkMode((prevDarkMode) => !prevDarkMode);
    };

    const resetPoints = () => {
      setTotalPoints(0);
    };
  
    return (
      <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
        {children}
      </ThemeContext.Provider>
    );
  };