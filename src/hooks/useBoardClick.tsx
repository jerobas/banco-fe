import { useEffect, useCallback } from "react";

export const useBoardClick = (
  boardRef: React.RefObject<HTMLCanvasElement>,
  boardSize: number,
  cellSize: { width: number; height: number },
  setCardPosition: React.Dispatch<React.SetStateAction<number | null>>,
  setModalCardOpen: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const handleCanvasClick = useCallback(
    (event: MouseEvent) => {
      const canvas = boardRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();

      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const clickedRow = Math.floor(y / cellSize.height);
      const clickedCol = Math.floor(x / cellSize.width);

      let position =
        clickedRow <= clickedCol
          ? clickedRow + clickedCol + 1
          : -1 * (clickedRow + clickedCol - 1) + boardSize * 4 - 4;

      if (
        clickedCol === 0 ||
        clickedCol === 14 ||
        clickedRow === 0 ||
        clickedRow === 14
      ) {
        console.log(position);
        setCardPosition(position);
        setModalCardOpen(true);
      }
    },
    [boardRef, boardSize, cellSize, setCardPosition, setModalCardOpen]
  );

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
  }, [handleCanvasClick, boardRef]);
};
