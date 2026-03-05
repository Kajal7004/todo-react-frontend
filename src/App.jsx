import { useState } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom';
import './App.css'
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Todo from './pages/Todo.jsx';

function App() {
  const [input, setInput] = useState("");

  return (
    <>
    <Routes>
        {/* If the URL is '/', redirect to /login automatically */}
        <Route path="/" element={<Navigate to="/login" />} />
        
        {/* These define your actual pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
                <Route path="/todo" element={<Todo />} />

        {/* This is where users go AFTER successful login */}
       {/* // <Route path="/todo" element={<h1>Todo Page (Coming Soon)</h1>} /> */}
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    
    </>
  )
}

export default App;
