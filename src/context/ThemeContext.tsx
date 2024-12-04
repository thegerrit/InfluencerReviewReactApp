import { createContext, useContext, useEffect, useState } from 'react';

// Create a context for the theme
const ThemeContext = createContext('dark');

// Create a provider component
export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [theme, setTheme] = useState('dark'); // Default theme
    useEffect(() => {
        const setThemeBasedOnPreference = () => {
          const isDarkMode: boolean = window.matchMedia('(prefers-color-scheme: dark)').matches;
          document.documentElement.setAttribute('data-bs-theme', isDarkMode ? 'dark' : 'light');
          // console.log("isDarkMode: ", isDarkMode);
          setTheme(isDarkMode ? 'dark' : 'light');
        };
        
        setThemeBasedOnPreference();
    
        // Listen for changes in the preferred color scheme
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', setThemeBasedOnPreference);
    
        // Cleanup event listener on unmount
        return () => {
          window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', setThemeBasedOnPreference);
        };
      }, []);
    // const getThemeBasedOnPreference: () => string = () => {
    //     const isDarkMode: boolean = window.matchMedia('(prefers-color-scheme: dark)').matches;
    //     document.documentElement.setAttribute('data-bs-theme', isDarkMode ? 'dark' : 'light');
    //     console.log("isDarkMode: ", isDarkMode);
    //     return isDarkMode ? 'dark' : 'light';
    // }; 
    

    // Function to toggle theme
    // const toggleTheme = () => {
    //     setTheme((prevTheme: string) => (prevTheme === 'light' ? 'dark' : 'light'));
    // };

    return (
        <ThemeContext.Provider value={ theme}>
            {children}
        </ThemeContext.Provider>
    );
};

// Custom hook to use the theme context
export const useTheme = () => {
    return useContext(ThemeContext);
};
