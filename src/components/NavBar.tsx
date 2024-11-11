import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/navbar.css';

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
          <li className="nav-item custom-nav-item">
            <a className="nav-link text-decoration-none" href="/settings" style={{ color: 'var(--bs-body-color)' }}>
              Settings
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
