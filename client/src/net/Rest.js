const Rest = {
  async GET(url) {
    return await (await fetch(url)).json();
  }
};

export default Rest;
