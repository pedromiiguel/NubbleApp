import React from 'react';
import {Alert, Pressable} from 'react-native';

import {PostComment, postCommentService, usePostCommentRemove} from '@domain';
import {useToastService} from '@services';

import {Box, ProfileAvatar, Text} from '@components';

interface Props {
  postComment: PostComment;
  postId: number;
  postAuthorId: number;
  userId: number | null;
}

export function PostCommentItem({
  postComment,
  userId,
  postAuthorId,
  postId,
}: Props) {
  const {showToast} = useToastService();
  const {mutate} = usePostCommentRemove(postId, {
    onSuccess: () => {
      showToast({
        message: 'Comentário deletado',
        position: 'top',
      });
    },
  });

  const isAllowToDelete = postCommentService.isAllowToDelete(
    userId,
    postComment,
    postAuthorId,
  );

  function confirmRemove() {
    Alert.alert('Deseja excluir o comentário?', 'pressione confirmar', [
      {
        text: 'Confirmar',
        onPress: () => mutate({postCommentId: postComment.id}),
      },
      {
        text: 'Cancelar',
        style: 'cancel',
      },
    ]);
  }

  return (
    <Pressable
      testID="post-comment-id"
      disabled={!isAllowToDelete}
      onLongPress={confirmRemove}>
      <Box
        flexDirection="row"
        alignItems="center"
        mb="s16"
        paddingHorizontal="s24">
        <ProfileAvatar
          imageURL={postComment.author.profileURL}
          authorId={postComment.author.id}
        />
        <Box ml="s12" flex={1}>
          <Text preset="paragraphSmall" bold>
            {postComment.author.userName}
          </Text>
          <Text preset="paragraphSmall" color="paragraph">
            {postComment.message} - {postComment.createdAtRelative}
          </Text>
        </Box>
      </Box>
    </Pressable>
  );
}
