import React, { useEffect, useReducer, useRef, useState } from 'react';
import { getAllAsciiChar, getDisclaimer, getDisplayNumMatrix, getLanding, getRandomAsciiChar, getWinningBoard, getColorThemeToggle } from '../util/util';
import CenterTile from './CenterTile';
import CharTile from './CharTile';
import HorizontalWall from './HorizontalWall';
import VerticalWall from './VerticalWall';

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
  players: 1,
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

  const numPlayersRef = useRef(1);

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
  const appRef = useRef();

  const [tileHeight, tileWidth] = [19, 9];

  // Size of box = 19px 9px
  let numXTiles = Math.floor(document.body.clientWidth / tileWidth);
  let numYTiles = Math.floor(document.body.clientHeight / tileHeight);

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

    // setupColorThemeToggle();

    setupDisclaimer();

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

          // Default 1P
          if (
            (y === 7 && (x >= 3 && x <= 16)) ||
            (y === 8 && [3, 9, 10, 16].includes(x)) ||
            (y === 9 && (x >= 3 && x <= 16))
          ) {
            properties.selected = true;
          };
          
          // // Default 2P
          // if (
          //   (y === 7 && (x >= 20 && x <= 33)) ||
          //   (y === 8 && [20, 26, 27, 33].includes(x)) ||
          //   (y === 9 && (x >= 20 && x <= 33))
          // ) {
          //   properties.selected = true;
          // };
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
    numPlayersRef.current = num;
    setPlayers(offsetX, offsetY, num);
  };

  const startGameCallback = () => {
    clearLanding();
    setIsGameActive(true);
    isGameActiveRef.current = true;
    setupGameArea();
  }

  const clearLanding = () => {
    const landingMatrix = getLanding();
    const offsetX = ((numXTiles - 1) / 2) - ((landingMatrix[0].length - 1) / 2);
    const offsetY = ((numYTiles - 1) / 2) - ((landingMatrix.length - 1) / 2);
    
    for (let y = 0; y < landingMatrix.length; y++) {
      for (let x = 0; x < landingMatrix[0].length; x++) {
        const currEl = landingMatrix[y][x].char;
        if (currEl !== " ") {
          const randChar = getRandomAsciiChar();
          setTile(x + offsetX, y + offsetY, randChar, { active: false, handleClick: undefined });
        };
        setClickHandler(x + offsetX, y + offsetY, undefined);
      };
    };
  };
  
  const xCenter = (numXTiles - 1) / 2;
  const yCenter = (numYTiles - 1) / 2;

  const halfWidth = 45;
  const halfHeight = 12;
  const ballSpeed = 2;

  const setupGameArea = () => {
    setupGameBounds();
    setupScoreBoard();
    setupPaddles();
    moveBallToPos({ x: xCenter, y: yCenter });

    // Blistering fast 5 fps
    gameTickRef.current = setInterval(() => {
      if (isGameActiveRef.current) {
        handleBallGameTick();
        handlePaddlesGameTick();
      }
    }, 1000 / 5);
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
        }
      }
    };
  };

  const topOfGameBound = yCenter - halfHeight;
  const yOffset = topOfGameBound - 2;
  const xOffsetLeft = xCenter - (2 + 5);
  const xOffsetRight = xCenter + (2 + 1);

  const setupScoreBoard = () => {
    const [y1, y2] = [yOffset - 4, yOffset];
    // const [y1, y2] = [topOfGameBound - 1, topOfGameBound - 5];
    const zero = getDisplayNumMatrix(0);
    // Left bounds
    for (let y = 0; y < 5; y++) {
      for (let x = 0; x < 5; x++) {
        const currChar = zero[y][x];
        if (currChar !== " ") {
          setTile(x + xOffsetLeft, y + yOffset - 4, currChar, { active: true });
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
          setTile(x + xOffsetRight, y + yOffset - 4, currChar, { active: true });
        }
      }
    }
  }

  const winningScore = 7;

  // Not the most elegant solution to split them up

  useEffect(() => {
    if (state.gameState.score.p1 === 0) return;
    
    if (state.gameState.score.p1 <= winningScore) {
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
              setTile(x + xOffsetLeft, y + yOffset - 4, getRandomAsciiChar(), { active: false })
            } else {
              setTile(x + xOffsetLeft, y + yOffset - 4, currChar, { active: true })
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
              setTile(x + xOffsetRight, y + yOffset - 4, getRandomAsciiChar(), { active: false })
            } else {
              setTile(x + xOffsetRight, y + yOffset - 4, currChar, { active: true })
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

    // P2 Paddle
    // x = xCenter + halfWidth - 1
    const p2PaddleX = xCenter + halfWidth - 1;
    setTile(p2PaddleX, yCenter - (paddleHeight - 1) / 2, "█", { active: true })
    setTile(p2PaddleX, yCenter, "█", { active: true })
    setTile(p2PaddleX, yCenter + (paddleHeight - 1) / 2, "█", { active: true })
    setP2PaddleCenter(yCenter);
  }

  const movePaddleTo = (player) => {
    const paddleX = player === 1 ? xCenter - halfWidth + 1 : xCenter + halfWidth - 1;

    if (player === 1) {
      const outOfBounds = paddle1YDiffRef.current >= halfHeight - 1 || paddle1YDiffRef.current <= -halfHeight + 1;
      if (outOfBounds) {
        paddle1YDiffRef.current = paddle1PrevYRef.current;
      } else {
        const needsUpdate = paddle1PrevYRef.current !== paddle1YDiffRef.current;
  
        if (needsUpdate) {
          const [from, to] = [yCenter + paddle1PrevYRef.current, yCenter + paddle1YDiffRef.current];
  
          setTile(paddleX, from - 1, getRandomAsciiChar(), { active: false, isPaddle: false });
          setTile(paddleX, from, getRandomAsciiChar(), { active: false, isPaddle: false });
          setTile(paddleX, from + 1, getRandomAsciiChar(), { active: false, isPaddle: false });
          
          setTile(paddleX, to - 1, "█", { active: true, isPaddle: true });
          setTile(paddleX, to, "█", { active: true, isPaddle: true });
          setTile(paddleX, to + 1, "█", { active: true, isPaddle: true });
  
          paddle1PrevYRef.current = paddle1YDiffRef.current;
        }
      }
    } else if (player === 2) {
      const outOfBounds = paddle2YDiffRef.current >= halfHeight - 1 || paddle2YDiffRef.current <= -halfHeight + 1;
      
      if (outOfBounds) {
        paddle2YDiffRef.current = paddle2PrevYRef.current;
      } else {
        const needsUpdate = paddle2PrevYRef.current !== paddle2YDiffRef.current;

        if (needsUpdate) {
          const [from, to] = [yCenter + paddle2PrevYRef.current, yCenter + paddle2YDiffRef.current];

          setTile(paddleX, from - 1, getRandomAsciiChar(), { active: false, isPaddle: false });
          setTile(paddleX, from, getRandomAsciiChar(), { active: false, isPaddle: false });
          setTile(paddleX, from + 1, getRandomAsciiChar(), { active: false, isPaddle: false });
          
          setTile(paddleX, to - 1, "█", { active: true, isPaddle: true });
          setTile(paddleX, to, "█", { active: true, isPaddle: true });
          setTile(paddleX, to + 1, "█", { active: true, isPaddle: true });

          paddle2PrevYRef.current = paddle2YDiffRef.current;
        }
      }
    }
  }

  const moveBallToPos = ({ x, y }) => {
    let clearProperties = {
      active: false,
      isBall: false
    };
    let ballProperties = {
      active: true,
      isBall: true
    }
    setTile(Math.round(ballPositionRef.current.x), Math.round(ballPositionRef.current.y), getRandomAsciiChar(), clearProperties);
    if (isGameActiveRef.current) {
      setBallPosition({ x, y });
      ballPositionRef.current = { x, y };
      setTile(Math.round(x), Math.round(y), "●", ballProperties);
    }
  }
  
  const handleBallGameTick = () => {
    // Direction should be unit vector, the multiply by speed
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
    const [p1PaddleCenter, p2PaddleCenter] = [yCenter + paddle1YDiffRef.current, yCenter + paddle2YDiffRef.current];
      
    if (
      (Math.round(nextX) <= x1 && (Math.round(nextY) <= p1PaddleCenter + 1 + tempHitboxFix && Math.round(nextY) >= p1PaddleCenter - 1 - tempHitboxFix))
      ||
      (Math.round(nextX) >= x2 && (Math.round(nextY) <= p2PaddleCenter + 1 + tempHitboxFix && Math.round(nextY) >= p2PaddleCenter - 1 - tempHitboxFix))
    ) {
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
        const resetBallDirection = getRandomUnitDirectionVector();
        setBallDirection(resetBallDirection);
        ballDirectionRef.current = resetBallDirection;
        if (Math.round(nextX) >= xCenter + halfWidth) {
          incrementScore(1);
        } else {
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
    if (numPlayersRef.current === 2) {
      // P2
      if (keyDownRef.current.ArrowUp) {
        paddle2YDiffRef.current--;
      } else if (keyDownRef.current.ArrowDown) {
        paddle2YDiffRef.current++;
      }
      movePaddleTo(2)
    } else {
      // Track ball certain % of the time, rest of the time is random
      const toBall = Math.random() < 0.85;

      if (toBall) {
        // Calculate what diff to get to ball
        // TODO: Check limits
        if (ballPositionRef.current.y > yCenter + paddle2PrevYRef.current) {
          paddle2YDiffRef.current++;
        } else if (ballPositionRef.current.y < yCenter + paddle2PrevYRef.current) {
          paddle2YDiffRef.current--;
        }
      } else {
        // Weighted to not move to help with performance
        const randDir = (Math.random() * 2) - 1;
        if (randDir > 0.75) {
          paddle2YDiffRef.current--;
        } else if (randDir < -0.75) {
          paddle2YDiffRef.current++;
        }
      }
      movePaddleTo(2);
    }
  };

  const showWinningScreen = (winner) => {
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
        };
      };
    };

    setupMainMenuClickHandler();
  }

  const resetGameToLanding = () => {
    clearWinningScreen();
    clearGameBounds();
    clearScore();
    resetScores();
    clearPaddles();
    setupLanding();
  }

  const setupMainMenuClickHandler = () => {
    // y + 1 to y + 3
    // x from 13 to 36
    for (let y = yCenter + 1; y <= yCenter + 3; y++) {
      // It's not perfect :(
      for (let x = xCenter - 12; x <= xCenter + 11; x++) {
        setClickHandler(x, y, resetGameToLanding);
      }
    }
  }

  const clearWinningScreen = () => {
    const winningMatrix = getWinningBoard(1);
    const offsetX = ((numXTiles - 1) / 2) - ((winningMatrix[0].length - 1) / 2);
    const offsetY = ((numYTiles - 1) / 2) - ((winningMatrix.length - 1) / 2);

    for (let y = 0; y < winningMatrix.length; y++) {
      for (let x = 0; x < winningMatrix[0].length; x++) {
        const currEl = winningMatrix[y][x].char;
        if (currEl !== " ") {
          let properties = {
            active: false,
            handleClick: undefined,
          };

          setTile(x + offsetX, y + offsetY, getRandomAsciiChar(), properties);
        }
      };
    };
  }

  const clearGameBounds = () => {
    const [x1, x2] = [xCenter - halfWidth, xCenter + halfWidth];
    const [y1, y2] = [yCenter - halfHeight, yCenter + halfHeight];

    for (let y = y1; y <= y2; y++) {
      for (let x = x1; x <= x2; x++) {
        if (y === y1 || y === y2) {
          setTile(x, y, getRandomAsciiChar(), { active: false })
        } else if (x === x1 || x === x2) {
          setTile(x, y, getRandomAsciiChar(), { active: false });
        };
      }
    };
  };

  const clearScore = () => {
    const [y1, y2] = [yOffset - 4, yOffset];

    // Left bound
    const leftScore = state.gameState.score.p1;
    const leftScoreMatrix = getDisplayNumMatrix(leftScore);
    for (let y = 0; y < 5; y++) {
      for (let x = 0; x < 5; x++) {
        const currChar = leftScoreMatrix[y][x];
        if (currChar !== " ") {
          setTile(x + xOffsetLeft, y + yOffset - 4, getRandomAsciiChar(), { active: false });
        }
      }
    }
    
    // Middle bounds
    setTile(xCenter, y1 + 1, getRandomAsciiChar(), { active: false });
    setTile(xCenter, y2 - 1, getRandomAsciiChar(), { active: false });
    
    // Right bound
    const rightScore = state.gameState.score.p2;
    const rightScoreMatrix = getDisplayNumMatrix(rightScore);
    for (let y = 0; y < 5; y++) {
      for (let x = 0; x < 5; x++) {
        const currChar = rightScoreMatrix[y][x];
        if (currChar !== " ") {
          setTile(x + xOffsetRight, y + yOffset - 4, getRandomAsciiChar(), { active: false });
        }
      }
    }
  };

  const clearPaddles = () => {
    const paddle1X = xCenter - halfWidth + 1;
    const p1Center = yCenter + paddle1YDiffRef.current;
    setTile(paddle1X, p1Center - 1, getRandomAsciiChar(), { active: false });
    setTile(paddle1X, p1Center, getRandomAsciiChar(), { active: false });
    setTile(paddle1X, p1Center + 1, getRandomAsciiChar(), { active: false });
    
    const paddle2X = xCenter + halfWidth - 1;
    const p2Center = yCenter + paddle2YDiffRef.current;
    setTile(paddle2X, p2Center - 1, getRandomAsciiChar(), { active: false });
    setTile(paddle2X, p2Center, getRandomAsciiChar(), { active: false });
    setTile(paddle2X, p2Center + 1, getRandomAsciiChar(), { active: false });
  }

  // const setupColorThemeToggle = () => {
  //   const colorThemeMatrix = getColorThemeToggle();
  //   for (let y = 0; y < colorThemeMatrix.length; y++) {
  //     for (let x = 0; x < colorThemeMatrix[0].length; x++) {
  //       const currEl = colorThemeMatrix[y][x].char;
  //       if (currEl !== " ") {
  //         let properties = {
  //           active: true
  //         };

  //         // 4 <= y <= 6
  //         // 2 <= x <= 15, 17 <= x <= 30
  //         // x !== 9, x !== 24

  //         // Default White
  //         if (
  //           (y === 4 && (x >= 2 && x <= 15)) ||
  //           (y === 5 && (x >= 2 && x <= 15)) ||
  //           (y === 6 && (x >= 2 && x <= 15))
  //         ) {
  //           properties.selected = true;
  //           properties.handleClick = () => toggleColor('white');
  //         };
          
  //         // Default Matrix
  //         if (
  //           (y === 4 && (x >= 17 && x <= 30)) ||
  //           (y === 5 && (x >= 17 && x <= 30)) ||
  //           (y === 6 && (x >= 17 && x <= 30))
  //         ) {
  //           // properties.selected = true;
  //           properties.handleClick = () => toggleColor('green');
  //         };

  //         setTile(numXTiles - colorThemeMatrix[0].length + x - 1, y + 1, currEl, properties);
  //       } else {
  //         if (
  //           (y === 4 && (x >= 2 && x <= 15)) ||
  //           (y === 5 && (x >= 2 && x <= 15)) ||
  //           (y === 6 && (x >= 2 && x <= 15))
  //         ) {
  //           setClickHandler(numXTiles - colorThemeMatrix[0].length + x - 1, y + 1, () => toggleColor('white'));
  //         };
          
  //         // Default Matrix
  //         if (
  //           (y === 4 && (x >= 17 && x <= 30)) ||
  //           (y === 5 && (x >= 17 && x <= 30)) ||
  //           (y === 6 && (x >= 17 && x <= 30))
  //         ) {
  //           setClickHandler(numXTiles - colorThemeMatrix[0].length + x - 1, y + 1, () => toggleColor('green'));
  //         }
  //       }
  //     };
  //   };
  // }

  // // Not the most efficient way
  // Actually it just doesn't work
  // const toggleColor = (color) => {
  //   const colorThemeMatrix = getColorThemeToggle();
  //   console.log(document.documentElement.style);
  //   // This is so inefficient
  //   const els = [
  //     ...document.querySelectorAll(".app"),
  //     ...document.querySelectorAll(".center-line"),
  //     ...document.querySelectorAll(".char-tile"),
  //     ...document.querySelectorAll(".char-tile.active")
  //   ]

  //   if (color === 'green') {
  //     for (let y = 4; y <= 6; y++) {
  //       for (let x = 2; x <= 30; x++) {
  //         const currEl = colorThemeMatrix[y][x].char;
  //         if (
  //           (y === 4 && (x >= 2 && x <= 15)) ||
  //           (y === 5 && x !== 9 && (x >= 2 && x <= 15)) ||
  //           (y === 6 && (x >= 2 && x <= 15))
  //         ) {
  //           setTile(numXTiles - colorThemeMatrix[0].length + x - 1, y + 1, currEl, { active: true, selected: false, handleClick: () => toggleColor('white')});
  //         };

  //         if (
  //           (y === 4 && (x >= 17 && x <= 30)) ||
  //           (y === 5 && x !== 24 && (x >= 17 && x <= 30)) ||
  //           (y === 6 && (x >= 17 && x <= 30))
  //         ) {
  //           setTile(numXTiles - colorThemeMatrix[0].length + x - 1, y + 1, currEl, { active: true, selected: true, handleClick: () => toggleColor('green') });
  //         };
  //       }
  //     }
  //     els.forEach((el) => {
  //       if (!el.classList.contains("matrix")) {
  //         el.classList.add("matrix");
  //       }
  //     });
  //   } else {
  //     for (let y = 4; y <= 6; y++) {
  //       for (let x = 2; x <= 30; x++) {
  //         const currEl = colorThemeMatrix[y][x].char;
  //         if (
  //           (y === 4 && (x >= 2 && x <= 15)) ||
  //           (y === 5 && x !== 9 && (x >= 2 && x <= 15)) ||
  //           (y === 6 && (x >= 2 && x <= 15))
  //         ) {
  //           setTile(numXTiles - colorThemeMatrix[0].length + x - 1, y + 1, currEl, { active: true, selected: true, handleClick: () => toggleColor('white') });
  //         };

  //         if (
  //           (y === 4 && (x >= 17 && x <= 30)) ||
  //           (y === 5 && x !== 24 && (x >= 17 && x <= 30)) ||
  //           (y === 6 && (x >= 17 && x <= 30))
  //         ) {
  //           setTile(numXTiles - colorThemeMatrix[0].length + x - 1, y + 1, currEl, { active: true, selected: false, handleClick: () => toggleColor('green') });
  //         };
  //       }
  //     }
  //     els.forEach((el) => {
  //       if (!el.classList.contains("matrix")) {
  //         el.classList.remove("matrix");
  //       }
  //     });
  //   }
  // }

  let centerTileComponent;
  let leftWall, rightWall, topWall, bottomWall;

  // if (isGameActive) {
  //   const numTiles = 2 * halfHeight - 1;

  //   let centerTiles = [];
  //   for (let i = 0; i < numTiles; i++) {
  //     centerTiles.push(<CenterTile />);
  //   }

  //   // Magic numbers OP these are way off of the big screen lmao
  //   centerTileComponent = (
  //     <div className="center-line" style={{ top: (yCenter - halfHeight + 1) * 19, left: xCenter * 9}}>
  //       {centerTiles.map((tile, idx) => {
  //         return (
  //           <div className="center-tile" key={`center-${idx}`}>
  //             { tile }
  //           </div>
  //         )
  //       })}
  //     </div>
  //   )
    
  //   // I give up on this
  //   leftWall = <VerticalWall style={{ top: (yCenter - halfHeight) * 19, left: (xCenter - halfWidth + 0.4) * 9}}/>
  //   rightWall = <VerticalWall style={{ top: (yCenter - halfHeight) * 19, left: (xCenter + halfWidth + 0.4) * 9}}/>
  //   topWall = <HorizontalWall style={{ top: (yCenter - halfHeight + 2) * 19 - 30.5, left: (xCenter - halfWidth) * 9 + 1}}/>
  //   bottomWall = <HorizontalWall style={{ top: (yCenter + halfHeight - 2) * 19 + 45.5, left: (xCenter - halfWidth) * 9 + 1}}/>
  // };

  const setupDisclaimer = () => {
    const disclaimerMatrix = getDisclaimer();

    const offsetX = ((numXTiles - 1) / 2) - ((disclaimerMatrix[0].length - 1) / 2);
    const offsetY = ((numYTiles - 1)) - ((disclaimerMatrix.length - 1));
    
    for (let y = 0; y < disclaimerMatrix.length; y++) {
      for (let x = 0; x < disclaimerMatrix[0].length; x++) {
        const currEl = disclaimerMatrix[y][x].char;
        if (currEl !== " ") {
          let properties = {
            active: true
          };

          setTile(x + offsetX, y + offsetY, currEl, properties);
        };
      };
    };
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
                    isPaddle={tile.properties.isPaddle}
                  />
                )
              })}
            </li>
          )
        })}
      </ul>
      {centerTileComponent}
      {leftWall}
      {rightWall}
      {topWall}
      {bottomWall}
    </div>
  );
}

export default App;
