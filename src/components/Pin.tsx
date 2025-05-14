import React from "react";

interface PinProps {
  id: string;
  start: { x: number; y: number };
  end: { x: number; y: number };
  colour: string;
  onDelete?: (id: string) => void;
}

const Pin: React.FC<PinProps> = ({ id, start, end, colour, onDelete }) => {
  // Handler for clicking pins
  const handlePinClick = () => {
    if (onDelete && id !== "drawing") {
      onDelete(id);
    }
  };

  // Pin size and clickable area
  const pinSize = 10;
  const clickableSize = 20; // Larger than visual size for easier clicking

  return (
    <>
      {/* Line between pins */}
      <svg
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 1,
        }}
      >
        <line
          x1={start.x}
          y1={start.y}
          x2={end.x}
          y2={end.y}
          stroke={colour}
          strokeWidth="2"
        />
      </svg>

      {/* Start pin (clickable) */}
      <div
        style={{
          position: "absolute",
          width: `${pinSize}px`,
          height: `${pinSize}px`,
          backgroundColor: colour,
          borderRadius: "50%",
          transform: "translate(-50%, -50%)",
          left: start.x,
          top: start.y,
          zIndex: 2,
          cursor: onDelete ? "pointer" : "default",
        }}
        onClick={handlePinClick}
      />

      {/* Invisible larger clickable area for start pin */}
      <div
        style={{
          position: "absolute",
          width: `${clickableSize}px`,
          height: `${clickableSize}px`,
          backgroundColor: "transparent",
          borderRadius: "50%",
          transform: "translate(-50%, -50%)",
          left: start.x,
          top: start.y,
          zIndex: 1,
          cursor: onDelete ? "pointer" : "default",
        }}
        onClick={handlePinClick}
      />

      {/* End pin (clickable) */}
      <div
        style={{
          position: "absolute",
          width: `${pinSize}px`,
          height: `${pinSize}px`,
          backgroundColor: colour,
          borderRadius: "50%",
          transform: "translate(-50%, -50%)",
          left: end.x,
          top: end.y,
          zIndex: 2,
          cursor: onDelete ? "pointer" : "default",
        }}
        onClick={handlePinClick}
      />

      {/* Invisible larger clickable area for end pin */}
      <div
        style={{
          position: "absolute",
          width: `${clickableSize}px`,
          height: `${clickableSize}px`,
          backgroundColor: "transparent",
          borderRadius: "50%",
          transform: "translate(-50%, -50%)",
          left: end.x,
          top: end.y,
          zIndex: 1,
          cursor: onDelete ? "pointer" : "default",
        }}
        onClick={handlePinClick}
      />
    </>
  );
};

export default Pin;
