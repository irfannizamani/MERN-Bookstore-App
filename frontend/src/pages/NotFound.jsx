import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const NotFound = () => {
  return (
    <>
    <Navbar/>
    <div className="container d-flex flex-column justify-content-center align-items-center p-5 ">
      <div className="text-center p-5">
        <h1 className="display-4 mb-3">Oops!</h1>
        <h2 className="display-6 mb-4">404 - Page Not Found</h2>
        <p className=" mb-2 text-muted">
          We couldn't find the page you're looking for. It might have been moved or doesn't exist.
        </p>
        <Link to="/" className="text-decoration-none  text-primary">Go back to Home</Link>
      </div>
    </div>

    <Footer/>
    </>
  );
};

export default NotFound;
