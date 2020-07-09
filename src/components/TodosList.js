import React from "react";
import PropTypes from "prop-types";
import TodoItem from "./TodoItem";
import "../styles/TodoList.sass";

function TodosList(props) {
  return (
    <div>
      <ul className="todoList">
        {props.items.map((item) => (
          <TodoItem key={item.id} todo={item} />
        ))}
      </ul>
    </div>
  );
}

TodosList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TodosList;
