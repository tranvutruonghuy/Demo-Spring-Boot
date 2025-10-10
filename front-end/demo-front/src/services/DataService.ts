import axios from "axios";

export class DataService {
  static async getFootballData() {
    const url =
      "https://open.er-api.com/v6/latest/USD";
    const result = await axios.get(url);
    if (result.status === 200) {
      return result.data;
    }
  }
}
