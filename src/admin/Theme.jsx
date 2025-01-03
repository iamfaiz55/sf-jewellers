/* eslint-disable react/prop-types */
import { createContext, useContext, useState, useEffect } from 'react';

// Create a Context for the theme
const ThemeContext = createContext();

// Provider component
export const ThemeProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        // Get the saved mode from localStorage or default to system theme
        const savedMode = localStorage.getItem('isDarkMode');
        return savedMode === 'true';  // Convert to boolean
    });

    // Toggle dark mode function
    const toggleDarkMode = () => {
        setIsDarkMode((prev) => {
            const newMode = !prev;
            localStorage.setItem('isDarkMode', newMode);  // Save mode to localStorage
            return newMode;
        });
    };

    // Apply the dark mode class to the body on mount and whenever isDarkMode changes
    useEffect(() => {
        if (isDarkMode) {
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
        }
    }, [isDarkMode]);

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
            {children}
        </ThemeContext.Provider>
    );
};

// Custom hook to use the Theme context
export const useTheme = () => {
    return useContext(ThemeContext);
};
