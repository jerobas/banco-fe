export interface IPlayer extends IPlayerDefaults {
  initialBoardPosition: {
    x: number;
    y: number;
  };
  position_fe: {
    x: number;
    y: number;
  };
  color: string;
}

export interface IPlayerDefaults {
  id: number;
  name: string;
  socket_id: string;
  ip_address: string;
  money: string;
  position: number;
  numberOfEqualDices: number;
  player_state: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface IBoardProps {
  boardSize: number;
  centerImageUrl: string;
}

export interface IPawnProps {
  color: string;
  position: { x: number; y: number };
}