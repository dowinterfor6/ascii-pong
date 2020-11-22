import React, { useEffect, useRef } from 'react';

const CharTile = ({ char, properties }) => {
  const tileRef = useRef();
  const { active, selected, handleClick } = properties;

  useEffect(() => {
    if (active) {
      tileRef.current.classList.add("active");
    }
  })

  return (
    <div
      className={`
        char-tile
        ${selected ? 'selected' : ''}
        ${handleClick ? 'isClickable' : ''}
      `}
      ref={tileRef}
      onClick={handleClick}
    >
      {char}
    </div>
  )
}

export default CharTile;
