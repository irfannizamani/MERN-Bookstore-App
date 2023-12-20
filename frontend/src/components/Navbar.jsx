import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'; // Replace this with the path to your image

const Navbar = () => {
  return (
    <nav className="mt-3 navbar navbar-expand-lg bg-body-tertiary" style={{ borderRadius: "50px" }}>
      <div className="container" style={{ borderRadius: "50px" }}>
        {/* Display the image and text as part of the Navbar */}
        <Link to="/" className="navbar-brand ms-3">
          <img src={logo} alt="Mern Bookstore Logo" height="40" />
          Mern Bookstore App
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-between" id="navbarSupportedContent">
          <ul className="navbar-nav mb-2 mb-lg-0">
            {/* Menu items */}
          </ul>
          <ul className="navbar-nav mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/" className="nav-link me-3">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className="nav-link me-3">About</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
