import React, { useEffect, useState } from 'react';
import { auth } from './FirebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

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

    if (loading) {
      return <div>Loading...</div>; // Show a loading indicator while checking auth state
    }

    return <Component {...props} />;
  };
};

export default withAuth; 