import { useEffect } from "react";

export const useBoardClick = (
  boardRef: React.RefObject<HTMLCanvasElement>,
  boardSize: number,
  onCellClick: (row: number, col: number) => void
) => {
  const handleCanvasClick = (event: MouseEvent) => {
    const canvas = boardRef.current!;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const clickedRow = Math.floor(y / 80);
    const clickedCol = Math.floor(x / 80);

    onCellClick(clickedRow, clickedCol);
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
  }, [boardSize]);
};
