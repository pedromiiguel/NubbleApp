import {PageAPI} from '@api';

import {PostAPI} from './postType';

async function getList(): Promise<PageAPI<PostAPI>> {
  const response = await fetch('http://localhost:3333/user/post', {
    method: 'GET',
    headers: {
      Authorization:
        'Bearer Mg.sxEEtdnVQIIvFI5EkPG1RM5tJ71zmtLwZNzVTaY4IhE6Xi8vaI4iD48-4Hx4',
    },
  });

  let data: PageAPI<PostAPI> = await response.json();
  return data;
}

export const postApi = {
  getList,
};
