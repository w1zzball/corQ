import React from "react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Note from "./components/Note";
import Button from "./components/Button";
import ContextMenu from "./components/ContextMenu";
import "./App.css";

function App() {
  const [zCounter, setZCounter] = useState(0);
  //Notes
  const [notes, setNotes] = useState([
    { id: uuidv4(), text: "", position: { x: 100, y: 100 }, zIndex: 1 },
    // { id: uuidv4(), text: "Note 2" },
    // { id: uuidv4(), text: "Note 3" },
  ]);
  const [contextMenu, setContextMenu] = useState({
    x: 0,
    y: 0,
    visible: false,
  });
  const addNote = () => {
    setNotes((prevNotes) => [
      ...prevNotes,
      {
        id: uuidv4(),
        text: "",
        position: { x: 100, y: 100 },
        zIndex: zCounter,
      },
    ]);
    setZCounter((prevCounter) => prevCounter + 1);
  };
  const bringToFront = (id: string) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id ? { ...note, zIndex: zCounter } : note
      )
    );
    setZCounter((z) => z + 1);
  };
  const onDelete = (id: string) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };
  const onEdit = (id: string, text: string) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) => (note.id === id ? { ...note, text } : note))
    );
  };
  const onPositionChange = (id: string, position: { x: number; y: number }) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) => (note.id === id ? { ...note, position } : note))
    );
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      visible: true,
    });
  };

  return (
    <div id="app-container" onContextMenu={handleContextMenu}>
      {/* Add Note Button */}
      <Button id="add-note" name="Add Note" handleClick={addNote}></Button>
      {/* Notes */}
      {notes.map((note) => (
        <Note
          key={note.id}
          id={note.id}
          text={note.text}
          position={note.position}
          zIndex={note.zIndex}
          bringToFront={bringToFront}
          onDelete={onDelete}
          onEdit={onEdit}
          onPositionChange={onPositionChange}
        />
      ))}
      {contextMenu.visible && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          visible={contextMenu.visible}
          onClose={() => setContextMenu((cm) => ({ ...cm, visible: false }))}
        >
          <Button id="add-note" name="Add Note" handleClick={addNote}></Button>

          <div>Delete</div>
          <div>Edit</div>
        </ContextMenu>
      )}
    </div>
  );
}

export default App;
