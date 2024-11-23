import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';  // Add this line
import '../styles/navbar.css';
import { auth } from '../utils/FirebaseConfig';

const NavBar: React.FC = () => {
  return (
    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: 'var(--bs-body-bg)' }}>
      <div className="container-fluid">
        {/* Left-aligned items */}
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item custom-nav-item">
            <a className="nav-link text-decoration-none" href="/" style={{ color: 'var(--bs-body-color)'}}>
              Rate My Influencer
            </a>
          </li>
          <li className="nav-item custom-nav-item">
            <a className="nav-link text-decoration-none" href="/search" style={{ color: 'var(--bs-body-color)' }}>
              Search
            </a>
          </li>
          <li className="nav-item custom-nav-item">
            <a className="nav-link text-decoration-none" href="/browse" style={{ color: 'var(--bs-body-color)' }}>
              Browse
            </a>
          </li>
        </ul>
        
        {/* Right-aligned item */}
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
          <li className="nav-item dropdown custom-nav-item">
            <span 
              className="nav-link dropdown-toggle text-decoration-none" 
              // href="#" 
              role="button" 
              data-bs-toggle="dropdown" 
              aria-expanded="false"
              style={{ color: 'var(--bs-body-color)' }}
            >
              Account
            </span>
            <ul className="dropdown-menu dropdown-menu-end">
              <li>
                <a className="dropdown-item" href={`/userProfile?userId=${auth.currentUser?.uid}`}>
                  User Profile
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="/reviewHistory">
                  Your Reviews
                </a>
              </li>
              <li>
                <a 
                  className="dropdown-item" 
                  href="/login" 
                  onClick={async (e) => {
                    e.preventDefault();
                    await auth.signOut();
                    window.location.href = '/login';
                  }}
                >
                  Log Out
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
