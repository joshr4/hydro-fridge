import axios from 'axios';

export default class FridgeAPI {
  config;
  constructor() {
    this.getConfig();
  }

  async getConfig() {
    this.config = await axios.get('http://localhost:9000/testAPI').then(res => {
      console.log({ res });
      return res.data;
    });
  }
}
