import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  todos: [],
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos.push(action.payload);
    },
    toggleTodo: (state, action) => {
      state.todos = state.todos.map((todo, index) => {
        if (index === action.payload) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      });
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((todo, index) => index !== action.payload);
    },
  },
});

export const { addTodo, toggleTodo, deleteTodo } = todoSlice.actions;
export default todoSlice.reducer;