import React, { useState } from 'react';
import { auth } from '../utils/FirebaseConfig';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getUserHandleByUID } from '../dataApi/IsUserHandleInUse';
import { useTheme } from '../context/ThemeContext';

const SignIn: React.FC = () => {
  const [error, setError] = useState('');
  const theme = useTheme();

  const checkDisplayName = (user: any) => {
    getUserHandleByUID(user.uid).then(data => {
      if (data === null) {
        window.location.href = '/setDisplayName';
      } else {
        window.location.href = '/browse';
      }
    });
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const userCredential = await signInWithPopup(auth, provider);
      checkDisplayName(userCredential.user);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const googleIcon = (theme === 'dark') 
    ? 'web_dark_sq_ctn.svg' 
    : 'web_light_sq_ctn.svg';

  return (
    <div className="container mt-5">
      {/* <h2 className="text-center mb-4">Sign In</h2> */}
      {error && <p className="text-danger text-center">{error}</p>}
      <div className="text-center mt-3">
        <img 
          src={googleIcon} 
          alt="Sign In with Google" 
          onClick={handleGoogleSignIn} 
          style={{ cursor: 'pointer', width: '189px', height: '40px' }} 
        />
      </div>
    </div>
  );
};

export default SignIn;
