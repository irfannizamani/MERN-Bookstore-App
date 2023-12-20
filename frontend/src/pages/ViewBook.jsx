import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import Spinner from '../components/Spinner';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ViewBook = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:5555/books/${id}`);
        setBook(response.data);
      } catch (error) {
        console.error('Error fetching book:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  if (loading) {
    return <Spinner/>
  }

  if (!book) {
    return <p>Book not found</p>;
  }

  const { title, author, publishYear } = book;

  return (
<>
<Navbar/>

    <div className="container mt-4">
      <div className="card border-0 shadow-sm bg-light p-4">
      
        <div className="card-body">
        <h3 className="mb-4 text-center card-title">View Book Details</h3>
        
        <p className="card-text "><strong>ID:</strong> {id}</p>
 
          <p className="card-text "><strong>Title:</strong> {title}</p>
          <p className="card-text"><strong>Author:</strong> {author}</p>
          <p className="card-text"><strong>Publish Year:</strong> {publishYear}</p>
          {/* Display other book details */}
        </div>
        <div className="text-center mt-4">
        <Link to="/" className="btn btn-secondary">Back to Home</Link>
        </div>
      </div>
    </div>

    <Footer/>
    </>
  );
};

export default ViewBook;
