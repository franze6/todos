import React from "react";
import "../styles/App.sass";
import TodosList from "./TodosList";
import AddTodo from "./AddTodo";
import Context from "../context";

function App() {
  const [todos, setTodos] = React.useState([
    { id: 1, title: "Купить молоко", completed: false },
    { id: 2, title: "Убрать в квартире", completed: false },
    { id: 3, title: "Приготовить ужин", completed: false },
  ]);
  return (
    <Context.Provider value={{ removeTodo, editTodo }}>
      <div className="wrapper">
        <h1>My React App!</h1>
        <AddTodo onCreate={addTodo} />
        {todos.length ? <TodosList items={todos} /> : <h3>No todos!</h3>}
      </div>
    </Context.Provider>
  );

  function removeTodo(id) {
    setTodos(todos.filter((curr) => curr.id !== id));
  }

  function editTodo(id, title) {
    setTodos(
      todos.map((curr) => {
        if (curr.id === id) curr.title = title;
        return curr;
      })
    );
  }

  function addTodo(title) {
    setTodos(
      todos.concat([
        {
          id: Date.now(),
          title,
          completed: false,
        },
      ])
    );
  }
}

export default App;
