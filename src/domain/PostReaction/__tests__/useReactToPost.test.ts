import {act, renderHook, waitFor} from 'test-utils';

import {postReactionService} from '../postReactionService';
import {useReactToPost} from '../useCases/useReactToPost';

import {
  mockedPostWithLike,
  mockedPostWithoutLike,
} from './mockedData/mockedPost';

describe('useReactToPost', () => {
  test('when react to post, has reacted and reaction count should be updated', async () => {
    jest
      .spyOn(postReactionService, 'reactToPost')
      .mockResolvedValue(mockedPostWithoutLike.response);

    const {result} = renderHook(() =>
      useReactToPost({
        post: mockedPostWithoutLike.post,
        postReactionType: 'like',
      }),
    );

    expect(result.current.hasReacted).toBeFalsy();
    expect(result.current.reactionCount).toBe(
      mockedPostWithoutLike.post.reactionCount,
    );

    act(() => {
      result.current.reactToPost();
    });

    await waitFor(() => {
      expect(result.current.hasReacted).toBeTruthy();
    });
    await waitFor(() => {
      expect(result.current.reactionCount).toBe(
        mockedPostWithoutLike.post.reactionCount + 1,
      );
    });
  });

  test('when react to post fails, has reacted and reaction count should be reverted to the original values', async () => {
    const errorMessage = 'API error';
    const mockedOnError = jest.fn();

    jest
      .spyOn(postReactionService, 'reactToPost')
      .mockRejectedValueOnce(new Error(errorMessage));

    const {result} = renderHook(() =>
      useReactToPost({
        post: mockedPostWithLike.post,
        postReactionType: 'like',
        options: {onError: mockedOnError},
      }),
    );

    expect(result.current.hasReacted).toBeTruthy();
    expect(result.current.reactionCount).toBe(
      mockedPostWithLike.post.reactionCount,
    );

    act(() => {
      result.current.reactToPost();
    });

    await waitFor(() => {
      expect(result.current.hasReacted).toBeTruthy();
    });
    await waitFor(() => {
      expect(result.current.reactionCount).toBe(
        mockedPostWithLike.post.reactionCount,
      );
    });

    expect(mockedOnError).toHaveBeenCalledWith(errorMessage);
  });

  test('should return initial reaction count with favorite count', () => {
    jest
      .spyOn(postReactionService, 'reactToPost')
      .mockResolvedValue(mockedPostWithoutLike.response);

    const {result} = renderHook(() =>
      useReactToPost({
        post: mockedPostWithoutLike.post,
        postReactionType: 'favorite',
      }),
    );

    expect(result.current.reactionCount).toBe(
      mockedPostWithoutLike.post.favoriteCount,
    );
  });
});
