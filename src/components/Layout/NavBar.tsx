import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../../styles/navbar.css';
import { auth } from '../../utils/FirebaseConfig';
import { useTheme } from '../../context/ThemeContext';

const NavBar: React.FC = () => {
  return (
    <nav className={`navbar navbar-expand-lg custom-navbar ${useTheme() === 'dark' ? '' : 'light'}`}>
      <div className="container-fluid">
        {/* Navbar brand or logo */}
        <a className="navbar-brand" href="/" style={{ color: 'var(--bs-body-color)' }}>
          <img src="/logo.svg" alt="Logo" style={{ width: '28px', height: '28px' }} /> Influencer Review
        </a>

        {/* Toggle button for small screens */}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapsible content */}
        <div className="collapse navbar-collapse" id="navbarNav">
          {/* Left-aligned items */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
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
            <li className="nav-item custom-nav-item">
              <a className="nav-link text-decoration-none" href="/contactUs" style={{ color: 'var(--bs-body-color)' }}>
                Contact Us
              </a>
            </li>
          </ul>

          {/* Right-aligned item */}
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item dropdown custom-nav-item">
              <span
                className="nav-link dropdown-toggle text-decoration-none"
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
                  <a className="dropdown-item" href={`/reviewHistory?userId=${auth.currentUser?.uid}`}>
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
                      window.location.href = '/';
                    }}
                  >
                    Log Out
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
