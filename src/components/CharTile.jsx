import React, { useEffect, useRef } from 'react';

const CharTile = ({ char, active }) => {
  return (
    <div className={`char-tile ${active ? 'active' : ''}`}>
      {char}
    </div>
  )
}

export default CharTile;
