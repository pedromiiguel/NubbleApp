import {authAdapter} from './authAdapter';
import {authApi} from './authApi';
import {AuthCredentials} from './authTypes';

async function signIn(
  email: string,
  password: string,
): Promise<AuthCredentials> {
  try {
    const response = await authApi.signIn(email, password);
    return authAdapter.toAuthCredentials(response);
  } catch (error) {
    throw new Error('email ou senha inválido');
  }
}

async function signOut(): Promise<string> {
  const message = await await authApi.signOut();
  return message;
}

export const authService = {
  signIn,
  signOut,
};
