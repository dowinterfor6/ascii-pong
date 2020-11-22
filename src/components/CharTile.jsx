import React, { useEffect, useRef } from 'react';

const CharTile = ({ char, active, selected, handleClick }) => {
  const tileRef = useRef();

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

const MemoizedCharTile = React.memo(CharTile);

export default MemoizedCharTile;
