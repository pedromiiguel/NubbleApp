import React, {useState} from 'react';
import {Keyboard} from 'react-native';

import {usePostCommentCreate} from '@domain';

import {TextMesssage} from '@components';

interface Props {
  postId: number;
  onAddComment: () => void;
}

export function PostCommentTextMessage({postId, onAddComment}: Props) {
  const [message, setMessage] = useState('');

  const {createComment} = usePostCommentCreate(postId, {
    onSuccess: () => {
      onAddComment();
      setMessage('');
      Keyboard.dismiss();
    },
  });

  return (
    <TextMesssage
      placeholder="Adicione um comentário"
      value={message}
      onChangeText={setMessage}
      onPressSend={createComment}
    />
  );
}
