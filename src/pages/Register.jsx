import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/api";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    //setMessage(errorMsg);
   
    try {
      

      const response = await registerUser( {
        name: name,
        email: email,
        password: password
      });

      navigate("/Login");
      console.log("Register Response", response.data);

    } catch (error) {
      console.log("Register Error:", error);
      const errorMsg = error.response?.data?.message || "Something Went Wrong";
      setMessage(errorMsg);
      
    }
  };

  return (
    <div>
      <h2>Register</h2>

      <form className="login-items" onSubmit={handleRegister}>
        <input 
        className="input-item"
        type="name" 
        placeholder="Enter Name" 
        value={name} onChange={(e) => setName(e.target.value)}>
        </input>
        <input 
         className="input-item"
        type="email" 
        placeholder="Enter Email" 
        value={email} onChange={(e) => setEmail(e.target.value)}>
        </input>
        <input 
        type="password" 
        placeholder="Enter password" 
        value={password} onChange={(e) => setPassword(e.target.value)}>
        </input>
        <button type="submit">Register</button>
      </form>
     <p id="registerMsg">{message}</p>
    </div>
  )
}
export default Register;