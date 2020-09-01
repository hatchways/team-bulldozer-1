import axios from 'axios';
import consts from '../consts';

const { API_URL } = consts.env;

export default class SearchApi {
  static search(type, term) {
    return axios({
      url: `${API_URL}/search`,
      method: 'GET',
      params: { type, term },
    });
  }
}
