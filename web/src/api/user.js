import axios from 'axios';
import { base } from './config';

export function signup(data, options = {}) {
  const url = `${base}/api/users/signup`;

  return axios.post(url, data, options);
}

export function login(user, options = {}) {
  const url = `${base}/api/users/login`;

  return axios.post(url, user, options);
}
