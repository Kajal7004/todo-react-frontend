import { useState } from 'react';
import { createTodo } from '../api/api';
const TodoForm = ({ setTodos }) => {
 
  //const [searchTerm, setSearchTerm] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("Personal");

  const handleAddTodo = async () => {
    if (!title) return;

    const newTodoLocal = {
        id: Date.now(), // Temporary ID for React keys
        title,
        description,
        type,
        completed: false
    };

    
    setTodos((prevTodos) => [...prevTodos, newTodoLocal]);
    try {
      const response = await createTodo({
        title,  description, type 
      });

      setTodos((prevTodos) => 
            prevTodos.map(todo => todo.id === newTodoLocal.id ? response.data : todo)
        );
    
      setTitle("");
      setDescription("");
    } catch (error) { console.error(error); }
  }; 

  return (
      
      <div >
        {/* <div className="search-container"> */}
  {/* <input 
    type="text" 
    placeholder="Search tasks..." 
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="search-bar"
  />
  <i className="material-icons">search</i>
</div> */}
        <div className="todo-input">
          <input 
          className="todo-item"
            type="text" placeholder="Enter todo" 
            value={title} onChange={(e) => setTitle(e.target.value)} 
          />
          <textarea 
          className="todo-item"
            placeholder="Enter description" 
            value={description} onChange={(e) => setDescription(e.target.value)} 
          />
        </div>
  
        <div className="type-add">
          <div className="radio-btn">
            <label>
              <input type="radio" name="todoType" value="Personal" checked={type === "Personal"} onChange={() => setType("Personal")} /> Personal
            </label>
            <label>
              <input type="radio" name="todoType" value="Professional" checked={type === "Professional"} onChange={() => setType("Professional")} /> Professional
            </label>
          </div>
          <button className="add-btn" onClick={handleAddTodo}>+</button>
        </div>
  
      </div>
    );
};
export default TodoForm;