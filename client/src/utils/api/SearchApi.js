import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export default class SearchApi {
  static search(type, term) {
    return axios({
      url: `${API_URL}/search`,
      method: 'GET',
      params: { type, term },
    });
  }
}
