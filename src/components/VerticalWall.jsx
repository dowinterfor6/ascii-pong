import React from 'react';

const VerticalWall = ({ style }) => {
  return (
    <div className="vertical-wall" style={style}>
      |<br />
      |<br />
      |<br />
      |<br />
      |<br />
      |<br />
      |<br />
      |<br />
      |<br />
      |<br />
      |<br />
      |<br />
      |<br />
      |<br />
      |<br />
      |<br />
      |<br />
      |<br />
      |<br />
      |<br />
      |<br />
      |<br />
      |<br />
    </div>
  )
}

const MemoizedVerticalWall = React.memo(VerticalWall);

export default MemoizedVerticalWall;
