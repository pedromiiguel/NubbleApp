import React from 'react';

import {Post} from '@domain';

import {Box, TouchableOpacityBox, Icon, Text, IconProps} from '@components';

type Props = Pick<Post, 'favoriteCount' | 'commentCount' | 'reactionCount'>;

export function PostActions({
  reactionCount,
  favoriteCount,
  commentCount,
}: Props) {
  function likePost() {}

  function navigateToComments() {}

  function favoritePost() {}

  return (
    <Box flexDirection="row" mt="s16">
      <Item
        icon={{
          default: 'heart',
          marked: 'heartFill',
        }}
        marked
        text={reactionCount}
        onPress={likePost}
      />

      <Item
        icon={{
          default: 'comment',
          marked: 'comment',
        }}
        marked={false}
        text={commentCount}
        onPress={navigateToComments}
      />

      <Item
        icon={{
          default: 'bookmark',
          marked: 'bookmarkFill',
        }}
        marked={false}
        text={favoriteCount}
        onPress={favoritePost}
      />
    </Box>
  );
}

interface ItemProps {
  onPress: () => void;
  marked: boolean;
  icon: {
    default: IconProps['name'];
    marked: IconProps['name'];
  };
  text: number;
}

function Item({icon, onPress, text, marked}: ItemProps) {
  return (
    <TouchableOpacityBox
      flexDirection="row"
      alignItems="center"
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
