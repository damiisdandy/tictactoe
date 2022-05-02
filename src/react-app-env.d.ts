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

interface StoreUI {
  showBackdrop: boolean;
}

interface Store {
  id: string | null;
  userName: string | null;
  UI: StoreUI
}

type ActionTypes = 'SET_USERNAME' | 'SET_BACKDROP';

interface Action {
  type: ActionTypes;
  payload?: any;
}

type ReducerType = (state: Store, action: Action) => Store;

type UseUser = () => {
  userName: string | null;
  setUserName: (name: string) => void;
}

type UseUI = () => {
  UI: StoreUI;
  setShowBackdrop: (value: boolean) => void;
}