import React, { useEffect, useState } from 'react';
import { auth } from '../utils/FirebaseConfig';
import SignIn from './SignIn';
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
      
      <p 
        style={{ 
          fontSize: '1rem', 
          lineHeight: '1.6', 
          marginBottom: '2rem',
          padding: '0 1rem', // Padding for smaller screens
          textAlign: 'left' // Justify text to the left
        }}
      >
        Welcome to Influencer Review! This space is meant for social media marketers to 
        share their experiences working with influencers. Read reviews to learn what others are saying about influencers.
        Write a review to share your experience. Be sure to follow the <a href="/CommunityGuidelines" target="_blank">Community Guidelines</a>.
      </p>
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
