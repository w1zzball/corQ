import React from "react";

interface PinProps {
  id: string;
  start: { x: number; y: number };
  end: { x: number; y: number };
  colour: string;
}

const Pin: React.FC<PinProps> = ({ start, end, colour }) => {
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
      {/* Start pin */}
      <div
        style={{
          position: "absolute",
          width: "10px",
          height: "10px",
          backgroundColor: colour,
          borderRadius: "50%",
          transform: "translate(-50%, -50%)",
          left: start.x,
          top: start.y,
          zIndex: 2,
        }}
      />

      {/* End pin */}
      <div
        style={{
          position: "absolute",
          width: "10px",
          height: "10px",
          backgroundColor: colour,
          borderRadius: "50%",
          transform: "translate(-50%, -50%)",
          left: end.x,
          top: end.y,
          zIndex: 2,
        }}
      />
    </>
  );
};

export default Pin;
