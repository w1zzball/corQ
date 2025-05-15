import React, { useState, useEffect } from "react";
import Draggable from "react-draggable";
import "./Note.css";
import { Resizable } from "react-resizable";
import "react-resizable/css/styles.css"; // Import the styles for resizable

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

const Note: React.FC<NoteProps> = ({
  id,
  text,
  position: initialPosition,
  onDelete,
  onEdit,
}) => {
  const nodeRef = React.useRef<HTMLDivElement>(null);
  const [showDelete, setShowDelete] = useState(false);
  const [position, setPosition] = useState({
    x: initialPosition?.x || 0,
    y: initialPosition?.y || 0,
  });
  const [size, setSize] = useState({
    width: 200,
    height: 200,
  });

  // Update position if initialPosition changes
  useEffect(() => {
    if (initialPosition) {
      setPosition(initialPosition);
    }
  }, [initialPosition]);

  const handleDragStop = (e: any, newCoords: { x: number; y: number }) => {
    setPosition({ x: newCoords.x, y: newCoords.y });
    console.log("New coordinates", newCoords);
  };

  // Handle resize events
  const onResize = (
    event: React.SyntheticEvent,
    { size }: { size: { width: number; height: number } }
  ) => {
    setSize({ width: size.width, height: size.height });
  };

  // Handle note text editing
  const handleTextClick = () => {
    const newText = prompt("Edit note:", text);
    if (newText !== null) onEdit(id, newText);
  };

  return (
    <Draggable
      onStop={handleDragStop}
      nodeRef={nodeRef}
      handle=".handle"
      scale={1}
      defaultPosition={position}
    >
      <Resizable
        width={size.width}
        height={size.height}
        onResize={onResize}
        minConstraints={[100, 100]} // Minimum size
        maxConstraints={[800, 800]} // Maximum size
        resizeHandles={["se"]} // Only show the bottom-right resize handle
      >
        <div
          ref={nodeRef}
          className="note"
          onMouseEnter={() => setShowDelete(true)}
          onMouseLeave={() => setShowDelete(false)}
          style={{
            width: size.width + "px",
            height: size.height + "px",
          }}
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

          <div className="note-content" onClick={handleTextClick}>
            <p className="note-text">{text || "click here to edit"}</p>
          </div>

          <p className="coordinates">
            {Math.round(position.x)},{Math.round(position.y)} | {size.width}x
            {size.height}
          </p>
        </div>
      </Resizable>
    </Draggable>
  );
};

export default Note;
