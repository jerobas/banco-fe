export const drawBoard = (
  canvas: HTMLCanvasElement,
  boardSize: number,
  centerImageUrl: string,
  cellSize: number
) => {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const boardLength = boardSize * cellSize;
  const centerSize = boardLength / 2;
  const deckSize = cellSize * 2;

  canvas.width = boardLength;
  canvas.height = boardLength;

  const drawCell = (x: number, y: number, color: string) => {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, cellSize, cellSize);
    ctx.strokeRect(x, y, cellSize, cellSize);
  };

  for (let i = 0; i < boardSize; i++) {
    drawCell(i * cellSize, 0, i % 2 === 0 ? "#ffcc00" : "#0066cc");
    drawCell(
      i * cellSize,
      boardLength - cellSize,
      i % 2 === 0 ? "#ffcc00" : "#0066cc"
    );
    if (i > 0 && i < boardSize - 1) {
      drawCell(0, i * cellSize, i % 2 === 0 ? "#ffcc00" : "#0066cc");
      drawCell(
        boardLength - cellSize,
        i * cellSize,
        i % 2 === 0 ? "#ffcc00" : "#0066cc"
      );
    }
  }

  ctx.fillStyle = "#e0e0e0";
  ctx.strokeStyle = "#333";
  ctx.lineWidth = 2;
  ctx.fillRect(cellSize, cellSize, deckSize, deckSize);
  ctx.strokeRect(cellSize, cellSize, deckSize, deckSize);
  ctx.fillRect(
    boardLength - deckSize - cellSize,
    boardLength - deckSize - cellSize,
    deckSize,
    deckSize
  );
  ctx.strokeRect(
    boardLength - deckSize - cellSize,
    boardLength - deckSize - cellSize,
    deckSize,
    deckSize
  );

  const centerImage = new Image();
  centerImage.onload = () => {
    ctx.drawImage(
      centerImage,
      cellSize + deckSize,
      cellSize + deckSize,
      centerSize - deckSize * 2,
      centerSize - deckSize * 2
    );
  };
  centerImage.src = centerImageUrl;
};

export const calculatePawnPosition = (step, boardSize) => {
  const squareSize = 50;
  let x, y;

  if (step < boardSize) {
    x = step * squareSize;
    y = 0;
  } else if (step < boardSize * 2) {
    x = (boardSize - 1) * squareSize;
    y = (step - boardSize) * squareSize;
  } else if (step < boardSize * 3) {
    x = (boardSize - 1 - (step - boardSize * 2)) * squareSize;
    y = (boardSize - 1) * squareSize;
  } else {
    x = 0;
    y = (boardSize - 1 - (step - boardSize * 3)) * squareSize;
  }

  return { x, y };
};
