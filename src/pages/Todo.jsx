import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";
import { fetchTodos } from "../api/api";
import axios from "axios";
import { useParams } from 'react-router-dom';


const Todo = () => {
  const [search, setSearch] = useState("");
  const [todos, setTodos] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const getTodos = async () => {
    try {
      const response = await fetchTodos( {
        search: search
      });
      console.log("Res Data",response.data);

       setTodos(response.data);
    } catch (error) { console.error(error); }
  };
  useEffect(() => {
   if (!token) navigate("/login");
    else getTodos();
  }, [token]);

  // const handleSearch = async () => {
  //   const response  = await fetchTodos({search: search});
  //  setTodos(response.data);
  // };
    
  
  return (
    <div className="todo-container">
      <div className="header">
      <h2>My Todos</h2>
      <div className="search">
      <input 
      type="text"
      value={search}
      placeholder="Search"
      onChange={(e) => setSearch(e.target.value)}>
      </input>
      {/* //<button className="search-btn" onClick={getTodos}> */}
      <i className="material-icons" onClick={getTodos}>search</i>
      {/* </button> */}
      </div>
      </div>
      
      <TodoForm setTodos = {setTodos}/>    
      <TodoList todos={todos} getTodos={getTodos}  />

      <button className="logout" onClick={() => {
        localStorage.removeItem("token");
        navigate("/login");
      }}>Logout</button>
    </div>
  );
};

export default Todo;