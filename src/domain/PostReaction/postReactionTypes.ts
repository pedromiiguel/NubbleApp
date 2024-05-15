import {Post, PostAPI} from '../Post/postTypes';
import {User, UserAPI} from '../User';

export type PostReactionType = 'favorite' | 'like';

export interface PostReactionBase {
  id: number;
  emojiType: PostReactionType;
  userId: number;
  postId: number;
  isChecked: true;
  createdAt: string;
  updatedAt: string;
}
export interface PostReaction extends PostReactionBase {
  author: User;
  post: Pick<Post, 'id' | 'text' | 'imageURL'>;
}

export interface PostReactionBaseAPI {
  id: number;
  emoji_type: PostReactionType;
  user_id: number;
  post_id: number;
  is_checked: true;
  created_at: string;
  updated_at: string;
  user: UserAPI;
  post: Pick<PostAPI, 'id' | 'text' | 'image_url' | 'status'>;
}
export interface PostReactionAPI extends PostReactionBaseAPI {
  user: UserAPI;
  post: Pick<PostAPI, 'id' | 'text' | 'image_url' | 'status'>;
}
