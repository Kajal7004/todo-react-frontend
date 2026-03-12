import { useState } from 'react';
import { createTodo } from '../api/api';

const TodoForm = ({ onAdd }) => {

  //const [searchTerm, setSearchTerm] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("Personal");

  const handleAddTodo = async () => {
    if (!title) return;

    try {
      await createTodo({
        title, description, type
      });
      onAdd();
      setTitle("");
      setDescription("");
    } catch (error) { console.error(error); }
  };

  return (

    <div >

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
        <button className="add-btn" onClick={handleAddTodo} >+</button>
      </div>

    </div>
  );
};
export default TodoForm;