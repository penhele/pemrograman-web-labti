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

  // Fetch JSON Data
  useEffect(() => {
    fetch("/users.json")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const handleRegister = (event) => {
    event.preventDefault(); // Mencegah submit form secara default

    const name = event.target.name.value;
    const email = event.target.email.value;
    const password = event.target.password.value;

    // Cek apakah email sudah terdaftar
    const existingUser = users.find((user) => user.email === email);
    if (existingUser) {
      alert("Email already registered. Please use a different email.");
    } else {
      alert("Registration successful!");
      // Di sini Anda bisa menambahkan logika untuk menyimpan data ke backend
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

  // Fetch JSON Data
  useEffect(() => {
    fetch("/users.json")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const handleLogin = (event) => {
    event.preventDefault();
  
    const email = event.target.email.value;
    const password = event.target.password.value;
  
    console.log("Input Email:", email); // Debug email
    console.log("Input Password:", password); // Debug password
    console.log("Fetched Users:", users); // Debug data fetched
  
    const user = users.find(
      (user) => user.email === email && user.password === password
    );
  
    console.log("Found User:", user); // Debug apakah user ditemukan
  
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
