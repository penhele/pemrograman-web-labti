import { useEffect, useState } from 'react';
import './app.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

function Registration() {
  const [users, setUsers] = useState([]);

  // Fetch JSON Data (GET Request)
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:5000/users");

        if (!response.ok) throw new Error(`Error fetching users: ${response.status}`);

        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error(error.message);
      }
    };

      fetchUsers();
    }, []);

  const handleRegister = async (event) => {
    event.preventDefault(); // Mencegah submit form secara default

    const email = event.target.email.value;
    const password = event.target.password.value;
    const newUser = {email, password};

    // Cek apakah email sudah terdaftar
    const existingUser = users.find((user) => user.email === email);
    if (existingUser) {
      alert("Email already registered. Please use a different email.");
      return;
    } 

    try {
      // POST Request to Register New User
      const response = await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      if (response.status === 201) {
        const createdUser = await response.json();
        setUsers([...users, createdUser]); // Add new user to state
        alert("Resgistration Successful!");
      } else {
        throw new Error(`Failed to register: ${response.status}`)
      }
    } catch (error) {
      console.error(error.message);
      alert("Error during registration, Please try again.");
    }
  };

  return (
    <div className="form-container">
      <h1>Registration Form 📝</h1>
      <form onSubmit={handleRegister}>
        <input type="text" name="name" placeholder="👤 Enter your name" required />
        <input type="email" name="email" placeholder="📧 Enter your email" required />
        <input type="password" name="password" placeholder="🔒 Create a password" required />
        <input type="password" name="confirmPassword" placeholder="🔒 Confirm a password" required />
        <div className="checkbox-container">
          <input type="checkbox" id="terms" name="terms" required />
          <label htmlFor="terms">I accept all terms & conditions</label>
        </div>
        <button className="btn" type="submit">Register Now</button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login now</Link>
      </p>
    </div>
  );
}

function Login() {
  const [users, setUsers] = useState([]);

  // Fetch JSON Data (GET Request)
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:5000/users");

        if (!response.ok) throw new Error(`Error fetching users: ${response.status}`);

        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error(error.message);
      }
    }

    fetchUsers();
  }, []);

  const handleLogin = (event) => {
    event.preventDefault();
  
    const email = event.target.email.value;
    const password = event.target.password.value;
  
    // Validate email and password
    const user = users.find(
      (user) => user.email === email && user.password === password
    );
  
    if (user) {
      alert(`Welcome back, ${user.email}!`);
    } else {
      alert("Invalid email or password.");
    }
  };  

  return (
    <div className="form-container">
      <h1>Login 🔑</h1>
      <form onSubmit={handleLogin}>
        <input type="email" name="email" placeholder="📧 Enter your email" required />
        <input type="password" name="password" placeholder="🔒 Enter your password" required />
        <button className="btn" type="submit">Login Now</button>
      </form>
      <p>
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
}

export default App;
