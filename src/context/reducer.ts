
const reducer: ReducerType = (state, action) => {
  switch (action.type) {
    case "CHANGE_AVATAR":
      localStorage.setItem("userID", action.payload);
      return {
        ...state,
        id: action.payload,
      }
    default:
      return { ...state };
  }
};

export default reducer;
