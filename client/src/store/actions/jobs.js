const clear = () => ({
  type: "CLEAR"
});

const refresh = (data) => ({
  type: "REFRESH",
  payload: data
});

const actions = {
  clear,
  refresh
}

export default actions;
