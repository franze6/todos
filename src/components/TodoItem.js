import React from "react";
import PropTypes from "prop-types";
import "../styles/TodoItem.sass";

function TodoItem(props) {
  return (
    <li className="todoItem">
      <span>
        <input type="checkbox" defaultChecked={props.completed} />
        {props.title}
      </span>
      <button>&times;</button>
    </li>
  );
}

TodoItem.propTypes = {
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
};

export default TodoItem;
