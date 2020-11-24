import React, { useEffect, useReducer, useRef, useState } from 'react';
import { getAllAsciiChar, getDisplayNumMatrix, getLanding, getRandomAsciiChar, getWinningBoard } from '../util/util';
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
    winner: undefined,
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

  const [isGameActive, setIsGameActive] = useState(false);
  const isGameActiveRef = useRef(isGameActive);

  // TODO: I forgot if these are actually being used
  const p1PaddleCenterRef = useRef(p1PaddleCenter);
  const p2PaddleCenterRef = useRef(p2PaddleCenter);

  const xDirThreshold = 0.5;

  const getRandomUnitDirectionVector = () => {
    // X can't be less than something;
    const x = Math.random() * (1 - xDirThreshold) + xDirThreshold;
    const y = Math.random();
    const xCoeff = Math.round(Math.random()) === 0 ? -1 : 1;
    const yCoeff = Math.round(Math.random()) === 0 ? -1 : 1;
    const magnitude = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
    return { x: xCoeff * x / magnitude, y: yCoeff * y / magnitude };
  }

  // TODO: ensure never up or down
  const [ballDirection, setBallDirection] = useState(getRandomUnitDirectionVector());

  const [ballPosition, setBallPosition] = useState({ x: 0, y: 0 });
  const ballDirectionRef = useRef(ballDirection);
  const ballPositionRef = useRef(ballPosition);

  const paddle1YDiffRef = useRef(0);
  const paddle2YDiffRef = useRef(0);

  const paddle1PrevYRef = useRef(0);
  const paddle2PrevYRef = useRef(0);

  const gameTickRef = useRef();
  
  const validKeys = ["KeyW", "KeyS", "ArrowUp", "ArrowDown"];

  const keyDownRef = useRef({
    "KeyW": false,
    "KeyS": false,
    "ArrowUp": false,
    "ArrowDown": false
  });

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
  // Font Height: 14px, Width: 6.61px;
  const appRef = useRef();

  const [tileHeight, tileWidth] = [19, 9];
  // const [tileHeight, tileWidth] = [14, 6.61];

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
    console.log("CLEAR LANDING");
    const landingMatrix = getLanding();
    const offsetX = ((numXTiles - 1) / 2) - ((landingMatrix[0].length - 1) / 2);
    const offsetY = ((numYTiles - 1) / 2) - ((landingMatrix.length - 1) / 2);
    
    for (let y = 0; y < landingMatrix.length; y++) {
      for (let x = 0; x < landingMatrix[0].length; x++) {
        const currEl = landingMatrix[y][x].char;
        if (currEl !== " ") {
          const randChar = getRandomAsciiChar();
          setTile(x + offsetX, y + offsetY, randChar, { active: false, clickable: false, handleClick: undefined });
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
  const ballSpeed = 10;

  const setupGameArea = () => {
    console.log("SETUP GAME AREA");
    setupGameBounds();
    setupScoreBoard();
    setupPaddles();
    moveBallToPos({ x: xCenter, y: yCenter });
    // set interval to update game physics
    // TODO: Remember to clear interval when game finishes
    gameTickRef.current = setInterval(() => {
      if (isGameActiveRef.current) {
        handleBallGameTick();
        handlePaddlesGameTick();
      }
    }, 1000 / 10);
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
          // gave up after ~1 min of effort
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
        setIsGameActive(false);
        isGameActiveRef.current = false;
        clearInterval(gameTickRef.current);
        showWinningScreen(1);
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
        setIsGameActive(false);
        isGameActiveRef.current = false;
        clearInterval(gameTickRef.current);
        showWinningScreen(2);
      }
    };
  }, [state.gameState.score.p2]);

  const setupPlayerKeybinds = () => {
    // TODO: Handle hold down?
    // Make this a part of game tick to check performance
    // Lags a little, might need to set up to calculate pos and handle every 30/60fps state rerender
    // TODO: Handle both key press
    
    document.addEventListener("keyup", (e) => {
      if (!isGameActiveRef.current) return;

      if (validKeys.includes(e.code)) {
        keyDownRef.current[e.code] = false;
      }
    });

    document.addEventListener("keydown", (e) => {
      if (!isGameActiveRef.current) return;

      if (validKeys.includes(e.code)) {
        switch(e.code) {
          case "KeyW":
            keyDownRef.current.KeyW = true;
            keyDownRef.current.KeyS = false;
            break;
          case "KeyS":
            keyDownRef.current.KeyW = false;
            keyDownRef.current.KeyS = true;
            break;
          case "ArrowUp":
            keyDownRef.current.ArrowUp = true;
            keyDownRef.current.ArrowDown = false;
            break;
          case "ArrowDown":
            keyDownRef.current.ArrowUp = false;
            keyDownRef.current.ArrowDown = true;
            break;
          default:
            break;
        }
      }
    });
  };

  const paddleHeight = 3;

  const setupPaddles = () => {

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

  // TODO: Refactor this to handle both player check instead of using game tick method
  const movePaddleTo = (player) => {
    const paddleX = player === 1 ? xCenter - halfWidth + 1 : xCenter + halfWidth - 1;
    // TODO: Doing this one lazily, remove all, add all, hope it doesn't bite back

    if (player === 1) {
      const needsUpdate = paddle1PrevYRef.current !== paddle1YDiffRef.current;

      if (needsUpdate) {
        const [from, to] = [yCenter + paddle1PrevYRef.current, yCenter + paddle1YDiffRef.current];

        setTile(paddleX, from - 1, getRandomAsciiChar(), { active: false });
        setTile(paddleX, from, getRandomAsciiChar(), { active: false });
        setTile(paddleX, from + 1, getRandomAsciiChar(), { active: false });
        
        setTile(paddleX, to - 1, "█", { active: true });
        setTile(paddleX, to, "█", { active: true });
        setTile(paddleX, to + 1, "█", { active: true });

        paddle1PrevYRef.current = paddle1YDiffRef.current;
      }
    } else if (player === 2) {
      const needsUpdate = paddle2PrevYRef.current !== paddle2YDiffRef.current;

      if (needsUpdate) {
        const [from, to] = [yCenter + paddle2PrevYRef.current, yCenter + paddle2YDiffRef.current];

        setTile(paddleX, from - 1, getRandomAsciiChar(), { active: false });
        setTile(paddleX, from, getRandomAsciiChar(), { active: false });
        setTile(paddleX, from + 1, getRandomAsciiChar(), { active: false });
        
        setTile(paddleX, to - 1, "█", { active: true });
        setTile(paddleX, to, "█", { active: true });
        setTile(paddleX, to + 1, "█", { active: true });

        paddle2PrevYRef.current = paddle2YDiffRef.current;
      }
    }
  }

  const moveBallToPos = ({ x, y }) => {
    // TODO: Do i actually need isBall?
    setTile(Math.round(ballPositionRef.current.x), Math.round(ballPositionRef.current.y), getRandomAsciiChar(), { active: false, isBall: false });
    setBallPosition({ x, y });
    ballPositionRef.current = { x, y };
    setTile(Math.round(x), Math.round(y), "●", { active: true, isBall: true });
  }
  
  const handleBallGameTick = () => {
    console.log("BALL TICK");
    // TODO: Handle the ball destroying walls lol;
    // Even after fix, it's still destroying walls rip
    // I think it might be lag? Check back if updating paddle to gametick fixes it

    // Direction should be unit vector, the multiply by speed?
    const [nextX, nextY] = [
      ballPositionRef.current.x + (ballDirectionRef.current.x * ballSpeed),
      ballPositionRef.current.y + (ballDirectionRef.current.y * ballSpeed)
    ];

    let nextPos = { x: nextX, y: nextY };

    // Paddle = bounce X
    // Hardcoded based on paddle width
    // Paddle hitbox tempfix
    const tempHitboxFix = 0.5;

    const [x1, x2] = [xCenter - halfWidth + 1, xCenter + halfWidth - 1];
    // TODO: Be careful about name overlap and scope
    const [p1PaddleCenter, p2PaddleCenter] = [yCenter + paddle1YDiffRef.current, yCenter + paddle2YDiffRef.current];
      
    if (
      (Math.round(nextX) <= x1 && (Math.round(nextY) <= p1PaddleCenter + 1 + tempHitboxFix && Math.round(nextY) >= p1PaddleCenter - 1 - tempHitboxFix))
      ||
      (Math.round(nextX) >= x2 && (Math.round(nextY) <= p2PaddleCenter + 1 + tempHitboxFix && Math.round(nextY) >= p2PaddleCenter - 1 - tempHitboxFix))
    ) {
      console.log("PADDLE");
      const paddleCenter = Math.round(nextX) <= xCenter - halfWidth + 1 ? p1PaddleCenter : p2PaddleCenter;
      const newDir = getPaddleBouncedDir(nextY, paddleCenter, -ballDirectionRef.current.x);

      nextPos.x = ballPositionRef.current.x + (newDir.x * ballSpeed);
      nextPos.y = ballPositionRef.current.y + (newDir.y * ballSpeed);
      setBallDirection(newDir);
      ballDirectionRef.current = newDir;
    } else {
       // Left/Right walls = score for opposite side
      if (Math.round(nextX) <= xCenter - halfWidth || Math.round(nextX) >= xCenter + halfWidth) {
        nextPos = { x: xCenter, y: yCenter };
        setBallPosition(nextPos);
        // TODO: Add time delay (maybe hard)
        const resetBallDirection = getRandomUnitDirectionVector();
        setBallDirection(resetBallDirection);
        ballDirectionRef.current = resetBallDirection;
        if (Math.round(nextX) >= xCenter + halfWidth) {
          console.log("RIGHT WALL");
          incrementScore(1);
        } else {
          console.log("LEFT WALL");
          incrementScore(2);
        }
      };
    }

    // Check if next pos collide
    // Up/down walls = bounce Y, keep X
    if (Math.round(nextY) <= yCenter - halfHeight || Math.round(nextY) >= yCenter + halfHeight) {
      nextPos.y = ballPositionRef.current.y + (-ballDirectionRef.current.y * ballSpeed);
      const yBounceDir = { x: ballDirectionRef.current.x, y: -ballDirectionRef.current.y };
      setBallDirection(yBounceDir);
      ballDirectionRef.current = yBounceDir;
    }

    // Check on boundary?

    moveBallToPos(nextPos);
  }

  const getPaddleBouncedDir = (ballY, paddleCenter, xDir) => {
    // I think this is still a little buggy
    // BallY - PaddleCenter / PaddleWidth/2 * PI + Offset to ensure y dir !== 0;
    const ratio = (ballY - paddleCenter) / 1.5;
    let angle = (ratio * Math.PI);

    const angleThreshold = Math.PI - 1.5;

    if (Math.abs(angle) >= angleThreshold) {
      angle = angle > 0 ? angleThreshold : -angleThreshold;
    }

    const x = xDir / Math.abs(xDir) * Math.tan(Math.abs(angle));
    const magnitude = Math.sqrt(1 + Math.pow(x, 2));

    return { y: angle / Math.abs(angle) / magnitude, x: x / magnitude };
  }

  const handlePaddlesGameTick = () => {
    // P1
    if (keyDownRef.current.KeyW) {
      paddle1YDiffRef.current--;
    } else if (keyDownRef.current.KeyS) {
      paddle1YDiffRef.current++;
    }
    movePaddleTo(1)
    // P2
    if (keyDownRef.current.ArrowUp) {
      paddle2YDiffRef.current--;
    } else if (keyDownRef.current.ArrowDown) {
      paddle2YDiffRef.current++;
    }
    movePaddleTo(2)
  };

  const showWinningScreen = (winner) => {
    setTimeout(() => {
      const winningMatrix = getWinningBoard(winner);
      const offsetX = ((numXTiles - 1) / 2) - ((winningMatrix[0].length - 1) / 2);
      const offsetY = ((numYTiles - 1) / 2) - ((winningMatrix.length - 1) / 2);
  
      for (let y = 0; y < winningMatrix.length; y++) {
        for (let x = 0; x < winningMatrix[0].length; x++) {
          const currEl = winningMatrix[y][x].char;
          if (currEl !== " ") {
            let properties = {
              active: true
            };
  
            setTile(x + offsetX, y + offsetY, currEl, properties);
          } else {
            // TODO: Not needed if i fix middle line
            if (x + offsetX === xCenter) {
              setTile(x + offsetX, y + offsetY, getRandomAsciiChar(), { active: false });
            }
          }
        };
      };
      console.log(`P${winner} won!`);
    }, 200)

    // setupClickEvents(offsetX, offsetY);
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
                    active={tile.properties.active}
                    selected={tile.properties.selected}
                    handleClick={tile.properties.handleClick}
                    key={`${xidx}-${yidx}`}
                    isBall={tile.properties.isBall}
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
