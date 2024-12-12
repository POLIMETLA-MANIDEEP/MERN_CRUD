// Import necessary libraries from React and React Router
import React from 'react';  // Import React to build the components
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';  // Import Router components for routing
import './App.css';  // Import the CSS file for styling
import Register from './components/Register';  // Import the Register component for handling student registration
import Search from './components/Search';  // Import the Search component for searching students
import Update from './components/Update';  // Import the Update component for updating student information
import Delete from './components/Delete';  // Import the Delete component for deleting student records

// Define the main App component
function App() {
  return (
    // Set up the Router component to manage routing in the app
    <Router>
      <div className="container">
        <h1>Student CRUD App</h1>  {/* Header for the app */}

        {/* Navigation links to navigate between different pages */}
        <nav>
          <ul>
            {/* Link to the "Register Student" page */}
            <li><Link to="/register">Register Student</Link></li>
            {/* Link to the "Search Student" page */}
            <li><Link to="/search">Search Student</Link></li>
            {/* Link to the "Update Student" page */}
            <li><Link to="/update">Update Student</Link></li>
            {/* Link to the "Delete Student" page */}
            <li><Link to="/delete">Delete Student</Link></li>
          </ul>
        </nav>

        {/* Define Routes for different paths, mapping them to respective components */}
        <Routes>
          {/* Route for registering a new student */}
          <Route path="/register" element={<Register />} />
          {/* Route for searching a student */}
          <Route path="/search" element={<Search />} />
          {/* Route for updating a student */}
          <Route path="/update" element={<Update />} />
          {/* Route for deleting a student */}
          <Route path="/delete" element={<Delete />} />
        </Routes>
      </div>
    </Router>
  );
}

// Export the App component so it can be used in other files
export default App;
