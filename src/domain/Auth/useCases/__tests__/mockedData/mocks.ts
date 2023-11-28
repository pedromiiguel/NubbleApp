import {AuthCredentials} from '../../../authTypes';

export const mockedAuthCredentials: AuthCredentials = {
  token: 'access-token',
  user: {
    id: 1,
    firstName: 'Maria',
    lastName: 'Julia',
    username: 'mariajulia',
    email: 'mariajulia@coffstack.com',
    profileUrl: 'fake-url',
    isOnline: false,
    fullName: 'Maria Julia',
  },
};
