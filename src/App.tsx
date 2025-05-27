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
  const [menuPosition, setMenuPosition] = useState<{ top: number; left: number } | null>(null);
  const [currentNoteId, setCurrentNoteId] = useState<string | null>(null);
  const open = Boolean(menuPosition);
  const handleMenuClick = (event: React.MouseEvent, noteId: string) => {
    event.preventDefault();
    setMenuPosition({ top: event.clientY, left: event.clientX });
    setCurrentNoteId(noteId);
  };
  const handleClose = () => {
    setMenuPosition(null);
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
  const duplicateNote = (id: string) => {
    const noteToDuplicate = notes.find((note) => note.id === id);
    if (noteToDuplicate) {
      const newNote = {
        ...noteToDuplicate,
        id: uuidv4(),
        position: {
          x: noteToDuplicate.position.x + 20, // Offset the position slightly
          y: noteToDuplicate.position.y + 20,
        },
        zIndex: zCounter,
      };
      setNotes((prevNotes) => [...prevNotes, newNote]);
      setZCounter((prevCounter) => prevCounter + 1);
    }
  }
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

      {/* Menu positioned at mouse cursor */}
      <Menu
        id="note-context-menu"
        open={open}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={menuPosition ? { top: menuPosition.top, left: menuPosition.left } : undefined}
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
        <MenuItem onClick={() => {
          if (currentNoteId) duplicateNote(currentNoteId);
          handleClose();
        }}>
          Duplicate
        </MenuItem>
        {/* Add more menu items as needed */}
      </Menu>
    </div>
  );
}

export default App;
