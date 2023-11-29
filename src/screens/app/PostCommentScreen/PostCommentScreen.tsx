import React from 'react';
import {FlatList, ListRenderItemInfo} from 'react-native';

import {PostComment, usePostCommentList} from '@domain';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useAuthCredentials} from '@services';

import {Box, Screen} from '@components';
import {useAppSafeArea} from '@hooks';
import {AppStackParamList} from '@routes';

import {
  PostCommentItem,
  PostCommentBottom,
  PostCommentTextMessage,
} from './components';

type ScreenProps = NativeStackScreenProps<
  AppStackParamList,
  'PostCommentScreen'
>;

export function PostCommentScreen({route}: ScreenProps) {
  const postId = route.params.postId;
  const postAuthorId = route.params.postAuthorId;

  const {bottom} = useAppSafeArea();

  const {userId} = useAuthCredentials();

  const {list, fetchNextPage, hasNextPage} = usePostCommentList(postId);

  function renderItem({item}: ListRenderItemInfo<PostComment>) {
    return (
      <PostCommentItem
        postId={postId}
        postAuthorId={postAuthorId}
        userId={userId}
        postComment={item}
      />
    );
  }

  return (
    <Screen flex={1} canGoBack title="Comentários">
      <Box flex={1} justifyContent="space-between">
        <FlatList
          showsVerticalScrollIndicator={false}
          data={list}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={{paddingBottom: bottom}}
          ListFooterComponent={
            <PostCommentBottom
              fetchNextPage={fetchNextPage}
              hasNextPage={hasNextPage}
            />
          }
        />
        <PostCommentTextMessage postId={postId} />
      </Box>
    </Screen>
  );
}
