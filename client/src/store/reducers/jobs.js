const initialState = [
  ['Day', 'Cumulative job views', 'Cumulative predicted job views', 'Active jobs']
];

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "CLEAR":
      return initialState;
    case "REFRESH":
      return initialState.concat(action.payload);
    default:
      return state;
  }
};

export default reducer;
