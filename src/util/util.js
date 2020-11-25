export const getRandomAsciiChar = () => {
  // 33 to 165
  // NOT 127
  const validNums = [];
  // Kinda normal chars
  for (let i = 33; i <= 255; i++) {
    if (i < 127 || i > 160) {
      validNums.push(i);
    }
  }

  const randIdx = Math.round(Math.random() * validNums.length);
  const randNum = validNums[randIdx]
  return String.fromCharCode(randNum);
}

export const getAllAsciiChar = () => {
  const validNums = [];
  for (let i = 33; i <= 255; i++) {
    if (i < 127 || i > 160) {
      validNums.push(i);
    }
  }

  return validNums.map((code) => String.fromCharCode(code));
}



export const getLanding = (docHeight, docWidth) => {
  const landingChar = `
    <section>----------------------------
    |                                   |
    |                                   |
    |        <h1>ASCII Pong</h1>        |
    |                                   |
    |                                   |
    |                                   |
    |  <option>------   <option>------  |
    |  |     1P     |   |     2P     |  |
    |  -----</option>   -----</option>  |
    |                                   |
    |                                   |
    |        <button>-----------        |
    |        |      Start      |        |
    |        ----------</button>        |
    |                                   |
    |                                   |
    |                                   |
    ---------------------------</section>`;

  let landingLines = landingChar
    .split("\n")
    .filter((line) => line !== "")
    .map((line) => line.trim());

  let formattedLines = [];
  
  // Assign char to matrix
  for(let y = 0; y < landingLines.length; y++) {
    const row = [];

    for(let x = 0; x < landingLines[0].length; x++) {
      row.push({ char: landingLines[y][x] });
    };

    formattedLines.push(row);
  }

  // Assign property to char in matrix, e.g. hover animation/bold
  
  return formattedLines;
}

// Imitate 7 Segment display
const displayNumArr = [
`
 ███ 
█   █
█   █
█   █
 ███ `,
`
    █
    █
    █
    █
    █`,
`
█████
    █
█████
█    
█████`,
`
█████
    █
█████
    █
█████`,
`
█   █
█   █
█████
    █
    █`,
`
█████
█    
█████
    █
█████`,
`
█████
█    
█████
█   █
█████`,
`
█████
    █
    █
    █
    █`,
`
█████
█   █
█████
█   █
█████`,
`
█████
█   █
█████
    █
█████`
];

export const getDisplayNumMatrix = (num) => {
  // Can't be greater than 7 (score limit)
  // so this method works
  return displayNumArr[num].split("\n").filter((el) => el !== "").map((str) => str.split("")); 
}

export const getWinningBoard = (winner) => {
  const displayWinner = `P${winner}`;
  const winningChars = `
    <section>------------------------------------------
    |                                                 |
    |                                                 |
    |        <h1>Congratulations, ${displayWinner} won!</h1>        |
    |                                                 |
    |                                                 |
    |                                                 |
    |                                                 |
    |            <button>----------------             |
    |            |      Main Menu       |             |
    |            ---------------</button>             |
    |                                                 |
    |                                                 |
    |                                                 |
    -----------------------------------------</section>`

  let winningLines = winningChars
    .split("\n")
    .filter((line) => line !== "")
    .map((line) => line.trim());

  let formattedWinningLines = [];
  
  // Assign char to matrix
  for(let y = 0; y < winningLines.length; y++) {
    const row = [];

    for(let x = 0; x < winningLines[0].length; x++) {
      row.push({ char: winningLines[y][x] });
    };

    formattedWinningLines.push(row);
  }

  return formattedWinningLines;
}

export const getDisclaimer = () => {
  // 90 x 24
  const disclaimerStr = `
    <footer>-----------------------------------------------------------------------------------
    | <h2>Controls & Disclaimer</h2>                                                          |
    | <p>                                                                                     |
    |    P1 uses W & S, P2 uses ↑ & ↓. Winning score is 7. Game is not designed for small     |
    |    screens. Game performance may suffer on low spec systems. Batteries not included.    |
    | </p>                                                                                    |
    ----------------------------------------------------------------------------------</footer>`;

  let disclaimerLines = disclaimerStr
    .split("\n")
    .filter((line) => line !== "")
    .map((line) => line.trim());

  let formattedDisclaimerLines = [];
  
  // Assign char to matrix
  for(let y = 0; y < disclaimerLines.length; y++) {
    const row = [];

    for(let x = 0; x < disclaimerLines[0].length; x++) {
      row.push({ char: disclaimerLines[y][x] });
    };

    formattedDisclaimerLines.push(row);
  }

  return formattedDisclaimerLines;
}
  
window.getLanding = getLanding;
window.getNum = getDisplayNumMatrix;
window.getWin = getWinningBoard;
window.disclaimer = getDisclaimer;
// Useful:
/*
  Full Block: 9608
  Smol block: 9642
  Left Triangle: 9664
  Triangles: 9698, 9699, 9700, 9701
  Circle: 9679
*/