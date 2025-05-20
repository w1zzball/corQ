import React, { useState, useEffect } from "react";
import Draggable from "react-draggable";
import "./Note.css";
import { Resizable } from "react-resizable";
import "react-resizable/css/styles.css";
import ReactMarkdown from "react-markdown";

export interface NoteProps {
  id: string;
  text: string;
  position: { x: number; y: number };
  zIndex: number;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
  onPositionChange: (id: string, pos: { x: number; y: number }) => void;
  bringToFront: (id: string) => void;
  onContextMenu?: (e: React.MouseEvent) => void;
}

const Note: React.FC<NoteProps> = ({
  id,
  text,
  position,
  zIndex,
  bringToFront,
  onDelete,
  onEdit,
  onPositionChange,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(text);
  const nodeRef = React.useRef<HTMLDivElement>(null);
  const [showDelete, setShowDelete] = useState(false);
  const [size, setSize] = useState({
    width: 200,
    height: 200,
  });

  useEffect(() => {
    setEditText(text);
  }, [text]);

  const handleDragStop = (_e: any, data: { x: number; y: number }) => {
    onPositionChange(id, { x: data.x, y: data.y });
  };

  const onResize = (
    event: React.SyntheticEvent,
    { size }: { size: { width: number; height: number } }
  ) => {
    setSize({ width: size.width, height: size.height });
  };

  return (
    <div
      className="note-wrapper"
      style={{ position: "absolute", zIndex: zIndex }}
      onContextMenu={(e) => {
        e.preventDefault();
        bringToFront(id);
      }}
      onClick={() => {
        bringToFront(id);
      }}
    >
      <Draggable
        nodeRef={nodeRef}
        handle=".handle"
        scale={1}
        position={position}
        onStart={() => {
          bringToFront(id);
        }}
        onStop={handleDragStop}
        offsetParent={document.body}
      >
        <div className="note-container" style={{ position: "absolute" }}>
          <Resizable
            width={size.width}
            height={size.height}
            onResize={onResize}
            minConstraints={[100, 100]}
            maxConstraints={[800, 800]}
            resizeHandles={["se"]}
          >
            <div
              ref={nodeRef}
              className="note"
              onMouseEnter={() => setShowDelete(true)}
              onMouseLeave={() => setShowDelete(false)}
              style={{
                width: size.width + "px",
                height: size.height + "px",
                position: "absolute",
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

              <div className="note-content">
                {isEditing ? (
                  <textarea
                    className="note-text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onBlur={() => {
                      setIsEditing(false);
                      onEdit(id, editText);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        setIsEditing(false);
                        onEdit(id, editText);
                      }
                    }}
                    autoFocus
                    style={{ width: "100%", height: "100%", resize: "none" }}
                  />
                ) : (
                  <p className="note-text" onClick={() => setIsEditing(true)}>
                    <ReactMarkdown>{text || "Click to edit"}</ReactMarkdown>
                  </p>
                )}
              </div>

              <p className="coordinates">
                {Math.round(position.x)},{Math.round(position.y)} | {size.width}
                x{size.height}
              </p>
            </div>
          </Resizable>
        </div>
      </Draggable>
    </div>
  );
};

export default Note;
