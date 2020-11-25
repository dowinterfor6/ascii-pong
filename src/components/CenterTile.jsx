import React from 'react';

const CenterTile = () => {
  return (
    <div className="center-tile">
      :
    </div>
  )
}

const MemoizedCenterTile = React.memo(CenterTile);

export default MemoizedCenterTile;