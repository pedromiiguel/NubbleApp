import {apiAdapter} from '@api';
import {Page} from '@types';

import {userAdapter} from './userAdapter';
import {userApi} from './userApi';
import {User} from './userTypes';

async function getById(id: number): Promise<User> {
  const userAPI = await userApi.getById(id);

  return userAdapter.toUser(userAPI);
}

async function searchUser(search: string): Promise<Page<User>> {
  const userAPI = await userApi.getList(search);

  return apiAdapter.toPageModel(userAPI, userAdapter.toUser);
}

export const userService = {
  getById,
  searchUser,
};
