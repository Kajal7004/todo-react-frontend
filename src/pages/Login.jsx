import { useState } from 'react';
import { useNavigate, Link} from 'react-router-dom';
import {  loginUser } from '../api/api';

const Login = () => {
  // 1. Create State for inputs and messages
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevents the page from refreshing
    setMessage(''); // Clear previous messages

    try {
      // 2. Make the API Call
      const response = await loginUser( {
        email: email,
        password: password
      });

      console.log("LOGIN RESPONSE ", response.data);

      // 3. Handle Success
      localStorage.setItem("token", response.data.access_token);
      setMessage("Login successful!");

      // 4. Redirect (In React, we usually use 'navigate')
      window.location.href = "/todo"; 

    } catch (error) {
      // 5. Handle Errors
      console.log("LOGIN ERROR ", error);
      const errorMsg = error.response?.data?.message || "Something went wrong";
      setMessage(errorMsg);
    }
  };

  
  return (
    <div className="container">
      <h2>Login</h2>
          <form className="login-items" onSubmit={handleLogin}>
        <input 
         className="input-item"
          type="email" 
          placeholder="Email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)} // Updates state as you type
          required 
        />
        <input
         className="input-item" 
          type="password" 
          placeholder="Password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <button type="submit">Login</button>
      </form>

      <p>Don't have an account? <Link to="/register">Register</Link></p>
            <p id="loginMsg">{message}</p>
    </div>
  );
};

export default Login;