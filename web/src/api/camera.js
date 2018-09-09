import axios from 'axios';
import { base } from './config';
import { loadToken } from '../common/js/storage';

export function addCamera(cam) {
  const url = `${base}/api/cameras`;

  const token = loadToken();
  const options = {
    headers: {
      rbtoken: token
    }
  };

  return axios.post(url, cam, options);
}
