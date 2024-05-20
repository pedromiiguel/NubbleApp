import React from 'react';
import {FlatList, ListRenderItemInfo} from 'react-native';

import {PostComment, usePostCommentList, usePostGetById} from '@domain';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useAuthCredentials} from '@services';

import {Box, PostItem, Screen} from '@components';
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
  const showPost = route.params.showPost || false;

  const {post} = usePostGetById(postId, showPost);

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
    <Screen
      flex={1}
      noPaddingHorizontal
      canGoBack
      title={post ? 'Post' : 'Comentários'}>
      <Box flex={1} justifyContent="space-between">
        <FlatList
          showsVerticalScrollIndicator={false}
          data={list}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={{paddingBottom: bottom}}
          ListHeaderComponent={
            post && <PostItem hideCommentAction post={post} />
          }
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
