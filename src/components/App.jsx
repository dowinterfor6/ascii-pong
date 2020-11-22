import React, { useEffect, useReducer, useRef, useState } from 'react';
import { getAllAsciiChar, getLanding, getRandomAsciiChar } from '../util/util';
import CharTile from './CharTile';

const App = () => {
  const SET_TILES = "SETTILES";
  const SET_TILE = "SETTILE";
  const SET_CLICK_HANDLER = "SETCLICKHANDLER";
  const SET_PLAYERS = "SETPLAYERS";

  const reducer = (state, action) => {
    let nextState = Object.assign({}, state);

    let x;
    let y;

    switch (action.type) {
      case SET_TILES:
        nextState.tileMatrix = action.payload;
        return nextState;
      case SET_TILE:
        x = action.payload.x;
        y = action.payload.y;
        const { char, properties } = action.payload;
        nextState.tileMatrix[y][x].char = char;
        nextState.tileMatrix[y][x].properties = properties;
        return nextState;
      case SET_CLICK_HANDLER:
        x = action.payload.x;
        y = action.payload.y;
        const { handleClick } = action.payload;
        nextState.tileMatrix[y][x].properties.handleClick = handleClick;
        return nextState;
      case SET_PLAYERS:
        const { offsetX, offsetY } = action.payload;
        nextState.players = action.payload.players;
        if (nextState.players === 1) {
          // 1P
          for (let y = 7; y <= 9; y++) {
            for (let x = 3; x <= 16; x++) {
              if (y === 8) {
                if ([3, 9, 10, 16].includes(x)) {
                  nextState.tileMatrix[y + offsetY][x + offsetX].properties.selected = true;
                }
              } else {
                nextState.tileMatrix[y + offsetY][x + offsetX].properties.selected = true;
              }
            };
          };

          // 2P
          for (let y = 7; y <= 9; y++) {
            for (let x = 20; x <= 33; x++) {
              if (y === 8) {
                if ([20, 26, 27, 33].includes(x)) {
                  nextState.tileMatrix[y + offsetY][x + offsetX].properties.selected = false;
                }
              } else {
                nextState.tileMatrix[y + offsetY][x + offsetX].properties.selected = false;
              }
            };
          };
        } else {
          // 1P
          for (let y = 7; y <= 9; y++) {
            for (let x = 3; x <= 16; x++) {
              if (y === 8) {
                if ([3, 9, 10, 16].includes(x)) {
                  nextState.tileMatrix[y + offsetY][x + offsetX].properties.selected = false;
                }
              } else {
                nextState.tileMatrix[y + offsetY][x + offsetX].properties.selected = false;
              }
            };
          };

          // 2P
          for (let y = 7; y <= 9; y++) {
            for (let x = 20; x <= 33; x++) {
              if (y === 8) {
                if ([20, 26, 27, 33].includes(x)) {
                  nextState.tileMatrix[y + offsetY][x + offsetX].properties.selected = true;
                }
              } else {
                nextState.tileMatrix[y + offsetY][x + offsetX].properties.selected = true;
              }
            };
          };
        }
        return nextState;
      default:
        return state;
    }
  }

  const initialState = {
    tileMatrix: [],
    players: 2,
    // Add logic for game state change
    gameState: {
      landing: true,
      game: false,
    }
  };

  const setTiles = (tiles) => dispatch({
    type: SET_TILES,
    payload: tiles
  });

  const setTile = (x, y, char, properties) => dispatch({
    type: SET_TILE,
    payload: {
      x,
      y,
      char,
      properties,
    }
  });

  const setClickHandler = (x, y, handleClick) => dispatch({
    type: SET_CLICK_HANDLER,
    payload: {
      x,
      y,
      handleClick
    }
  });

  const setPlayers = (offsetX, offsetY, players) => dispatch({
    type: SET_PLAYERS,
    payload: {
      offsetX,
      offsetY,
      players
    },
  })

  window.setTile = setTile;

  const [state, dispatch] = useReducer(reducer, initialState);

  // Font Height: 19px, Width: 8.8px;
  const [refMatrix, setRefMatrix] = useState([]);
  const appRef = useRef();

  const [tileHeight, tileWidth] = [19, 9];

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
  
  useEffect(() => {
    const initialRefMatrix = [];
    
    for (let y = 0; y < numYTiles; y++) {
      const row = [];

      for (let x = 0; x < numXTiles; x++) {
        const char = getRandomAsciiChar();
        const refObj = {
          char,
          properties: {
            active: false
          }
        }
        row.push(refObj)
      }

      initialRefMatrix.push(row);
    };

    setTiles(initialRefMatrix);

    setupLanding();
  }, []);

  const setupLanding = () => {
    const landingMatrix = getLanding();
    const offsetX = ((numXTiles - 1) / 2) - ((landingMatrix[0].length - 1) / 2);
    const offsetY = ((numYTiles - 1) / 2) - ((landingMatrix.length - 1) / 2);
    
    for (let y = 0; y < landingMatrix.length; y++) {
      for (let x = 0; x < landingMatrix[0].length; x++) {
        const currEl = landingMatrix[y][x].char;
        if (currEl !== " ") {
          let properties = {
            active: true
          };
          
          // Default 2P
          if (
            (y === 7 && (x >= 20 && x <= 33)) ||
            (y === 8 && [20, 26, 27, 33].includes(x)) ||
            (y === 9 && (x >= 20 && x <= 33))
          ) {
            properties.selected = true;
          };
          setTile(x + offsetX, y + offsetY, currEl, properties);
        };
      };
    };

    setupClickEvents(offsetX, offsetY);
  }

  const setupClickEvents = (offsetX, offsetY) => {
    // 1P
    for (let y = 7; y <= 9; y++) {
      for (let x = 3; x <= 16; x++) {
        const adjustedX = x + offsetX;
        const adjustedY = y + offsetY;
        const oneP = () => setPlayersCallback(offsetX, offsetY, 1);
        setClickHandler(adjustedX, adjustedY, oneP);
      };
    };

    // 2P
    for (let y = 7; y <= 9; y++) {
      for (let x = 20; x <= 33; x++) {
        const adjustedX = x + offsetX;
        const adjustedY = y + offsetY;
        const twoP = () => setPlayersCallback(offsetX, offsetY, 2);
        setClickHandler(adjustedX, adjustedY, twoP);
      };
    };

    // Start
    for (let y = 12; y <= 14; y++) {
      for (let x = 9; x <= 27; x++) {
        const adjustedX = x + offsetX;
        const adjustedY = y + offsetY;
        const startGame = () => console.log("START GAME");
        setClickHandler(adjustedX, adjustedY, startGame);
      };
    };
  };

  const setPlayersCallback = (offsetX, offsetY, num) => {
    console.log(`${num}P`);
    setPlayers(offsetX, offsetY, num);
  };

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
                    active={tile.properties.active}
                    selected={tile.properties.selected}
                    handleClick={tile.properties.handleClick}
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
