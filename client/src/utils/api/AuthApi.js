import axios from 'axios';
import consts from '../consts';

const { API_URL } = consts.env;

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

  static setProfileInfo(toSet) {
    return axios({
      url: `${API_URL}/auth/me`,
      method: 'PATCH',
      data: toSet,
    });
  }

  static logout() {
    return axios({
      url: `${API_URL}/auth/logout`,
      method: 'POST',
    });
  }
}
