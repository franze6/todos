import React from "react";
import "../styles/App.sass";
import TodosList from "./TodosList";

function App() {
  const todos = [
    { id: 1, title: "Купить молоко", completed: false },
    { id: 2, title: "Убрать в квартире", completed: false },
    { id: 3, title: "Приготовить ужин", completed: false },
  ];
  return (
    <div className="wrapper">
      <h1>My React App!</h1>
      <TodosList items={todos} />
    </div>
  );
}

export default App;
