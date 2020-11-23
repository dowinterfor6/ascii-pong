import React, { useEffect, useReducer, useRef, useState } from 'react';
import { getAllAsciiChar, getDisplayNumMatrix, getLanding, getRandomAsciiChar } from '../util/util';
import CharTile from './CharTile';

const SET_TILES = "SETTILES";
const SET_TILE = "SETTILE";
const SET_CLICK_HANDLER = "SETCLICKHANDLER";
const SET_PLAYERS = "SETPLAYERS";
const INCREMENT_SCORE = "INCREMENTSCORE";
const RESET_SCORE = "RESETSCORE";

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
    case INCREMENT_SCORE:
      const oldScore = state.gameState.score[`p${action.payload.player}`];
      nextState.gameState.score[`p${action.payload.player}`] = oldScore + action.payload.score;
      return nextState;
    case RESET_SCORE:
      nextState.gameState.score.p1 = 0;
      nextState.gameState.score.p2 = 0;
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
    winnder: undefined,
    score: {
      p1: 0,
      p2: 0
    }
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [p1PaddleCenter, setP1PaddleCenter] = useState();
  const [p2PaddleCenter, setP2PaddleCenter] = useState();
  // Temp solution, alt use state?
  const [isGameActive, setIsGameActive] = useState(false);
  const isGameActiveRef = useRef(isGameActive);
  const p1PaddleCenterRef = useRef(p1PaddleCenter);
  const p2PaddleCenterRef = useRef(p2PaddleCenter);

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
  });
  
  const incrementScore = (player) => dispatch({
    type: INCREMENT_SCORE,
    payload: {
      player,
      score: 1
    }
  });
  
  const resetScores = () => dispatch({
    type: RESET_SCORE
  });
  
  window.increment = incrementScore;
  window.reset = resetScores;
  
  window.setTile = setTile;  

  // Font Height: 19px, Width: 8.8px;
  const appRef = useRef();

  const [tileHeight, tileWidth] = [19, 9];

  // Size of box = 19px 9px
  let numXTiles = Math.floor(document.body.clientWidth / tileWidth);
  let numYTiles = Math.floor(document.body.clientHeight / tileHeight);
  // console.log(`x: ${numXTiles}, y: ${numYTiles}`);

  // Ensure always odd num
  if (numXTiles % 2 === 0) {
    numXTiles--;
  };

  if (numYTiles % 2 === 0) {
    numYTiles--;
  };
  
  // Mounted
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

    setupPlayerKeybinds();
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
        setClickHandler(adjustedX, adjustedY, startGameCallback);
      };
    };
  };

  const setPlayersCallback = (offsetX, offsetY, num) => {
    console.log(`${num}P`);
    setPlayers(offsetX, offsetY, num);
  };

  const startGameCallback = () => {
    console.log("START GAME");
    clearLanding();
    setupGameArea();
    setIsGameActive(true);
    isGameActiveRef.current = true;
  }

  const clearLanding = () => {
    // TODO: Set clickable = false, handle click = nothing
    console.log("CLEAR LANDING");
    const landingMatrix = getLanding();
    const offsetX = ((numXTiles - 1) / 2) - ((landingMatrix[0].length - 1) / 2);
    const offsetY = ((numYTiles - 1) / 2) - ((landingMatrix.length - 1) / 2);
    
    for (let y = 0; y < landingMatrix.length; y++) {
      for (let x = 0; x < landingMatrix[0].length; x++) {
        const currEl = landingMatrix[y][x].char;
        if (currEl !== " ") {
          const randChar = getRandomAsciiChar();
          setTile(x + offsetX, y + offsetY, randChar, { active: false });
        };
      };
    };
  };
  
  const xCenter = (numXTiles - 1) / 2;
  const yCenter = (numYTiles - 1) / 2;
  // TODO: Not responsive at all
  // Add a different screen/warning for incompatible screen size?
  const halfWidth = 45;
  const halfHeight = 12;

  const setupGameArea = () => {
    console.log("SETUP GAME AREA");
    // Setup bounds
    setupGameBounds();
    // Setup scoreboard
    setupScoreBoard();
    // Setup paddles
    setupPaddles();
  };

  const setupGameBounds = () => {
    const [x1, x2] = [xCenter - halfWidth, xCenter + halfWidth];
    const [y1, y2] = [yCenter - halfHeight, yCenter + halfHeight];

    for (let y = y1; y <= y2; y++) {
      for (let x = x1; x <= x2; x++) {
        if (y === y1 || y === y2) {
          setTile(x, y, "-", { active: true })
        } else if (x === x1 || x === x2) {
          setTile(x, y, "|", { active: true });
        } else if (x === xCenter) {
          // TODO: Should this be above the actual board?
          // Or make the ball 2 full bar
          setTile(x, y, ":", { active: true })
        }
      }
    };

  };

  const yOffset = 1;
  const xOffsetLeft = xCenter - (2 + 5);
  const xOffsetRight = xCenter + (2 + 1);

  // TODO: Also need an update scoreboard method
  const setupScoreBoard = () => {
    const [y1, y2] = [yOffset, yOffset + 4];
    /* Score 5 high
      OOOOO     OOOOO
      O   O  O  O   O
      O   O     O   O
      O   O  O  O   O
      OOOOO     OOOOO
    */
    const zero = getDisplayNumMatrix(0);
    // Left bounds
    for (let y = 0; y < 5; y++) {
      for (let x = 0; x < 5; x++) {
        const currChar = zero[y][x];
        if (currChar !== " ") {
          setTile(x + xOffsetLeft, y + yOffset, currChar, { active: true });
        }
      }
    }
    // Middle bounds
    setTile(xCenter, y1 + 1, "●", { active: true });
    setTile(xCenter, y2 - 1, "●", { active: true });
    // Right bounds
    for (let y = 0; y < 5; y++) {
      for (let x = 0; x < 5; x++) {
        const currChar = zero[y][x];
        if (currChar !== " ") {
          setTile(x + xOffsetRight, y + yOffset, currChar, { active: true });
        }
      }
    }
  }

  const winningScore = 7;

  // Not the most elegant solution to split them up

  useEffect(() => {
    if (state.gameState.score.p1 === 0) return;
    
    if (state.gameState.score.p1 <= winningScore) {
      console.log("P1 Score changed");
      const prevScore = state.gameState.score.p1 - 1;
      const currScore = prevScore + 1;
      const prevScoreDisplay = getDisplayNumMatrix(prevScore);
      const currScoreDisplay = getDisplayNumMatrix(currScore);
      // Display num dimensions = 5x5
      for (let y = 0; y < 5; y++) {
        for (let x = 0; x < 5; x++) {
          const currChar = currScoreDisplay[y][x];
          if (currChar !== prevScoreDisplay[y][x]) {
            if (currChar === " ") {
              setTile(x + xOffsetLeft, y + yOffset, getRandomAsciiChar(), { active: false })
            } else {
              setTile(x + xOffsetLeft, y + yOffset, currChar, { active: true })
            }
          }
        }
      }

      if (state.gameState.score.p1 === winningScore) {
        console.log("P1 wins");
        // Display win screen + back to home
      }
    };
  }, [state.gameState.score.p1]);

  
  useEffect(() => {
    if (state.gameState.score.p2 === 0) return;
    
    if (state.gameState.score.p2 <= winningScore) {
      console.log("P2 Score changed");
      const prevScore = state.gameState.score.p2 - 1;
      const currScore = prevScore + 1;
      const prevScoreDisplay = getDisplayNumMatrix(prevScore);
      const currScoreDisplay = getDisplayNumMatrix(currScore);
      // Display num dimensions = 5x5
      for (let y = 0; y < 5; y++) {
        for (let x = 0; x < 5; x++) {
          const currChar = currScoreDisplay[y][x];
          if (currChar !== prevScoreDisplay[y][x]) {
            if (currChar === " ") {
              setTile(x + xOffsetRight, y + yOffset, getRandomAsciiChar(), { active: false })
            } else {
              setTile(x + xOffsetRight, y + yOffset, currChar, { active: true })
            }
          }
        }
      }

      if (state.gameState.score.p2 === winningScore) {
        console.log("P2 wins");
        // Display win screen + back to home
      }
    };
  }, [state.gameState.score.p2]);

  const setupPlayerKeybinds = () => {
    // TODO: Handle hold down?
    // Lags a little, might need to set up to calculate pos and handle every 30/60fps state rerender

    document.addEventListener("keyup", (e) => {
      if (!isGameActiveRef.current) return;

      // Limits
      // y1 = top of screen, y2 = bottom of screen
      const [y1, y2] = [yCenter - halfHeight + (paddleHeight - 1) / 2 + 1, yCenter + halfHeight - (paddleHeight - 1) / 2 - 1];
      
      switch(e.code) {
        // P1
        case "KeyW":
          if (p1PaddleCenterRef.current !== y1) {
            setP1PaddleCenter(p1PaddleCenterRef.current - 1);
            p1PaddleCenterRef.current--;
            movePaddle(1, p1PaddleCenterRef.current, -1);
          }
          break;
        case "KeyS":
          if (p1PaddleCenterRef.current !== y2) {
            setP1PaddleCenter(p1PaddleCenterRef.current + 1);
            p1PaddleCenterRef.current++;
            movePaddle(1, p1PaddleCenterRef.current, 1);
          }
          break;
        // P2
        case "ArrowUp":
          if (p2PaddleCenterRef.current !== y1) {
            setP2PaddleCenter(p2PaddleCenterRef.current - 1);
            p2PaddleCenterRef.current--;
            movePaddle(2, p2PaddleCenterRef.current, -1);
          }
          break;
        case "ArrowDown":
          if (p2PaddleCenterRef.current !== y2) {
            setP2PaddleCenter(p2PaddleCenterRef.current + 1);
            p2PaddleCenterRef.current++;
            movePaddle(2, p2PaddleCenterRef.current, 1);
          }
          break;
        default:
          break;
      }
    });
  };

  const paddleHeight = 3;

  const setupPaddles = () => {
    // TODO: Add "bounce" property, also to walls

    // P1 Paddle
    // x = xCenter - halfWidth + 1
    const p1PaddleX = xCenter - halfWidth + 1;
    setTile(p1PaddleX, yCenter - (paddleHeight - 1) / 2, "█", { active: true })
    setTile(p1PaddleX, yCenter, "█", { active: true })
    setTile(p1PaddleX, yCenter + (paddleHeight - 1) / 2, "█", { active: true })
    setP1PaddleCenter(yCenter);
    p1PaddleCenterRef.current = yCenter;

    // P2 Paddle
    // x = xCenter + halfWidth - 1
    const p2PaddleX = xCenter + halfWidth - 1;
    setTile(p2PaddleX, yCenter - (paddleHeight - 1) / 2, "█", { active: true })
    setTile(p2PaddleX, yCenter, "█", { active: true })
    setTile(p2PaddleX, yCenter + (paddleHeight - 1) / 2, "█", { active: true })
    setP2PaddleCenter(yCenter);
    p2PaddleCenterRef.current = yCenter;
  }

  const movePaddle = (player, currPos, direction) => {
    const paddleX = player === 1 ? xCenter - halfWidth + 1 : xCenter + halfWidth - 1;

    if (direction === -1) {
      // Up
      setTile(paddleX, currPos + 2, getRandomAsciiChar(), { active: false });
      setTile(paddleX, currPos - 1, "█", { active: true });
    } else {
      // Down
      setTile(paddleX, currPos - 2, getRandomAsciiChar(), { active: false });
      setTile(paddleX, currPos + 1, "█", { active: true });
    }
  }

  // console.log(state);

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
