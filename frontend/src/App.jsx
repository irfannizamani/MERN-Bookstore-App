import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ViewBook from './pages/ViewBook';
import EditBook from './pages/EditBook';
import NotFound from './pages/NotFound';
import About from './pages/About'; // Import the About component

function App() {
  return (
  
    
    <div className="container">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
             <Route path="/books/view/:id" element={<ViewBook />} />
          <Route path="/books/edit/:id" element={<EditBook />} />
          <Route path="/about" element={<About />} /> {/* Route for the About component */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>

    );
}

export default App;
