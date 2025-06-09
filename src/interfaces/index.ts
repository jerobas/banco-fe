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

export interface IPlayerDefaultsWithRoom extends IPlayerDefaults {
  room: Omit<IRoom, 'users' | 'current_user_turn'>;
}

export type ResponseWithMessageAndData<K extends string, T> = {
  message: string;
} & {
  [key in K]: T;
};

export interface IWrapper {
  hasHeight: boolean;
  hasWidth: boolean;
  width: string;
  height: string;
}

export interface ILine {
  progress: number
}

export interface IRoomStyle {
  selected: boolean
}

interface User {
  id: number;
  name: string;
  socket_id: string;
  ip_address: string;
}

interface ChatMessage {
  id: number;
  message: string;
  user_ip_address: string;
  user: User;
  created_at: Date
}

export interface Room {
  id: number;
  name: string;
  has_password: boolean;
  password?: string;
  game_state: boolean;
  limit_of_users: number;
  users: User[]
}

export enum SocketEvent {
  CHAT = 'room:chat',
  GET_ROOMS = 'rooms:getRooms',
  JOIN = 'rooms:join',
  UPDATE = 'rooms:updateUserInGameIfReload',
  SETUP = 'rooms:setup',
  START = 'game:start',
  BUY = 'game:buy',
  ROLL_DICES = 'game:rollDices'
}

export type EmitEvents = {
  [SocketEvent.CHAT]: { roomId: number, message: string },
  [SocketEvent.GET_ROOMS]: void,
  [SocketEvent.JOIN]: { name: string; password: string },
  [SocketEvent.UPDATE]: { id: number },
  [SocketEvent.SETUP]: { id: number },
  [SocketEvent.START]: { roomId: number },
  [SocketEvent.BUY]: { roomId: number },
  [SocketEvent.ROLL_DICES]: { roomId: number }
}

export type ResponseEvents = {
  [SocketEvent.CHAT]: { chatMessage: ChatMessage, flag: boolean },
  [SocketEvent.GET_ROOMS]: { rooms: Room[] },
  [SocketEvent.JOIN]: { flag: boolean },
  [SocketEvent.UPDATE]: void,
  [SocketEvent.SETUP]: {
    room: Room,
    owner: User,
    board_size: number
  },
  [SocketEvent.START]: {
    diceWinners: string[], type: boolean,
    room: Room
  },
  [SocketEvent.BUY]: { user: User },
  [SocketEvent.ROLL_DICES]: { users: User[] | undefined, currentTurn: User | null | undefined }
}

