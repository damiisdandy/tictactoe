import { useContext } from "react";
import { globalContext } from "../context";

const useUser: UseUser = () => {
  const { state, dispatch } = useContext(globalContext);

  const changeAvatar = (name: string) => {
    dispatch({
      type: "CHANGE_AVATAR",
      payload: name,
    });
  };

  return {
    userID: state.id,
    changeAvatar,
  };
};

export default useUser;
