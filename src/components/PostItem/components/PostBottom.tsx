import React from 'react';

import {Post} from '@domain';

import {Box, Text} from '@components';
import {useAppNavigation} from '@hooks';

type Props = Pick<Post, 'author' | 'commentCount' | 'text' | 'id'> & {
  hideCommentAction?: boolean;
};

export function PostBottom({
  author,
  commentCount,
  text,
  id,
  hideCommentAction,
}: Props) {
  const commentText = hideCommentAction ? null : getCommentText(commentCount);

  const navigate = useAppNavigation();

  function navigateToPostCommentScreen() {
    navigate.toPostComment({
      postId: id,
      postAuthorId: author.id,
    });
  }

  return (
    <Box mt="s16">
      <Text preset="paragraphMedium" bold>
        {author.userName}
      </Text>
      <Text preset="paragraphMedium" color="gray1">
        {text}
      </Text>
      {commentText && (
        <Text
          onPress={navigateToPostCommentScreen}
          mt="s8"
          preset="paragraphSmall"
          bold
          color="primary">
          {commentText}
        </Text>
      )}
    </Box>
  );
}

function getCommentText(commentCount: number): string | null {
  if (commentCount === 0) {
    return null;
  } else if (commentCount === 1) {
    return 'ver comentário';
  } else {
    return `ver ${commentCount} comentários`;
  }
}
