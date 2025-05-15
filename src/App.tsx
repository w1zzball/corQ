import React from "react";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Note from "./components/Note";
import Button from "./components/Button";
import "./App.css";

function App() {
  //Notes
  const [notes, setNotes] = useState([
    { id: uuidv4(), text: "click to edit" },
    // { id: uuidv4(), text: "Note 2" },
    // { id: uuidv4(), text: "Note 3" },
  ]);
  const addNote = () => {
    setNotes((prevNotes) => [...prevNotes, { id: uuidv4(), text: "New Note" }]);
  };
  const onDelete = (id: string) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };
  const onEdit = (id: string, text: string) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) => (note.id === id ? { ...note, text } : note))
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
          position={{ x: 0, y: 0 }} // Placeholder for position
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}

export default App;
