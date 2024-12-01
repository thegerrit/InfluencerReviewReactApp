import React, { useEffect, useState } from 'react';
// import { auth } from './FirebaseConfig';
// import { onAuthStateChanged } from 'firebase/auth';
// import Loading from '../components/Loading';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const withAuth = (Component: React.FC<any>) => {
  return (props: any) => {
    const [loading, setLoading] = useState(true);

      useEffect(() => {
        const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
          if (!user) {
            window.location.href = '/'; // Redirect to login page if not authenticated
          } else {
            setLoading(false);
          }
        });

        return () => unsubscribe();
      }, []);

    // if (loading) {
    //   return <Loading />; // Show a loading indicator while checking auth state
    // }
    if (!loading) {
      return <Component {...props} />
    }
  }
}

export default withAuth;