import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import "../styles/TodoItem.sass";
import Context from "../context";
import TodosList from "./TodosList";

function TodoItem(props) {
  const todo = props.todo;
  const { removeTodo, editTodo, removeSubTask, editSubTask } = useContext(
    Context
  );
  const [editState, setEditState] = useState(false);
  const [value, setValue] = useState(todo.title);

  return (
    <li className="todoItem">
      <span className="todoItem__body">
        <span>
          <input type="checkbox" defaultChecked={todo.completed} />
          {!editState ? (
            todo.title
          ) : (
            <input
              value={value}
              onChange={(event) => setValue(event.target.value)}
            />
          )}
        </span>
        <span className="todoItem__functions">
          <span
            className="pen-icon"
            onClick={() => {
              !props.parent
                ? editTodo(todo.id, value)
                : editSubTask(props.parent.id, todo.id, value);
              setEditState(!editState);
            }}
          ></span>
          <span
            className="trash-icon"
            onClick={() =>
              !props.parent
                ? removeTodo(todo.id)
                : removeSubTask(props.parent.id, todo.id)
            }
          ></span>
        </span>
      </span>
      {todo.subtasks && !props.parent ? (
        <span className="todoItem__subtasks">
          <TodosList items={todo.subtasks} parent={todo} />
        </span>
      ) : null}
    </li>
  );
}

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  parent: PropTypes.object,
};

export default TodoItem;
