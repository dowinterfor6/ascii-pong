import React, { useEffect, useRef } from 'react';

const CharTile = ({ char, active, selected, handleClick }) => {
  const tileRef = useRef();

  // TODO: Add fade in animation at the start

  return (
    <div
      className={`
        char-tile
        ${active ? 'active' : ''}
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
