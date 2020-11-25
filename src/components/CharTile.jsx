import React, { useEffect, useRef } from 'react';

const CharTile = ({
  char,
  active,
  selected,
  handleClick,
  isBall,
  isPaddle
}) => {
  const tileRef = useRef();
  // TODO: Add fade in animation at the start
  // console.log("RENDER: ", char);

  return (
    <div
      className={`
        char-tile
        ${active ? 'active' : ''}
        ${selected ? 'selected' : ''}
        ${handleClick ? 'is-clickable' : ''}
        ${isBall ? 'ball' : ''}
        ${isPaddle ? 'paddle' : ''}
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
