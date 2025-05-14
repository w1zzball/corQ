import React from "react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Note from "./components/Note";
import "./App.css";

function App() {
  const [notes, setNotes] = useState([
    { id: uuidv4(), text: "Note 1" },
    { id: uuidv4(), text: "Note 2" },
    { id: uuidv4(), text: "Note 3" },
  ]);
  const onDelete = (id: string) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };
  const onEdit = (id: string, text: string) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) => (note.id === id ? { ...note, text } : note))
    );
  };
  return (
    <div id="app-container">
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
