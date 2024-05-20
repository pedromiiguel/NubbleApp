import React, {useState} from 'react';
import {Keyboard} from 'react-native';

import {usePostCommentCreate} from '@domain';

import {Box, TextMesssage} from '@components';

interface Props {
  postId: number;
}

export function PostCommentTextMessage({postId}: Props) {
  const [message, setMessage] = useState('');

  const {createComment} = usePostCommentCreate(postId, {
    onSuccess: () => {
      setMessage('');
      Keyboard.dismiss();
    },
  });

  return (
    <Box paddingHorizontal="s24">
      <TextMesssage
        placeholder="Adicione um comentário"
        value={message}
        onChangeText={setMessage}
        onPressSend={createComment}
      />
    </Box>
  );
}
