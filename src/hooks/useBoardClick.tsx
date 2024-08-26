import { useEffect } from "react";

export const useBoardClick = (
  boardRef: React.RefObject<HTMLCanvasElement>,
  boardSize: number,
  cellSize: { width: number; height: number },
  onCellClick: (position: number) => void
) => {
  const handleCanvasClick = (event: MouseEvent) => {
    const canvas = boardRef.current!;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const clickedRow = Math.floor(y / cellSize.height);
    const clickedCol = Math.floor(x / cellSize.width);

    const position = clickedRow * boardSize + clickedCol + 1;

    onCellClick(position);
  };
  useEffect(() => {
    const canvas = boardRef.current;
    if (canvas) {
      canvas.addEventListener("click", handleCanvasClick);
    }

    return () => {
      if (canvas) {
        canvas.removeEventListener("click", handleCanvasClick);
      }
    };
  }, [boardSize, boardRef]);
};
