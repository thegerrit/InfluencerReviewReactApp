import React, { useEffect, useState } from 'react';
import { auth } from '../utils/FirebaseConfig';
import SignIn from './SignIn';
import '../styles/homepage.css';
// import { useAuth } from '../context/AuthContext';
const HomePage: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setCurrentUser(user.displayName || 'Anonymous');
      } else {
        setCurrentUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleClick = () => {
    window.location.href = '/search';
  }
  // const currentUser = auth.currentUser?.displayName;
  return (
    <div 
      className="container my-5 px-3 px-md-5 py-4"
      style={{
        maxWidth: '800px',
        // backgroundColor: 'var(--bs-body-bg)', 
        // color: 'var(--bs-body-color)',
        textAlign: 'center',
      }}
    >
      <h2 
        style={{ 
          fontSize: '1.8rem', 
          fontWeight: 'bold', 
          marginBottom: '1.5rem' 
        }}
      >
        Influencer Review
      </h2>
      <div className="homepage-text" style={{textAlign: 'left'}}>
        <p className="homepage-line">
          Welcome to Influencer Review! This website is meant for social media marketers to 
          share their experiences working with influencers.
        </p> 
        <p className="homepage-line">
          <strong>Search for influencers</strong> to find what others are saying about them. You can add influencers if they are missing.
        </p>
        <p className="homepage-line">
          <strong>Read reviews</strong> written by other social media marketers.
        </p>
        <p className="homepage-line">
          <strong>Write a review</strong> to share your experience. Be sure to follow the <a href="/CommunityGuidelines" target="_blank">Community Guidelines</a>.
        </p>
      </div>
        <div>
        {currentUser && <button 
            className="btn btn-primary"
            style={{ 
              backgroundColor: 'var(--bs-primary)', 
              borderColor: 'var(--bs-primary)', 
              // color: 'var(--bs-body-bg)', 
              margin: '0 auto',
            }}
            onClick={handleClick}
          >
            Let's Go
          </button>}
          {!currentUser && <SignIn />}
        </div>
      
    </div>
  );
};

export default HomePage;
