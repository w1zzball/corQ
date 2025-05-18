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
  return (
    <button
      className={`${classes.join(" ")}`}
      aria-label={ariaLabel}
      onClick={() => handleClick(id)}
      id={id}
    >
      {name}
    </button>
  );
};

export default Button;
