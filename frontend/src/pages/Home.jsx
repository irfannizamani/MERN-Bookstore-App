import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Spinner from '../components/Spinner';
import Navbar from '../components/Navbar';
import logo from '../assets/logo.png'; // Replace this with the path to your image
import Footer from '../components/Footer';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loadingBooks, setLoadingBooks] = useState(true);
  const [loadingAdd, setLoadingAdd] = useState(false);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    setLoadingBooks(true);
    try {
      const response = await axios.get('http://localhost:5555/books/');
      const reversedData = response.data.data.reverse(); // Reverse the fetched data
      setBooks(reversedData);
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setLoadingBooks(false);
    }
  };

  const handleAddBook = async (e) => {
    e.preventDefault();
    setLoadingAdd(true);

    try {
      await axios.post('http://localhost:5555/books/', {
        title,
        author,
        publishYear,
      });

      setTitle('');
      setAuthor('');
      setPublishYear('');
      fetchBooks();
    } catch (error) {
      console.error('Failed to add book:', error);
    } finally {
      setLoadingAdd(false);
    }
  };

 
  const handleDelete = async (title, id) => {
    const isConfirmed = window.confirm(`Are you sure you want to delete "${title}"?`);
    if (isConfirmed) {
      try {
        await axios.delete(`http://localhost:5555/books/${id}`);
        fetchBooks();
      } catch (error) {
        console.error('Failed to delete book:', error);
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <center>
      <img src={logo} alt="Mern Bookstore Logo" className='' height="70" /> 
        <span className="mb-5 text-center text-primary mt-5 h2">Mern Bookstore App</span> </center>
        <div className="row">
          <div className="col-md-4">
            <h3 className="mt-3 mb-3 text-center">Add Books</h3>
            <form id="myForm" onSubmit={handleAddBook}>
              <div className="mb-3">
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
              <button type="submit" className="btn btn-primary mr-2" disabled={loadingAdd}>
                {loadingAdd ? <Spinner /> : 'Add Book'}
              </button>
              <input
                type="button"
                onClick={() => {
                  setTitle('');
                  setAuthor('');
                  setPublishYear('');
                  document.getElementById('myForm').reset();
                }}
                value="Clear Book"
                className="btn btn-danger"
                style={{ marginLeft: '5px' }}
              />
            </form>
          </div>

          <div className="col-md-8">
            <h3 className="mt-3 mb-3 text-center">View Books</h3>
            {!loadingBooks && books.length === 0 ? (
           <p className="text-center bg-danger text-white  p-2" style={{ borderRadius: "10px" }}>
           There are no books
         </p>
         
            ) : (
              <div>
                {loadingBooks ? (
                  <Spinner />
                ) : (
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>SN#</th>
                          <th>Title</th>
                          <th>Author</th>
                          <th>Year</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {books.map((book, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{book.title}</td>
                            <td>{book.author}</td>
                            <td>{book.publishYear}</td>
                            <td>
                              <div style={{ display: 'flex', gap: '5px' }}>
                                <Link to={`/books/view/${book._id}`} className="btn btn-primary">
                                  View
                                </Link>
                                <Link to={`/books/edit/${book._id}`} className="btn btn-success">
                                  Edit
                                </Link>
                               
                                <button
  className="btn btn-danger"
  onClick={() => handleDelete(book.title, book._id)}
>
  Delete
</button>

                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer/>
    </>
  );
};

export default Home;
