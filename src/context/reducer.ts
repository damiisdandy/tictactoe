
const reducer: ReducerType = (state, action) => {
  switch (action.type) {
    case "SET_USERNAME":
      localStorage.setItem("userName", action.payload);
      return {
        ...state,
        userName: action.payload
      }
    case "SET_BACKDROP":
      return {
        ...state,
        UI: {
          ...state.UI,
          showBackdrop: action.payload,
        }
      }
    default:
      return { ...state };
  }
};

export default reducer;
