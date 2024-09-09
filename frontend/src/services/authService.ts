import axios from 'axios';
import { environment } from '../environments/environments';
import { Login } from '../interfaces/login.interface';

const url: string = environment.url;

export const signinRequest = async (loginForm: Login) => {
  const response = await axios.post( `${url}/auth/login`, loginForm);

  if (response.status !== 200) {
    throw new Error('Login failed');
  }

  return response.data;
};