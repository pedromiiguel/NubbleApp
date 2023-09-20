import {userAdapter} from './userAdapter';
import {userApi} from './userApi';
import {User} from './userTypes';

async function getById(id: number): Promise<User> {
  const userAPI = await userApi.getById(id);

  return userAdapter.toUser(userAPI);
}

export const userService = {
  getById,
};
