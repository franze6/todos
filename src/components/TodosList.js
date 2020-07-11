import React from "react";
import PropTypes from "prop-types";
import TodoItem from "./TodoItem";

function TodoList({ items, parentTodo }) {
  return (
    <ul className="todoList">
      {items.map((item, index) => (
        <TodoItem key={item.id} todo={item} parentTodo={parentTodo} index={index} />
      ))}
    </ul>
  );
}

TodoList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  parentTodo: PropTypes.object,
};

export default TodoList;
