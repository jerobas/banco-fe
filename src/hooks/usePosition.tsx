export const usePosition = (
  position: number,
  boardSize: number,
  canvasRect: DOMRect | undefined
) => {
  const cellSizeX = canvasRect!.width / boardSize;
  const cellSizeY = canvasRect!.height / boardSize;

  let x = canvasRect!.left;
  let y = canvasRect!.top - 29.5;

  for (let step = 1; step <= position; step++) {
    const mod = step % (boardSize * 4 - 4);

    if (mod === 0) {
      y -= cellSizeY;
    } else if (mod < boardSize) {
      x += cellSizeX;
    } else if (mod < boardSize * 2 - 1) {
      y += cellSizeY;
    } else if (mod < boardSize * 3 - 2) {
      x -= cellSizeX;
    } else {
      y -= cellSizeY;
    }
  }
  return { x, y };
};
