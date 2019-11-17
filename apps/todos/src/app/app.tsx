import React, { useState, useEffect } from 'react';

import './app.scss';
import { Todo } from '@reactivity/common';

export const App = () => {

  const [todos, setTodos] = useState<Todo[]>([]);


  useEffect(() => {
    fetch('/api/todos')
      .then(_ => _.json())
      .then(setTodos);
  }, []);

  function addTodo() {
    fetch('/api/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: `New todo ${Math.floor(Math.random() * 1000)}`
      })
    })
      .then(_ => _.json())
      .then(newTodo => {
        setTodos([...todos, newTodo]);
      });
  }
  // <> is a react fragment that allows you to return some sibling html without a wrapper
  // https://reactjs.org/docs/fragments.html
  return (
    <>
      <h1>Todos</h1>
      <ul>
        {todos.map(t => (
          <li className={'todo'}>{t.title}</li>
        ))}
      </ul>
      <button id={'add-todo'} onClick={addTodo}>
        Add Todo
      </button>
    </>
  );
};

export default App;
