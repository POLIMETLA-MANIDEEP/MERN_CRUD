import React, { useState } from 'react';

const API_URL = 'http://localhost:5000/students';

function Search() {
  const [regno, setRegno] = useState('');
  const [student, setStudent] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await fetch(`${API_URL}/${regno}`);
      const data = await response.json();

      if (response.ok) {
        setStudent(data);
      } else {
        alert(data.error || 'Student not found');
      }
    } catch (error) {
      alert('Error fetching student data');
    }
  };

  return (
    <div className="form-container">
      <h2>Search Student</h2>
      <input type="text" placeholder="Enter Registration Number" value={regno} onChange={(e) => setRegno(e.target.value)} required />
      <button onClick={handleSearch}>Search</button>
      {student && (
        <div id="searchResult">
          <p><strong>Registration No:</strong> {student.regno}</p>
          <p><strong>Name:</strong> {student.name}</p>
          <p><strong>Email:</strong> {student.email}</p>
          <p><strong>Department:</strong> {student.department}</p>
          <p><strong>Phone No:</strong> {student.phoneno}</p>
        </div>
      )}
    </div>
  );
}

export default Search;
