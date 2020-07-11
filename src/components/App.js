import React from "react";
import TodoListDnd from "./TodoListDnd";
import AddTodo from "./AddTodo";
import Context from "../context";

function App() {
  const [todos, setTodos] = React.useState(
    JSON.parse(localStorage.getItem("todos")) || []
  );
  return (
    <Context.Provider
      value={{
        removeTodo,
        editTodo,
        removeSubTask,
        editSubTask,
        changeCompleted,
        changeSubCompleted,
        addSubTask,
      }}
    >
      <div className="wrapper">
        <h1>Todo's!</h1>
        <AddTodo onCreate={addTodo} />
        {todos.length ? (
          <TodoListDnd items={todos} reorderItems={reorder} />
        ) : (
          <h3>No todos!</h3>
        )}
      </div>
    </Context.Provider>
  );

  function removeTodo(id) {
    saveTodos(todos.filter((curr) => curr.id !== id));
  }

  function removeSubTask(todoId, id) {
    saveTodos(
      todos.map((curr) => {
        if (curr.id === todoId) {
          curr.subtasks &&
            (curr.subtasks = curr.subtasks.filter((curr) => curr.id !== id));
        }
        return curr;
      })
    );
  }

  function editTodo(id, title) {
    saveTodos(
      todos.map((curr) => {
        curr.id === id && (curr.title = title);
        return curr;
      })
    );
  }

  function editSubTask(todoId, id, title) {
    saveTodos(
      todos.map((curr) => {
        if (curr.id === todoId) {
          if (curr.subtasks) {
            curr.subtasks = curr.subtasks.map((curr) => {
              curr.id === id && (curr.title = title);
              return curr;
            });
          }
        }
        return curr;
      })
    );
  }

  function addTodo() {
    saveTodos(
      todos.concat([
        {
          id: Date.now(),
          title: "Новая задача",
          completed: false,
        },
      ])
    );
  }

  function addSubTask(todoId) {
    saveTodos(
      todos.map((curr) => {
        if (curr.id === todoId) {
          !curr.subtasks && (curr.subtasks = []);
          curr.subtasks = curr.subtasks.concat([
            {
              id: Date.now(),
              title: "Новая подзадача",
              completed: false,
            },
          ]);
        }
        return curr;
      })
    );
  }

  function changeCompleted(id, completed) {
    let itemIndex;
    saveTodos(
      todos.map((curr, index) => {
        if (curr.id === id) {
          curr.completed = completed;
          if (curr.subtasks) {
            curr.subtasks.map((curr) => {
              curr.completed = completed;
              return curr;
            });
          }
          itemIndex = index;
        }
        return curr;
      })
    );
    completed ? reorder(itemIndex, todos.length) : reorder(itemIndex, 0);
  }

  function changeSubCompleted(todoId, id, completed) {
    saveTodos(
      todos.map((curr) => {
        if (curr.id === todoId) {
          if (curr.subtasks) {
            curr.subtasks = curr.subtasks.map((curr) => {
              curr.id === id && (curr.completed = completed);
              return curr;
            });
          }
        }
        return curr;
      })
    );
  }

  function reorder(startIndex, endIndex) {
    const result = Array.from(todos);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    saveTodos(result);
  }

  function saveTodos(items) {
    localStorage.setItem("todos", JSON.stringify(items));
    setTodos(items);
  }
}

export default App;
