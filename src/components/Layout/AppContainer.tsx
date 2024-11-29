// import { useState } from 'react'
// import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/common.css';
// import { useEffect, ReactNode } from 'react';
import React, { ReactNode, useEffect } from 'react';
import Navbar from './NavBar';
import withAuth from '../../utils/withAuth';
import Footer from './Footer';
import '../../styles/common.css';
interface DisplayComponentProps {
  ComponentProp: ReactNode;
}
// const containerStyles = {
//   margin: '0 auto',
//   padding: '0 1rem',
//   maxWidth: '1800px',
//   '@media (min-width: 768px)': {
//     padding: '0 2rem'
//   },
//   '@media (min-width: 1024px)': {
//     padding: '0 2rem'
//   }
// };

const AppContainer: React.FC<DisplayComponentProps> = ({ComponentProp}) => {

  useEffect(() => {
    const setThemeBasedOnPreference = () => {
      const isDarkMode: boolean = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.setAttribute('data-bs-theme', isDarkMode ? 'dark' : 'light');
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
    <>
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      {/* <div style={{ ...containerStyles, flex: '1' }}> */}
      <div className='app-container'>
        {ComponentProp}
      </div>
      <Footer />
    </div>
    
    </>
  )
}

// export default withAuth(AppContainer);
export default withAuth(AppContainer);
export const NoAuthAppContainer = AppContainer;

// export {withAuth(AppContainer), AppContainer as noAuthAppContainer};
