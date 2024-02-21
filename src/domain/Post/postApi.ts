import {PageAPI, PageParams, api} from '@api';
import {ImageForUpload} from 'src/services';

import {PostAPI} from './postTypes';

async function getList(params: PageParams): Promise<PageAPI<PostAPI>> {
  const response = await api.get('/user/post', {
    params,
  });
  return response.data;
}

async function createPost(
  text: string,
  imageCover: ImageForUpload,
): Promise<PostAPI> {
  const form = new FormData();

  form.append('text', text);
  form.append('imageCover', imageCover);
  const response = await api.postForm<PostAPI>('user/post', form);

  return response.data;
}

export const postApi = {
  getList,
  createPost,
};
