import React from "react";
import PropTypes from "prop-types";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import TodoItem from "./TodoItem";

function TodoListDnd({ items, reorderItems, parentTodo }) {
  function onDragEnd(result) {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    reorderItems(result.source.index, result.destination.index);
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="list">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {items.map((item, index) => (
              <Draggable draggableId={"id-" + index} index={index} key={index} isDragDisabled={item.completed}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <TodoItem
                      key={item.id}
                      todo={item}
                      parentTodo={parentTodo}
                      index={index}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

TodoListDnd.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  reorderItems: PropTypes.func.isRequired,
  parentTodo: PropTypes.object,
};

export default TodoListDnd;
