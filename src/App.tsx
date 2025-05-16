import React from "react";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Note from "./components/Note";
import Button from "./components/Button";
import "./App.css";

function App() {
  const [zCounter, setZCounter] = useState(0);
  //Notes
  const [notes, setNotes] = useState([
    { id: uuidv4(), text: "", position: { x: 100, y: 100 }, zIndex: 1 },
    // { id: uuidv4(), text: "Note 2" },
    // { id: uuidv4(), text: "Note 3" },
  ]);
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

  return (
    <div
      id="app-container"
      onContextMenu={(e) => {
        e.preventDefault();
      }}
    >
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
    </div>
  );
}

export default App;
