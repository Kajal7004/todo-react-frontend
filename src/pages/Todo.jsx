import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";
import { fetchTodos } from "../api/api";


const Todo = () => {
  const [todos, setTodos] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const getTodos = async () => {
    try {
      const response = await fetchTodos( {
    
      });
      console.log("Res Data",response.data);
      setTodos(response.data);
    } catch (error) { console.error(error); }
  };

  useEffect(() => {
    if (!token) navigate("/login");
    else getTodos();
    
  }, [token]);
  
  return (
    <div className="todo-container">
      <h2>My Todos</h2>
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