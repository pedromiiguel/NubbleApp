import React from 'react';
import {Dimensions, Image, ListRenderItemInfo, Pressable} from 'react-native';

import {PostReaction, postReactionService} from '@domain';
import {QueryKeys} from '@infra';

import {InfinityScrollList, Screen, Text} from '@components';
import {useAppNavigation} from '@hooks';
import {AppTabScreenProps} from '@routes';

const NUM_COLUMNS = 2;
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_PADDING = 24;
const ITEM_MARGIN = 16;

const ITEM_WIDTH =
  (SCREEN_WIDTH - ITEM_MARGIN - SCREEN_PADDING * 2) / NUM_COLUMNS;

export function FavoriteScreen({}: AppTabScreenProps<'FavoriteScreen'>) {
  const navigate = useAppNavigation();

  function renderItem({item}: ListRenderItemInfo<PostReaction>) {
    return (
      <Pressable
        onPress={() => {
          navigate.toPostDetails({
            postId: item.postId,
            postAuthorId: item.author.id,
          });
        }}>
        <Image
          source={{uri: item.post.imageURL}}
          style={{width: ITEM_WIDTH, height: ITEM_WIDTH}}
        />
        <Text mt="s4" semiBold>
          {item.author.fullName}
        </Text>
      </Pressable>
    );
  }

  return (
    <Screen flex={1} title="Favoritos">
      <InfinityScrollList
        queryKey={[QueryKeys.FavoriteList]}
        getList={page => postReactionService.getMyReactions('favorite', page)}
        renderItem={renderItem}
        flatListProps={{
          columnWrapperStyle: {columnGap: ITEM_MARGIN},
          numColumns: NUM_COLUMNS,
          contentContainerStyle: {rowGap: SCREEN_PADDING},
        }}
        emptyListProps={{
          emptyMessage: 'Não há favoritos',
          errorMessage: 'Erro ao carregar favoritos',
        }}
      />
    </Screen>
  );
}
