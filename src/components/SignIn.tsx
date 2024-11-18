import React, { useState } from 'react';
import { auth } from '../utils/FirebaseConfig';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getUserHandleByUID } from '../dataApi/IsUserHandleInUse';

const SignIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const checkDisplayName = (user: any) => {
    getUserHandleByUID(user.uid).then(data => {
      // console.log(data);
      if (data === null) {
        window.location.href = '/setDisplayName';
        // console.log("redirecting to setDisplayName");
      } else {
        window.location.href = '/home';
        // console.log("redirecting to home");
      }
    });
  };

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      checkDisplayName(userCredential.user);
    } catch (err: any) {
      setError(err.message);
    }
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

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Sign In</h2>
      {error && <p className="text-danger text-center">{error}</p>}
      <form onSubmit={handleEmailSignIn} className="mx-auto" style={{ maxWidth: '400px' }}>
        <div className="form-group mb-3">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">Sign In with Email</button>
      </form>
      <div className="text-center mt-3">
        <button onClick={handleGoogleSignIn} className="btn btn-danger w-100">Sign In with Google</button>
      </div>
    </div>
  );
};

export default SignIn;
