import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import TodoForm from './TodoForm';
import { deleteTodo, updateTodo } from '../api/api';
import Modal from './Modal';


const TodoList = ({ todos, getTodos }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDltModalOpen, setIsDltModalOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState({ _id: '', title: '', description: '' });


  const toggleComplete = async (id, currentStatus) => {
  try {
    // 1. Call the API to flip the status
    await updateTodo(id, { completed: !currentStatus });
    
    // 2. Refresh the list to show the change
    getTodos(); 
  } catch (error) {
    console.error("Error toggling completion:", error);
  }
};

  const openEditModal = (todo) => {
    setSelectedTodo(todo);
    setIsEditModalOpen(true);
  };


  const openDeleteModal = (todo) => {
    setSelectedTodo(todo);
    setIsDltModalOpen(true);
  };

  const handleEdit = async () => {
    try {
      await updateTodo(selectedTodo._id, {
        title: selectedTodo.title.trim(),
        description: selectedTodo.description.trim()
      });
      setIsEditModalOpen(false);
      getTodos();
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async () => {
    try {
      await deleteTodo(selectedTodo._id);
      setIsDltModalOpen(false);
      getTodos();
    } catch (error) {
      console.log(error);
    }
  };

  const renderList = (todoType) => (
    <ul className="todo-list">
      {todos?.filter((t) => t.type === todoType).map((todo) => (
        <li key={todo._id}>
          <div className="task-container">
            <div className="checkbox">
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
            </div>
            <div className="action-btn">
              {/* Change buttons to call our new 'open' functions */}
              <button onClick={() => openEditModal(todo)} className="edtBtn">
                <i className="material-icons">edit</i>
              </button>
              <button onClick={() => openDeleteModal(todo)} className="dltBtn">
                <i className="material-icons">delete</i>
              </button>
            </div>
            


          </div>
        </li>
      ))}
    </ul>
   
  );
  //  const filteredTodos = todos
  //   .filter((t) => t.type === todoType)
  //   .filter((t) => 
  //     t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     t.description.toLowerCase().includes(searchTerm.toLowerCase())
  //   );

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
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Task"
      >


        <div className="modal-form">
          <input
            type="text"
            value={selectedTodo.title}
            onChange={(e) => setSelectedTodo({ ...selectedTodo, title: e.target.value })}
            placeholder="Title"
          />
          <textarea
            value={selectedTodo?.description || ""}
            onChange={(e) => setSelectedTodo({ ...selectedTodo, description: e.target.value })}
            placeholder="Description"
          />
          <div className="modal-buttons">
            <button onClick={handleEdit} className="btn-save">Save Changes</button>
            <button onClick={() => setIsEditModalOpen(false)} className="btn-cancel">Cancel</button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={isDltModalOpen}
        onClose={() => setIsDltModalOpen(false)}
        title="Delete Task"
      >
        <div className="modal-confirm">
          <p>Are you sure you want to delete <strong>{selectedTodo.title}</strong>?</p>
          <div className="modal-buttons">
            <button onClick={handleDelete} className="btn-save" style={{ background: 'red' }}>Yes, Delete</button>
            <button onClick={() => setIsDltModalOpen(false)} className="btn-cancel">Cancel</button>
          </div>

        </div>

      </Modal>

    </>
  );
}
export default TodoList;