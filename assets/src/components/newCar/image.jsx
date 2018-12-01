import React from "react";
import { Draggable } from "react-beautiful-dnd";
import "./newCar.css";

const Image = props => {
  return (
    <Draggable
      key={props.draggableId}
      draggableId={props.draggableId}
      index={props.index}
    >
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="imageWrapper relative">
            <img src={props.item.content} alt="image preview" />
            <div
              onClick={() => props.onDelete(props.item.id)}
              className="delete-button"
            >
              <span>x</span>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Image;
