import React, { useState, useEffect } from 'react';
import { useParams, useNavigate , Link} from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Spinner from '../components/Spinner';

const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');

  useEffect(() => {
    const fetchBook = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:5555/books/${id}`);
        setBook(response.data);
        setTitle(response.data.title);
        setAuthor(response.data.author);
        setPublishYear(response.data.publishYear);
      } catch (error) {
        console.error('Error fetching book:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5555/books/${id}`, {
        title,
        author,
        publishYear,
      });
      // Redirect to home page after successful update
      navigate('/');
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  if (loading) {
    return <Spinner/>;
  }

  if (!book) {
    return <p>Book not found</p>;
  }

  return (
<>
<Navbar/>

    <div className="container mt-4 border-0 shadow-sm bg-light p-4">
      <h3 className='text-center mb-4 '>Edit Book Details </h3>
      <form onSubmit={handleSubmit}>
       
      <div className="mb-3 ">
      <input
  type="text"
  className="form-control bg-white"
  placeholder="Title"
  value={id}
  readOnly
  onClick={() => {
  
    alert("ID can't be edited");
  }}
/>

        </div>

        <div className="mb-3 ">
          <input
            type="text"
            className="form-control"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Publish Year"
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            required
          />
        </div>
        <div className="text-center">
  <button type="submit" className="btn btn-primary mb-3">
    Update Book
  </button>
  <br />
  <Link to="/" className="btn btn-secondary">
    Back to Home
  </Link>
</div>
      </form>
    </div>

    <Footer/>

    </>
  );
};

export default EditBook;
