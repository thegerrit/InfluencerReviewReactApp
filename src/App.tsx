// import { useState } from 'react'
// import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import AddInfluencerPage from './components/AddInfluencerComponent';
import './styles/themes.css';
import './styles/root.css';
import { useEffect, ReactNode } from 'react';
import Navbar from './components/NavBar';
import HomePage from './pages/HomePage';

interface DisplayComponentProps {
  ComponentProp: ReactNode;
}

const AppContainer: React.FC<DisplayComponentProps> = ({ComponentProp}) => {
  // const [count, setCount] = useState(0)
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
    <div>
      <Navbar />
        {ComponentProp }
    </div>
  )
}
// function App() {
//   // const [count, setCount] = useState(0)
//   useEffect(() => {
//     const setThemeBasedOnPreference = () => {
//       const isDarkMode: boolean = window.matchMedia('(prefers-color-scheme: dark)').matches;
//       document.body.setAttribute('data-bs-theme', isDarkMode ? 'dark' : 'light');
//       console.log("isDarkMode: ", isDarkMode);
//     };
    

//     setThemeBasedOnPreference();

//     // Listen for changes in the preferred color scheme
//     window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', setThemeBasedOnPreference);

//     // Cleanup event listener on unmount
//     return () => {
//       window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', setThemeBasedOnPreference);
//     };
//   }, []);

//   return (
//     <div>
//       <Navbar />
//       {/* <AddInfluencerPage /> */}
//       <HomePage />
//     </div>
//   )
// }

export default AppContainer;
