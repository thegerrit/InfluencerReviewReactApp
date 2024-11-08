// import { useState } from 'react'
// import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import AddInfluencerPage from './pages/AddInfluencer';
import './styles/themes.css';
import './styles/root.css';
import { useEffect } from 'react';

function App() {
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
      <h1>Add Influencer</h1>
      <AddInfluencerPage />
    </div>
  )
}

export default App;
