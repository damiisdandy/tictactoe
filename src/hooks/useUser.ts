import { useContext } from "react";
import { globalContext } from "../context";

const useUser: UseUser = () => {
  const { state, dispatch } = useContext(globalContext);

  const setUserName = (name: string) => {
    dispatch({
      type: "SET_USERNAME",
      payload: name,
    });
  };

  return {
    userID: state.id,
    userName: state.userName,
    setUserName,
  };
};

export default useUser;
