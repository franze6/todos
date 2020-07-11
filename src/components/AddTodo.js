import React, { useState } from "react";
import PropTypes from "prop-types";

function AddTodo({ onCreate }) {
  return (
    <span
      className="addTodo add-icon"
      title="Добавить задачу"
      onClick={() => onCreate()}
    ></span>
  );
}

AddTodo.propTypes = {
  onCreate: PropTypes.func.isRequired,
};

export default AddTodo;
