import {api} from '@api';

import {UserAPI} from './userTypes';

const PATH = 'users';

async function getById(userId: number): Promise<UserAPI> {
  const response = await api.get(`/${PATH}/${userId}`);

  return response.data;
}

export const userApi = {
  getById,
};