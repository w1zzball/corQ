import React from "react";
import Draggable from "react-draggable";
import "./Note.css";

export interface NoteProps {
  id: string;
  text: string;
  position: {
    x: number;
    y: number;
  };
}

const Note: React.FC<NoteProps> = ({ id, text }) => {
  const nodeRef = React.useRef<HTMLElement>(null);
  return (
    <Draggable
      nodeRef={nodeRef}
      handle=".handle"
      defaultPosition={{ x: 0, y: 0 }}
      scale={1}
    >
      <div ref={nodeRef} className="note">
        <div className="controls">
          <div className="handle"></div>
          <button className="delete-button">X</button>
        </div>

        <p className="note-text">{text || "click here to edit"}</p>
      </div>
    </Draggable>
  );
};

export default Note;
