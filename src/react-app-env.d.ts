/// <reference types="react-scripts" />

type BoardType = any[][]

type WinType =
  | "htop"
  | "hmid"
  | "hbtm"
  | "vleft"
  | "vmid"
  | "vright"
  | "dright"
  | "dleft"
  | "";

interface Store {
  id: string | null;
}

type ActionTypes = 'CHANGE_AVATAR';

interface Action {
  type: ActionTypes;
  payload?: any;
}

type ReducerType = (state: Store, action: Action) => Store;

type UseUser = () => {
  userID: string | null;
  changeAvatar: (name: string) => void;
}

interface Game {
  id: string;
  creator: string;
  opponent: string;
  board: string;
  code: string;
  creator_score: number;
  opponent_score: number;
} 