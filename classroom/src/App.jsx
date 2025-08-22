import React from 'react';
import TodoList from './features/todoList';
import { Provider } from 'react-redux';
import store from './Store/Store';

function App() {
  return (
    <Provider store={store}>
      <TodoList />
    </Provider>
  );
}

export default App;