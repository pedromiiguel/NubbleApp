import {PageAPI, PageParams, api} from '@api';

import {PostAPI} from './postType';

async function getList(params: PageParams): Promise<PageAPI<PostAPI>> {
  const response = await api.get('/user/post', {
    params,
  });
  return response.data;
}

export const postApi = {
  getList,
};
