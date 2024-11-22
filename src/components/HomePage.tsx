import React from 'react';
// import { useAuth } from '../context/AuthContext';
const HomePage: React.FC = () => {

  const handleClick = () => {
    window.location.href = '/search';
  }
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
        Rate My Influencer
      </h2>
      
      <p 
        style={{ 
          fontSize: '1rem', 
          lineHeight: '1.6', 
          marginBottom: '2rem',
          padding: '0 1rem' // Padding for smaller screens
        }}
      >
        Read and write reviews on influencers that you have worked with.
      </p>
      
      <div>
        <button 
          className="btn btn-primary"
          style={{ 
            backgroundColor: 'var(--bs-primary)', 
            borderColor: 'var(--bs-primary)', 
            color: 'var(--bs-body-bg)', 
            margin: '0 auto',
          }}
          onClick={handleClick}
        >
          Let's Go
        </button>
      </div>
    </div>
  );
};

export default HomePage;
