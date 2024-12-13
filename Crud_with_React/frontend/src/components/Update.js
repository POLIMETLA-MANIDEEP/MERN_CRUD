// Import necessary libraries from React
import React, { useState } from 'react';

// Define the API URL where the backend service is hosted
const API_URL = 'http://localhost:5000/students';

// Define the Update component
function Update() {
  // State to manage the student's registration number
  const [regno, setRegno] = useState('');
  
  // State to manage the student data that will be updated (name, email, department, phoneno)
  const [student, setStudent] = useState({
    name: '',         // Student's new name
    email: '',        // Student's new email
    department: '',   // Student's department
    phoneno: ''       // Student's new phone number
  });

  // Handle changes in form input fields (name, email, department, phoneno)
  const handleChange = (e) => {
    // Update the student state when a field changes
    setStudent({ ...student, [e.target.id]: e.target.value });
  };

  // Handle the update operation when the "Update" button is clicked
  const handleUpdate = async () => {
    try {
      // Make a PUT request to the backend API with the student's regno and updated data
      const response = await fetch(`${API_URL}/${regno}`, {
        method: 'PUT',  // HTTP method is PUT, used for updating data
        headers: {
          'Content-Type': 'application/json'  // Indicate that the body contains JSON data
        },
        body: JSON.stringify(student)  // Convert the student data to JSON format
      });

      // Parse the response from the server as JSON
      const data = await response.json();
      
      // Check if the response is successful (status code 200-299)
      if (response.ok) {
        // Show success message if the student was updated successfully
        alert('Student updated successfully!');
      } else {
        // Show error message if the student was not found or there was an issue
        alert(data.error || 'Student not found');
      }
    } catch (error) {
      // Handle any network or server errors
      alert('Error updating student');
    }
  };

  return (
    <div className="form-container">
      {/* Header for the Update page */}
      <h2>Update Student</h2>

      {/* Input field for entering the student's registration number */}
      <input 
        type="text" 
        placeholder="Registration Number" 
        value={regno} 
        onChange={(e) => setRegno(e.target.value)}  // Update the regno state when the field changes
        required  // Make this field mandatory
      />
      
      {/* Input field for entering the student's new name */}
      <input 
        type="text" 
        id="name" 
        placeholder="New Name" 
        value={student.name} 
        onChange={handleChange}  // Update the name field in student state when it changes
      />
      
      {/* Input field for entering the student's new email */}
      <input 
        type="email" 
        id="email" 
        placeholder="New Email" 
        value={student.email} 
        onChange={handleChange}  // Update the email field in student state when it changes
      />
      
      {/* Input field for entering the student's department */}
      <input 
        type="text" 
        id="department" 
        placeholder="Department" 
        value={student.department} 
        onChange={handleChange}  // Update the department field in student state when it changes
      />
      
      {/* Input field for entering the student's new phone number */}
      <input 
        type="number" 
        id="phoneno" 
        placeholder="Phone No" 
        value={student.phoneno} 
        onChange={handleChange}  // Update the phoneno field in student state when it changes
      />
      
      {/* Button to trigger the update operation */}
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
}

// Export the Update component so it can be used in other files
export default Update;
