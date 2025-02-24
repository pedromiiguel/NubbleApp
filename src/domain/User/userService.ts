import {apiAdapter} from '@api';
import {Page} from '@types';

import {userAdapter} from './userAdapter';
import {userApi} from './userApi';
import {User, UserDetails} from './userTypes';

async function getById(id: number): Promise<UserDetails> {
  const userAPI = await userApi.getById(id);

  const {isFollowing} = await userApi.isFollowing(id);

  return userAdapter.toUserDetails(userAPI, isFollowing);
}

async function searchUser(search: string): Promise<Page<User>> {
  const userAPI = await userApi.getList(search);

  return apiAdapter.toPageModel(userAPI, userAdapter.toUser);
}

export const userService = {
  getById,
  searchUser,
};
