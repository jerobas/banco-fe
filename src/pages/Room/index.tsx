import { useRef } from 'react';

import BoardCanvas from '../../components/Board';
import Chat from '../../components/Chat';

export default function Room() {
  const boardCanvasRef = useRef(null);

  return (
    <div>
      <BoardCanvas ref={boardCanvasRef} />
      <Chat />
    </div>
  );
}
