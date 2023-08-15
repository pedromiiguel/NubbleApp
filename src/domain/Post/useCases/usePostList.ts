import {postService, Post, usePaginatedList} from '@domain';

export function usePostList() {
  return usePaginatedList<Post>(postService.getList);
}
