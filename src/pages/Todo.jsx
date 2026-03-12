import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";
import { createTodo, fetchTodos } from "../api/api";
import axios from "axios";
import { useParams } from 'react-router-dom';


const Todo = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [todos, setTodos] = useState([]);
  const [isAddTodo, setIsAddTodo] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const getTodos = async () => {
    //setLoading(true);
    try {
      const response = await fetchTodos({
        search, page
      });
      console.log("Res Data", response.data);

      setTodos(response.data.todos || []);
      setTotalPages(response.data.totalPages || 1);
    } catch (error) { console.error(error); }

  };

  // Event handler to flip the state
  const addTodo = () => {
    setIsAddTodo(prevState => !prevState);
  };

  useEffect(() => {
    if (!token) navigate("/login");
    else getTodos();
  }, [token, page, search, isAddTodo]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    getTodos();
  };

  return (
    <div className="todo-container">
      <div className="header">
        <h2>My Todos</h2>
        <div className="search" onSubmit={handleSearch} >
          <input
            type="text"
            value={search}
            placeholder="Search"
            onChange={(e) => setSearch(e.target.value)}>
          </input>
          <i className="material-icons" onClick={getTodos}>search</i>
        </div>
      </div>


      <TodoForm onAdd={addTodo} />
      <TodoList todos={todos} getTodos={getTodos} />

      <div className="pagination">
        <button
          disabled={page === 1}
          style={{ opacity: page === 1 ? 0.5 : 1 }}
          onClick={() => setPage(prev => prev - 1)}
        >
          <i className="fas fa-less-than">&lt;</i>
        </button>

        <span> {page} of {totalPages} </span>

        <button
          disabled={page === totalPages}
          style={{ opacity: page === totalPages ? 0.5 : 1 }}
          onClick={() => setPage(prev => prev + 1)}
        >
          <i className="fas fa-less-than">&gt;</i>
        </button>
      </div>

      <button className="logout" onClick={() => {
        localStorage.removeItem("token");
        navigate("/login");
      }}>Logout</button>
    </div>
  );
};

export default Todo;