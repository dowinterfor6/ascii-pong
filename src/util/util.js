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
  
window.getLanding = getLanding;
window.getNum = getDisplayNumMatrix;
// Useful:
/*
  Full Block: 9608
  Smol block: 9642
  Left Triangle: 9664
  Triangles: 9698, 9699, 9700, 9701
  Circle: 9679
*/