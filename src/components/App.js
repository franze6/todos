import React from "react";
import "../styles/App.sass";
import TodosList from "./TodosList";
import AddTodo from "./AddTodo";
import Context from "../context";

function App() {
  const [todos, setTodos] = React.useState([
    {
      id: 1,
      title: "Купить молоко",
      completed: false,
      subtasks: [
        { id: 4, title: "Купить молоко", completed: false },
        { id: 5, title: "Убрать в квартире", completed: false },
        { id: 6, title: "Приготовить ужин", completed: false },
      ],
    },
    { id: 2, title: "Убрать в квартире", completed: false },
    { id: 3, title: "Приготовить ужин", completed: false },
  ]);
  return (
    <Context.Provider
      value={{ removeTodo, editTodo, removeSubTask, editSubTask }}
    >
      <div className="wrapper">
        <h1>Todo's!</h1>
        <AddTodo onCreate={addTodo} />
        {todos.length ? <TodosList items={todos} /> : <h3>No todos!</h3>}
      </div>
    </Context.Provider>
  );

  function removeTodo(id) {
    setTodos(todos.filter((curr) => curr.id !== id));
  }

  function removeSubTask(todoId, id) {
    setTodos(
      todos.map((curr) => {
        if (curr.id === todoId) {
          if (curr.subtasks) {
            curr.subtasks = curr.subtasks.filter((curr) => curr.id !== id);
          }
        }
        return curr;
      })
    );
  }

  function editTodo(id, title) {
    setTodos(
      todos.map((curr) => {
        if (curr.id === id) curr.title = title;
        return curr;
      })
    );
  }

  function editSubTask(todoId, id, title) {
    setTodos(
      todos.map((curr) => {
        if (curr.id === todoId) {
          if (curr.subtasks) {
            curr.subtasks = curr.subtasks.map((curr) => {
              if (curr.id === id) curr.title = title;
              return curr;
            });
          }
        }
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
