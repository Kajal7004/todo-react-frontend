import { useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import TodoForm from './TodoForm';
import { deleteTodo, updateTodo } from '../api/api';


const TodoList = ({ todos, getTodos }) => {
 
  const handleEdit = async (id, oldTitle, oldDescription) => {
    const newTitle = prompt("Edit task Title", oldTitle);
    const newDescription = prompt("Edit task Description", oldDescription);
    if (!newTitle) return; 
    try {
        await updateTodo( id,{
        title: newTitle.trim() !== "" ? newTitle : oldTitle,
        description: (newDescription === null || newDescription.trim() === "") 
                         ? oldDescription : newDescription}
  
    );
    }  catch(error){
      console.log(error);
    }
    getTodos();
    
  }
  const handleDelete = async (id) => {
    if (window.confirm("Delete this task?")) {
      await deleteTodo( id);
      getTodos(); // Refresh the parent state
    }
  };

  const renderList = (todoType) => (
    <ul className="todo-list">
      {todos.filter((t) => t.type === todoType).map((todo) => (
        <li key={todo._id}>
          <div className="task-container">
            <input 
              type="checkbox" 
              checked={todo.completed} 
              onChange={() => toggleComplete(todo._id, todo.completed)} 
            />
            <div className="todo-info">
              <strong style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
                {todo.title}
              </strong>
              <p>{todo.description}</p>
            </div>
            <div className="action-btn">
              <div className="todo-actions">
               <button onClick={() => handleEdit(todo._id)} className="edtBtn">
                 <i className="material-icons">edit</i>
               </button>
            </div>
            
            <div className="todo-actions">
               <button onClick={() => handleDelete(todo._id)} className="dltBtn">
                 <i className="material-icons">delete</i>
               </button>
            </div>
            </div>
            
          </div>
        </li>
      ))}
    </ul>
  );

    return (
        <>
        <div className="todo-sections">
      <div className="partition">
        <h3>Personal Tasks</h3>
        {renderList("Personal")}
      </div>
      <div className="partition">
        <h3>Professional Tasks</h3>
        {renderList("Professional")}
      </div>
    </div>
      
        </>
    );
}
export default TodoList;