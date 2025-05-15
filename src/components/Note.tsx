import React, { useState, useEffect } from "react";
import Draggable from "react-draggable";
import "./Note.css";

export interface NoteProps {
  id: string;
  text: string;
  position?: {
    x: number;
    y: number;
  };
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
}

const Note: React.FC<NoteProps> = ({ id, text, onDelete, onEdit }) => {
  const nodeRef = React.useRef<HTMLElement>(null);
  const [showDelete, setShowDelete] = useState(false);
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });
  const handleDragStop = (e: any, newCoords: { x: number; y: number }) => {
    setPosition({ x: newCoords.x, y: newCoords.y });
    console.log("New coordinates", position);
  };

  return (
    <Draggable
      onStop={handleDragStop}
      nodeRef={nodeRef}
      handle=".handle"
      scale={1}
    >
      <div
        ref={nodeRef}
        className="note"
        onMouseEnter={() => setShowDelete(true)}
        onMouseLeave={() => setShowDelete(false)}
      >
        <div className="controls">
          <div className="handle"></div>
          <button
            className="delete-button"
            hidden={!showDelete}
            onClick={() => onDelete(id)}
          >
            X
          </button>
        </div>

        <p className="note-text">{text || "click here to edit"}</p>
        <p className="coordinates">
          {position.x} {position.y}
        </p>
      </div>
    </Draggable>
  );
};

export default Note;
