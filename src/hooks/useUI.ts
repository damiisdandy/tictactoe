import { useContext } from "react";
import { globalContext } from "../context";

const useUI: UseUI = () => {
  const { state, dispatch } = useContext(globalContext);

  const setShowBackdrop = (value: boolean) => {
    dispatch({
      type: "SET_BACKDROP",
      payload: value,
    });
  };

  return {
    UI: state.UI,
    setShowBackdrop,
  };
};

export default useUI;
