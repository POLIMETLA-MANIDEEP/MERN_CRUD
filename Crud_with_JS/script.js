// API URL to communicate with the backend
const API_URL = 'http://localhost:5000/students';

// Event listeners for form actions (Register, Search, Update, Delete)
document.getElementById('registerForm').addEventListener('submit', registerStudent);
document.getElementById('searchButton').addEventListener('click', searchStudent);
document.getElementById('updateButton').addEventListener('click', updateStudent);
document.getElementById('deleteButton').addEventListener('click', deleteStudent);

// Function to handle student registration
async function registerStudent(e) {
    e.preventDefault();  // Prevent form submission from refreshing the page

    // Get input values from the registration form
    const regno = document.getElementById('regno').value;
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const department = document.getElementById('department').value;
    const phoneno = document.getElementById('phoneno').value;

    // Create a student object with the gathered data
    const student = { regno, name, email, department, phoneno };

    try {
        // Send a POST request to register the student
        const response = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'  // Specify JSON format for the request body
            },
            body: JSON.stringify(student)  // Convert student object to JSON
        });

        const data = await response.json();  // Parse the response data as JSON
        if (response.ok) {
            // Show success message if student is registered successfully
            showMessage('Student registered successfully!', 'success');
        } else {
            // Show error message if registration fails
            showMessage(data.error || 'Error occurred during registration', 'error');
        }
    } catch (error) {
        // Show error message if there is a failure in the fetch request
        showMessage('Failed to connect to server', 'error');
    }
}

// Function to handle student search by registration number
async function searchStudent() {
    const regno = document.getElementById('searchRegno').value;  // Get registration number from search input

    try {
        // Send a GET request to fetch student details by registration number
        const response = await fetch(`${API_URL}/${regno}`);
        const data = await response.json();  // Parse the response data as JSON

        if (response.ok) {
            // Show student details if found
            showStudentDetails(data);
        } else {
            // Show error message if student not found
            showMessage(data.error || 'Student not found', 'error');
        }
    } catch (error) {
        // Show error message if there is a failure in the fetch request
        showMessage('Error fetching student data', 'error');
    }
}

// Function to handle student update
async function updateStudent() {
    const regno = document.getElementById('updateRegno').value;  // Get registration number from update form
    const name = document.getElementById('updateName').value;  // Get updated name
    const email = document.getElementById('updateEmail').value;  // Get updated email
    const department = document.getElementById('updateDepartment').value;  // Get updated department
    const phoneno = document.getElementById('updatePhoneno').value;  // Get updated phone number

    // Create a student object with updated data
    const student = { name, email, department, phoneno };

    try {
        // Send a PUT request to update student details by registration number
        const response = await fetch(`${API_URL}/${regno}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'  // Specify JSON format for the request body
            },
            body: JSON.stringify(student)  // Convert updated student object to JSON
        });

        const data = await response.json();  // Parse the response data as JSON
        if (response.ok) {
            // Show success message if student details are updated successfully
            showMessage('Student updated successfully!', 'success');
        } else {
            // Show error message if student not found or update fails
            showMessage(data.error || 'Student not found', 'error');
        }
    } catch (error) {
        // Show error message if there is a failure in the fetch request
        showMessage('Error updating student', 'error');
    }
}

// Function to handle student deletion
async function deleteStudent() {
    const regnoInput = document.getElementById('deleteId');  // Get the delete ID input element
    
    // Check if the input element exists
    if (!regnoInput) {
        console.error("Input element with id 'deleteId' not found.");
        return;
    }

    const regno = regnoInput.value.trim();  // Get and trim the registration number

    // Check if registration number is empty
    if (!regno) {
        showMessage('Please provide a valid registration number.', 'error');
        return;
    }

    try {
        // Send a DELETE request to delete student by registration number
        const response = await fetch(`${API_URL}/${regno}`, {
            method: 'DELETE',
        });

        const data = await response.json();  // Parse the response data as JSON
        if (response.ok) {
            // Show success message if student is deleted successfully
            showMessage(data.message || 'Student deleted successfully!', 'success');
        } else {
            // Show error message if student not found or deletion fails
            showMessage(data.error || 'Student not found.', 'error');
        }
    } catch (error) {
        // Show error message if there is a failure in the fetch request
        showMessage('Error deleting student', 'error');
    }
}

// Function to display messages (success or error) to the user
function showMessage(message, type) {
    const messageBox = document.getElementById('messageBox');  // Get the message box element

    // Ensure the messageBox exists before trying to set text content
    if (messageBox) {
        messageBox.textContent = message;  // Set the message content
        messageBox.className = type;  // Set the class name to style the message (success or error)
        
        // Clear the message after 3 seconds
        setTimeout(() => {
            messageBox.textContent = '';
            messageBox.className = '';
        }, 3000);
    } else {
        console.error('Message box element not found!');  // Log error if message box is not found
    }
}

// Function to display student details when found via search
function showStudentDetails(student) {
    const resultDiv = document.getElementById('searchResult');  // Get the search result container

    // Populate the result container with student details
    resultDiv.innerHTML = `
        <p><strong>Registration No:</strong> ${student.regno}</p>
        <p><strong>Name:</strong> ${student.name}</p>
        <p><strong>Email:</strong> ${student.email}</p>
        <p><strong>Department:</strong> ${student.department}</p>
        <p><strong>Phone No:</strong> ${student.phoneno}</p>
    `;
}
