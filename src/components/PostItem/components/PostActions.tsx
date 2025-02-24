import React from 'react';

import {Post, useReactToPost} from '@domain';
import {QueryKeys} from '@infra';

import {Box, TouchableOpacityBox, Icon, Text, IconProps} from '@components';
import {useAppNavigation} from '@hooks';

type Props = {
  post: Post;
  hideCommentAction?: boolean;
};

export function PostActions({post, hideCommentAction}: Props) {
  const navigate = useAppNavigation();

  const likeReaction = useReactToPost({post, postReactionType: 'like'});
  const favoriteReaction = useReactToPost({
    post,
    postReactionType: 'favorite',
    queryKeys: [QueryKeys.FavoriteList],
  });

  function navigateToComments() {
    navigate.toPostComment({postId: post.id, postAuthorId: post.author.id});
  }

  return (
    <Box flexDirection="row" mt="s16">
      <Item
        icon={{
          default: 'heart',
          marked: 'heartFill',
        }}
        marked={likeReaction.hasReacted}
        text={likeReaction.reactionCount}
        onPress={likeReaction.reactToPost}
      />

      <Item
        disabled={hideCommentAction}
        icon={{
          default: 'comment',
          marked: 'comment',
        }}
        marked={false}
        text={post.commentCount}
        onPress={navigateToComments}
      />

      <Item
        icon={{
          default: 'bookmark',
          marked: 'bookmarkFill',
        }}
        marked={favoriteReaction.hasReacted}
        text={favoriteReaction.reactionCount}
        onPress={favoriteReaction.reactToPost}
      />
    </Box>
  );
}

interface ItemProps {
  onPress: () => void;
  marked: boolean;
  disabled?: boolean;
  icon: {
    default: IconProps['name'];
    marked: IconProps['name'];
  };
  text: number;
}

function Item({icon, onPress, text, marked, disabled}: ItemProps) {
  return (
    <TouchableOpacityBox
      flexDirection="row"
      alignItems="center"
      disabled={disabled}
      mr="s24"
      onPress={onPress}>
      <Icon
        color={marked ? 'market' : undefined}
        name={marked ? icon.marked : icon.default}
      />
      {text > 0 && (
        <Text ml="s4" bold preset="paragraphSmall">
          {text}
        </Text>
      )}
    </TouchableOpacityBox>
  );
}
