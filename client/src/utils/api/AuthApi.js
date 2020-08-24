import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export default class AuthApi {
  static login(username, password) {
    return axios({
      url: `${API_URL}/auth/login`,
      method: 'POST',
      data: { username, password },
    });
  }

  static register(username, companyName, password) {
    return axios({
      url: `${API_URL}/auth/register`,
      method: 'POST',
      data: { username, companyName, password },
    });
  }

  static getProfileInfo() {
    return axios({
      url: `${API_URL}/auth/me`,
      method: 'GET',
    });
  }

  static logout() {
    return axios({
      url: `${API_URL}/auth/logout`,
      method: 'GET',
    });
  }
}
