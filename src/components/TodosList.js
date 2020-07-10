import React from "react";
import PropTypes from "prop-types";
import TodoItem from "./TodoItem";
import "../styles/TodoList.sass";

function TodosList(props) {
  return (
    <ul className="todoList">
      {props.items.map((item) => (
        <TodoItem key={item.id} todo={item} parent={props.parent} />
      ))}
    </ul>
  );
}

TodosList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  parent: PropTypes.object,
};

export default TodosList;
