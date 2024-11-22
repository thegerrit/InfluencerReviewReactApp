// import { useState } from 'react'
// import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/common.css';
// import { useEffect, ReactNode } from 'react';
import React, { ReactNode, useEffect } from 'react';
import Navbar from '../components/NavBar';
import withAuth from './withAuth';

interface DisplayComponentProps {
  ComponentProp: ReactNode;
}
const containerStyles = {
  margin: '0 auto',
  padding: '0 1rem',
  maxWidth: '1200px',
  '@media (min-width: 768px)': {
    padding: '0 2rem'
  },
  '@media (min-width: 1024px)': {
    padding: '0 4rem'
  }
};

const AppContainer: React.FC<DisplayComponentProps> = ({ComponentProp}) => {

  useEffect(() => {
    const setThemeBasedOnPreference = () => {
      const isDarkMode: boolean = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.body.setAttribute('data-bs-theme', isDarkMode ? 'dark' : 'light');
      console.log("isDarkMode: ", isDarkMode);
    };
    
    setThemeBasedOnPreference();

    // Listen for changes in the preferred color scheme
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', setThemeBasedOnPreference);

    // Cleanup event listener on unmount
    return () => {
      window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', setThemeBasedOnPreference);
    };
  }, []);

  return (
    // <UserProvider>
      <div>
        <Navbar />
        <div style={containerStyles}>
      
        {ComponentProp }
        </div>
      </div>
    // </UserProvider>
  )
  
}

// export default withAuth(AppContainer);
export default withAuth(AppContainer);
export const NoAuthAppContainer = AppContainer;

// export {withAuth(AppContainer), AppContainer as noAuthAppContainer};
