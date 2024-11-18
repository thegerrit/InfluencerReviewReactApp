import React, { useEffect, useState } from 'react';
import { auth } from './FirebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import Loading from '../components/Loading';

const withAuth = (Component: React.FC<any>) => {
  return (props: any) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (!user) {
          window.location.href = '/login'; // Redirect to login page if not authenticated
        } else {
          setLoading(false);
        }
      });

      return () => unsubscribe();
    }, []);

    useEffect(() => {
      // Set the theme based on the user's preference when the component mounts
      const isDarkMode: boolean = window.matchMedia('(prefers-color-scheme: dark)').matches;
      isDarkMode ? window.document.body.setAttribute('data-bs-theme', 'dark') : window.document.body.setAttribute('data-bs-theme', 'light');
    }, []);

    if (loading) {
      return <Loading />; // Show a loading indicator while checking auth state
    }

    return <Component {...props} />;
  };
};

export default withAuth; 