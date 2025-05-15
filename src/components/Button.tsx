import React, { useState } from "react";

export interface ButtonProps {
  id: string;
  classes?: string[];
  ariaLabel?: string;
  name: string;
  icon?: string;
  handleClick: (id: string) => void;
}

const Button = ({
  id,
  name,
  handleClick,
  classes = [],
  ariaLabel = name,
}: ButtonProps) => {
  const [style, setStyle] = useState({});

  const handleMouseEnter = () => {
    setStyle({
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      color: "white",
    });
  };
  const handleMouseLeave = () => {
    setStyle({});
  };

  return (
    <button
      className={`btn ${classes.join(" ")}`}
      aria-label={ariaLabel}
      onClick={() => handleClick(id)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={style}
      id={id}
    >
      {name}
    </button>
  );
};

export default Button;
