const reducer = (state, action) => {
  switch (action.type) {
    case "modalAdd":
      return {
        showAdd: action.payload
      };
    case "modalUpdate":
      return {
        showUpdate: action.payload
      };
    case "modalConfirm":
      return {
        showConfirm: action.payload
      };
    default:
      return state;
  }
};

export default reducer