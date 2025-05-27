import React from "react";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Note from "./components/Note";
// import Button from "./components/Button";


import "./App.css";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';

function App() {
  const [zCounter, setZCounter] = useState(0);
  //Notes
  const [notes, setNotes] = useState([
    { id: uuidv4(), text: "", position: { x: 100, y: 100 }, zIndex: 1 },
    // { id: uuidv4(), text: "Note 2" },
    // { id: uuidv4(), text: "Note 3" },
  ]);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [currentNoteId, setCurrentNoteId] = useState<string | null>(null);
  const open = Boolean(anchorEl);
  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>, noteId: string) => {
    setAnchorEl(event.currentTarget);
    setCurrentNoteId(noteId);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
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
      {notes.map((note) => (
        <React.Fragment key={note.id}>
          <Note
            id={note.id}
            text={note.text}
            position={note.position}
            zIndex={note.zIndex}
            bringToFront={bringToFront}
            onDelete={onDelete}
            onEdit={onEdit}
            onPositionChange={onPositionChange}
            onContextMenu={(e) => handleMenuClick(e, note.id)}
          />
        </React.Fragment>
      ))}

      {/* Add Floating Action Button for creating new notes */}
      <Fab
        color="primary"
        aria-label="add note"
        onClick={addNote}
        style={{
          position: 'fixed',
          top: '2rem',
          left: '2rem',
          zIndex: 9999
        }}
      >
        <AddIcon />
      </Fab>

      {/* Move the Menu outside the note mapping loop */}
      <Menu
        id="note-context-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            'aria-labelledby': 'context-menu',
          },
        }}
      >
        <MenuItem onClick={() => {
          if (currentNoteId) onDelete(currentNoteId);
          handleClose();
        }}>
          Delete
        </MenuItem>
        {/* Add more menu items as needed */}
      </Menu>
    </div>
  );
}

export default App;
