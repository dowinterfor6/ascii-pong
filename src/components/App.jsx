import React, { useEffect, useReducer, useRef, useState } from 'react';
import { getAllAsciiChar, getRandomAsciiChar } from '../util/util';
import CharTile from './CharTile';

const App = () => {
  const SET_TILES = "SETTILES";
  const SET_TILE = "SETTILE";

  const reducer = (state, action) => {
    let nextState = Object.assign({}, state);

    switch (action.type) {
      case SET_TILES:
        nextState.tileMatrix = action.payload;
        return nextState;
      case SET_TILE:
        const { x, y, char, active } = action.payload;
        nextState.tileMatrix[y][x].char = char;
        nextState.tileMatrix[y][x].active = active;
        return nextState;
      default:
        return state;
    }
  }

  const initialState = {
    tileMatrix: []
  };

  const setTiles = (tiles) => dispatch({
    type: SET_TILES,
    payload: tiles
  });

  const setTile = (x, y, char, active) => dispatch({
    type: SET_TILE,
    payload: {
      x,
      y,
      char,
      active
    }
  });

  window.setTile = setTile;

  const [state, dispatch] = useReducer(reducer, initialState);

  // Font Height: 19px, Width: 8.8px;
  const [refMatrix, setRefMatrix] = useState([]);
  const appRef = useRef();

  const [tileHeight, tileWidth] = [19, 9];

  useEffect(() => {
    // Size of box = 19px 9px
    let numXTiles = Math.floor(document.body.clientWidth / tileWidth);
    let numYTiles = Math.floor(document.body.clientHeight / tileHeight);
    console.log(`x: ${numXTiles}, y: ${numYTiles}`);

    // Ensure always odd num
    if (numXTiles % 2 === 0) {
      numXTiles--;
    };

    if (numYTiles % 2 === 0) {
      numYTiles--;
    };

    const initialRefMatrix = [];
    
    for (let y = 0; y < numYTiles; y++) {
      const row = [];

      for (let x = 0; x < numXTiles; x++) {
        const char = getRandomAsciiChar();
        const refObj = {
          char,
          active: false
        }
        row.push(refObj)
      }

      initialRefMatrix.push(row);
    };

    // setRefMatrix(initialRefMatrix);
    setTiles(initialRefMatrix);

    setTimeout(() => {
      setupLanding();
    }, 1000)
  }, []);

  function setupLanding() {
    /*
      <section>----------------------------
      |                                   |
      |        <h1>ASCII Pong</h1>        |
      |                                   |
      |                                   |
      |                                   |
      |  <div>---------   <div>---------  |
      |  |     1p     |   |     2P     |  |
      |  --------</div>   --------</div>  |
      |                                   |
      |                                   |
      |        <button>-----------        |
      |        |      Start      |        |
      |        ----------</button>        |
      |                                   |
      ---------------------------</section>
    */
  }

  return (
    <div className="app" ref={appRef}>
      <ul className="rows">
        {state.tileMatrix.map((row, xidx) => {
          return (
            <li className={`row-${xidx}`} key={`row-${xidx}`}>
              {row.map((tile, yidx) => {
                return (
                  <CharTile
                    char={tile.char}
                    active={tile.active}
                    key={`${xidx}-${yidx}`}
                  />
                )
              })}
            </li>
          )
        })}
      </ul>
    </div>
  );
}

export default App;
