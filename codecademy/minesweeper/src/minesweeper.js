const generatePlayerBoard = (numOfRows, numOfColumns) => {
  const board = [];

  for (let rowIndex = 0; rowIndex < numOfRows; rowIndex++) {
    const row = [];
    for (let columnIndex = 0; columnIndex < numOfColumns; columnIndex++) {
      row.push(' ');
    }
    board.push(row);
  }
  return board;
};

const generateBombBoard = (numOfRows, numOfColumns, numOfBombs) => {
  const board = [];

  for (let rowIndex = 0; rowIndex < numOfRows; rowIndex++) {
    const row = [];
    for (let columnIndex = 0; columnIndex < numOfColumns; columnIndex++) {
      row.push(null);
    }
    board.push(row);
  }

  let numberOfBombsPlaced = 0;

  while (numberOfBombsPlaced < numOfBombs) {
    const randomRowIndex = Math.floor(Math.random() * numOfRows);
    const randomColumnIndex = Math.floor(Math.random() * numOfColumns);
    if (board[randomRowIndex][randomColumnIndex] !== 'B') {
      board[randomRowIndex][randomColumnIndex] = 'B';
      numberOfBombsPlaced++;
    }
  }

  return board;
};

const getNumOfNeighborBombs = (bombBoard, rowIndex, columnIndex) => {
    const neighborOffsets = [
        [-1, -1],
        [-1, 0],
        [-1, 1],
        [0, -1],
        [0, 1],
        [1, -1],
        [1, 0],
        [1, 1]
    ];

    const numOfRows = bombBoard.length;
    const numOfColumns = bombBoard[0].length;
    
    let numOfBombs = 0;

    neighborOffsets.forEach(offset => {
    const neighborRowIndex = rowIndex + offset[0];
    const neighborColumnIndex = columnIndex + offset[1];
    if(neighborRowIndex >= 0 && neighborRowIndex < numOfRows &&
        neighborColumnIndex >= 0 && neighborColumnIndex < numOfColumns){
        if(bombBoard[neighborRowIndex][neighborColumnIndex] === 'B'){
            numOfBombs++;
        }
    }
    });
    return numOfBombs;
};

const flipTile =(playerBoard, bombBoard, rowIndex, columnIndex) => {
    if(playerBoard[rowIndex][columnIndex] !== ' '){
        console.log('Already flipped that tile!');
        return;
    }else if(bombBoard[rowIndex][columnIndex] ==='B'){
        playerBoard[rowIndex][columnIndex] = 'B';
    }else{
        playerBoard[rowIndex][columnIndex] = getNumOfNeighborBombs(bombBoard, rowIndex, columnIndex);
    }
};

const printBoard = board => {
    console.log(board.map(row => row.join(' | ')).join('\n'));
};

let playerBoard = generatePlayerBoard(3, 3);
let bombBoard = generateBombBoard(3, 3, 3);
printBoard(playerBoard);
printBoard(bombBoard);
flipTile(playerBoard, bombBoard, 0, 0);
printBoard(playerBoard);

