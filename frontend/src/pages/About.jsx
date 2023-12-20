import React from 'react';
import Navbar from '../components/Navbar'; // Update the path based on your project structure
import Footer from '../components/Footer';

const About = () => {
  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <h2 className="mb-4 text-primary">About - The MERN Bookstore App</h2>
        <p className="fs-5">
          This application is a demonstration of a MERN stack (MongoDB, Express.js, React.js, Node.js) based Bookstore
          application. It allows users to manage a list of books, including adding new books, editing existing books,
          viewing book details, and deleting books.
        </p>
        <p className="fs-5">
          To use this application, you can clone the repository from GitHub and run it locally on your machine. Follow
          the instructions in the README file to set up the environment and get started with the app.
        </p>
        <p className="fs-5">
          Feel free to explore the codebase and customize it for your own use or learning purposes.
        </p>
      </div>

      <Footer/>
    </>
  );
};

export default About;
