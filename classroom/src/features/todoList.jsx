import React, { useState, useEffect } from 'react';
import './TodoList.css';

function TodoList() {
  const [todos, setTodos] = useState(() => {
    const storedTodos = localStorage.getItem('todos');
    return storedTodos ? JSON.parse(storedTodos) : [];
  });

  const [newTodo, setNewTodo] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState('');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = () => {
    const currentTime = new Date().toLocaleTimeString();
    setTodos([...todos, { text: newTodo, time: currentTime, editTime: null, completed: false }]);
    setNewTodo('');
  };

  const handleRemoveTodo = (index) => {
    setTodos(todos.filter((todo, i) => i !== index));
  };

  const handleEditTodo = (index) => {
    setEditIndex(index);
    setEditText(todos[index].text);
  };

  const handleUpdateTodo = () => {
    const currentTime = new Date().toLocaleTimeString();
    setTodos(todos.map((todo, index) => {
      if (index === editIndex) {
        return { ...todo, text: editText, editTime: currentTime };
      }
      return todo;
    }));
    setEditIndex(null);
    setEditText('');
  };

  return (
    <div className="todo-container">
        <h1>Classroom</h1>
      <div className="todo-header">
        <h1>React JS 10AM</h1>
        <div className="todo-nav">
          <button>Home</button>
          <button>Calendar</button>
          <button>Classwork</button>
        </div>
      </div>
      <div className="todo-list">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add new todo"
        />
        <button onClick={handleAddTodo}>Add</button>
        <ul>
          {todos.map((todo, index) => (
            <li key={index}>
              {editIndex === index ? (
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
              ) : (
                <span>
                  {todo.text} <small>({todo.time})</small>
                  {todo.editTime && <small> (Edited at {todo.editTime})</small>}
                </span>
              )}
              {editIndex === index ? (
                <button onClick={handleUpdateTodo}>Update</button>
              ) : (
                <button onClick={() => handleEditTodo(index)}>Edit</button>
              )}
              <button onClick={() => handleRemoveTodo(index)}>Remove</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TodoList;