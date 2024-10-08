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

export interface IPawnProps {
  color: string;
  position: { x: number; y: number };
  cell_size: { width: number; height: number };
}

export interface IGameStateUpdated {
  diceWinners: string[];
  type: boolean;
  room: IRoom;
}

export interface IRoom {
  id: number;
  name: string;
  password: string;
  turn: number;
  owner_ip: string;
  sequence: string[] | [];
  game_state: boolean;
  limit_of_users: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  users: IPlayerDefaults[];
  current_user_turn: IPlayerDefaults | null;
}

export interface IPlayersStates {
  users: IPlayerDefaults[];
  currentTurn: IPlayerDefaults;
}

export interface ICardData {
  illustration_url: string;
  name: string;
  description: string;
  type: string;
  purchase_value: number;
  modifiers: string[];
  is_tradable: boolean;
  can_accept_modifiers: boolean;
  rarity_tier: string;
  scaling_level: number;
  quantity: number;
}
export interface IApiResponse {
  card: ICardData;
}
