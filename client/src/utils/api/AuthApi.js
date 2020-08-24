import axios from 'axios';
import { makeSearchParamsFromData } from '../helpers';

const API_URL = process.env.REACT_APP_API_URL;
const FORM_URLENCODED_CONTENT_TYPE = 'application/x-www-form-urlencoded;charset=UTF-8';

export default class AuthApi {
  static login(username, password) {
    return axios({
      url: `${API_URL}/auth/login`,
      method: 'POST',
      headers: {
        'Content-Type': FORM_URLENCODED_CONTENT_TYPE,
      },
      data: makeSearchParamsFromData({ username, password }),
    });
  }

  static register(username, companyName, password) {
    return axios({
      url: `${API_URL}/auth/register`,
      method: 'POST',
      headers: {
        'Content-Type': FORM_URLENCODED_CONTENT_TYPE,
      },
      data: makeSearchParamsFromData({ username, companyName, password }),
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
