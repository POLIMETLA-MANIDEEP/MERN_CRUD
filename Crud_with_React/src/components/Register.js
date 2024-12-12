// Import necessary libraries from React
import React, { useState } from 'react';

// Define the API URL where the backend service is hosted
const API_URL = 'http://localhost:5000/students';

// Define the Register component
function Register() {
  // Use the useState hook to manage the state of the form inputs
  const [student, setStudent] = useState({
    regno: '',        // Registration number
    name: '',         // Student name
    email: '',        // Student email
    department: '',   // Department the student belongs to
    phoneno: ''       // Student phone number
  });

  // Handle changes to form inputs
  const handleChange = (e) => {
    // Update the state with the changed input field value
    setStudent({ ...student, [e.target.id]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();  // Prevent the default form submission behavior
    
    try {
      // Send a POST request to the backend API with the student data
      const response = await fetch(`${API_URL}/register`, {
        method: 'POST',  // HTTP method is POST
        headers: {
          'Content-Type': 'application/json'  // Indicate that the body contains JSON data
        },
        body: JSON.stringify(student)  // Convert the student object to a JSON string
      });

      // Parse the response from the server as JSON
      const data = await response.json();
      
      // Check if the response is successful
      if (response.ok) {
        // Show success message if registration is successful
        alert('Student registered successfully!');
      } else {
        // Show error message if the response indicates failure
        alert(data.error || 'Error occurred during registration');
      }
    } catch (error) {
      // Handle any network or server errors
      alert('Failed to connect to server');
    }
  };

  return (
    <div className="form-container">
      {/* Header for the registration page */}
      <h2>Register Student</h2>
      
      {/* Form for collecting student information */}
      <form onSubmit={handleSubmit}>
        {/* Input field for registration number */}
        <input 
          type="text" 
          id="regno" 
          placeholder="Registration Number" 
          value={student.regno} 
          onChange={handleChange}  // Handle changes to the regno input
          required  // Make this field mandatory
        />
        
        {/* Input field for student name */}
        <input 
          type="text" 
          id="name" 
          placeholder="Student Name" 
          value={student.name} 
          onChange={handleChange}  // Handle changes to the name input
          required  // Make this field mandatory
        />
        
        {/* Input field for student email */}
        <input 
          type="email" 
          id="email" 
          placeholder="Email" 
          value={student.email} 
          onChange={handleChange}  // Handle changes to the email input
          required  // Make this field mandatory
        />
        
        {/* Input field for department */}
        <input 
          type="text" 
          id="department" 
          placeholder="Department" 
          value={student.department} 
          onChange={handleChange}  // Handle changes to the department input
          required  // Make this field mandatory
        />
        
        {/* Input field for phone number */}
        <input 
          type="number" 
          id="phoneno" 
          placeholder="Phone No" 
          value={student.phoneno} 
          onChange={handleChange}  // Handle changes to the phoneno input
          required  // Make this field mandatory
        />
        
        {/* Submit button to submit the form */}
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;  // Export the Register component for use in other files
