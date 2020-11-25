import React from 'react';

const HorizontalWall = ({ style }) => {
  return (
    <div className="horizontal-wall" style={style}>
      ---------------------------------------------------------------------------------------------
    </div>
  )
}

const MemoizedHorizontalWall = React.memo(HorizontalWall);

export default MemoizedHorizontalWall;
