// import { useState } from 'react'
// import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/common.css';
// import { useEffect, ReactNode } from 'react';
import React, { ReactNode } from 'react';
import Navbar from './NavBar';
import withAuth from '../../utils/withAuth';
import Footer from './Footer';
import '../../styles/common.css';
import { ThemeProvider } from '../../context/ThemeContext';
import { AuthProvider } from '../../context/AuthContext';
// import { auth } from '../../utils/FirebaseConfig';
interface DisplayComponentProps {
  ComponentProp: ReactNode;
  displayNav?: boolean;
}

const AppContainer: React.FC<DisplayComponentProps> = ({ComponentProp, displayNav = true}) => {

  return (
    <ThemeProvider>
      <AuthProvider>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {displayNav && <Navbar />}
        {/* <div style={{ ...containerStyles, flex: '1' }}> */}
        <div className='app-container'>
          {ComponentProp}
        </div>
        <Footer />
      </div>
      </AuthProvider>
    </ThemeProvider>
  )
}

// export default withAuth(AppContainer);
export default withAuth(AppContainer);
export const NoAuthAppContainer = AppContainer;

// export {withAuth(AppContainer), AppContainer as noAuthAppContainer};
