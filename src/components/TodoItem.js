import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import Context from "../context";
import TodoList from "./TodosList";

function TodoItem({ todo, parentTodo }) {
  const {
    removeTodo,
    editTodo,
    removeSubTask,
    editSubTask,
    changeCompleted,
    changeSubCompleted,
    addSubTask,
  } = useContext(Context);
  const [editState, setEditState] = useState(false);
  const [value, setValue] = useState(todo.title);

  return (
    <span
      className={"todoItem" + (todo.completed ? " todoItem__completed" : "")}
    >
      <span className="todoItem__body">
        <span>
          <input
            type="checkbox"
            defaultChecked={todo.completed}
            onChange={(event) => {
              parentTodo
                ? changeSubCompleted(
                    parentTodo.id,
                    todo.id,
                    event.target.checked
                  )
                : changeCompleted(todo.id, event.target.checked);
            }}
          />
          {!editState ? (
            <p className="todoItem__text">{todo.title}</p>
          ) : (
            <input
              value={value}
              onChange={(event) => setValue(event.target.value)}
            />
          )}
        </span>
        <span className="todoItem__functions">
          {!parentTodo && (
            <span
              className="addSub-icon"
              title="Добавить подзадачу"
              onClick={() => addSubTask(todo.id)}
            ></span>
          )}
          <span
            className="pen-icon"
            title="Редактировать"
            onClick={() => {
              !parentTodo
                ? editTodo(todo.id, value)
                : editSubTask(parentTodo.id, todo.id, value);
              setEditState(!editState);
            }}
          ></span>
          <span
            className="trash-icon"
            title="Удалить"
            onClick={() =>
              !parentTodo
                ? removeTodo(todo.id)
                : removeSubTask(parentTodo.id, todo.id)
            }
          ></span>
        </span>
      </span>
      {todo.subtasks && !parentTodo ? (
        <span className="todoItem__subtasks">
          <TodoList items={todo.subtasks} parentTodo={todo} />
        </span>
      ) : null}
    </span>
  );
}

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  parentTodo: PropTypes.object,
};

export default TodoItem;
