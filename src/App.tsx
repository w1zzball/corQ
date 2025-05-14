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

  return (
    <div id="app-container">
      {notes.map((note) => (
        <Note
          key={note.id}
          id={note.id}
          text={note.text}
          position={{ x: 0, y: 0 }} // Placeholder for position
        />
      ))}
    </div>
  );
}

export default App;
