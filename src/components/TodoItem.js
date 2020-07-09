import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import "../styles/TodoItem.sass";
import Context from "../context";

function TodoItem(props) {
  const todo = props.todo;
  const { removeTodo, editTodo } = useContext(Context);
  const [editState, setEditState] = useState(false);
  const [value, setValue] = useState(todo.title);

  return (
    <li className="todoItem">
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
            editTodo(todo.id, value);
            setEditState(!editState);
          }}
        ></span>
        <span className="trash-icon" onClick={() => removeTodo(todo.id)}></span>
      </span>
    </li>
  );
}

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
};

export default TodoItem;
