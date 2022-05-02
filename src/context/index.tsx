import { createContext, Dispatch, ReactNode, useReducer } from "react";
import { generateID } from "../utils";
import reducer from "./reducer";

let userID = localStorage.getItem("userID");
if (!userID) {
  userID = generateID(10);
  localStorage.setItem("userID", userID);
}

let userName = localStorage.getItem("userName");

const initialState: Store = {
  id: userID,
  userName,
  UI: {
    showBackdrop: false,
  },
};

export const globalContext = createContext<{
  state: Store;
  dispatch: Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => {},
});

export const GlobalContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <globalContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </globalContext.Provider>
  );
};
