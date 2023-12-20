import React from 'react';

const Footer = () => {
  return (
    <footer className="mt-5 p-1   bg-light" style={{ borderRadius: "50px" }}>
      <div className="container text-center">
        <p className="mb-0">Developed by Irfan Nizamani</p>
        <p className="mb-0">© Copyright -  {new Date().getFullYear()} </p>
      </div>
    </footer>
  );
};

export default Footer;
