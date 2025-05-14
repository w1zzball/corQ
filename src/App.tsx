import React from "react";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Note from "./components/Note";
import Pin from "./components/Pin";
import "./App.css";

function App() {
  //Notes
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

  //Pins
  interface Pins {
    id: string;
    start: { x: number; y: number };
    end: { x: number; y: number };
    colour: string;
  }
  const [pins, setPins] = useState<Pins[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentPin, setCurrentPin] = useState<{
    id: string;
    start: { x: number; y: number };
    end: { x: number; y: number };
    colour: string;
  } | null>(null);

  // Random color generator for pins
  const getRandomColor = () => {
    const colors = [
      "#FF5733",
      "#33FF57",
      "#3357FF",
      "#F033FF",
      "#FF33A8",
      "#33FFF6",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  // Function to delete a pin
  const deletePin = (id: string) => {
    setPins((prevPins) => prevPins.filter((pin) => pin.id !== id));
  };

  // Handle right mouse button down
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent default context menu

    // Start drawing if not already drawing
    if (!isDrawing) {
      const startPoint = { x: e.clientX, y: e.clientY };
      const newPin = {
        id: uuidv4(),
        start: startPoint,
        end: startPoint, // Initially the same as start
        colour: getRandomColor(),
      };

      setCurrentPin(newPin);
      setIsDrawing(true);
    }
  };

  // Handle mouse move to update the end position during drawing
  const handleMouseMove = (e: MouseEvent) => {
    if (isDrawing && currentPin) {
      setCurrentPin({
        ...currentPin,
        end: { x: e.clientX, y: e.clientY },
      });
    }
  };

  // Handle mouse up to complete the pin drawing
  const handleMouseUp = (e: MouseEvent) => {
    if (isDrawing && currentPin) {
      // Add the completed pin to pins array
      setPins([
        ...pins,
        {
          ...currentPin,
          end: { x: e.clientX, y: e.clientY },
        },
      ]);

      // Reset drawing state
      setIsDrawing(false);
      setCurrentPin(null);
    }
  };

  // Set up event listeners
  useEffect(() => {
    // We need to handle mousemove and mouseup at the document level
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      // Clean up event listeners
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDrawing, currentPin]);

  return (
    <div id="app-container" onContextMenu={handleContextMenu}>
      {/* Render all saved pins */}
      {pins.map((pin) => (
        <Pin
          key={pin.id}
          id={pin.id}
          start={pin.start}
          end={pin.end}
          colour={pin.colour}
          onDelete={deletePin}
        />
      ))}

      {/* Render the current pin being drawn */}
      {isDrawing && currentPin && (
        <Pin
          key="drawing"
          id="drawing"
          start={currentPin.start}
          end={currentPin.end}
          colour={currentPin.colour}
        />
      )}

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
