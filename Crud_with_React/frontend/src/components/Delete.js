import React, { useState } from 'react';

const API_URL = 'http://localhost:5000/students';

function Delete() {
  const [regno, setRegno] = useState('');

  const handleDelete = async () => {
    try {
      const response = await fetch(`${API_URL}/${regno}`, {
        method: 'DELETE',
      });

      const data = await response.json();
      if (response.ok) {
        alert('Student deleted successfully!');
      } else {
        alert(data.error || 'Student not found');
      }
    } catch (error) {
      alert('Error deleting student');
    }
  };

  return (
    <div className="form-container">
      <h2>Delete Student</h2>
      <input type="text" placeholder="Enter Registration Number" value={regno} onChange={(e) => setRegno(e.target.value)} required />
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default Delete;
