import React, {useRef} from 'react';
import {FlatList, ListRenderItemInfo, StyleProp, ViewStyle} from 'react-native';

import {Post, postService} from '@domain';
import {QueryKeys} from '@infra';
import {useScrollToTop} from '@react-navigation/native';

import {InfinityScrollList, PostItem, Screen} from '@components';
import {AppTabScreenProps} from '@routes';

import {HomeHeader} from './components/HomeHeader/HomeHeader';

export function HomeScreen({}: AppTabScreenProps<'HomeScreen'>) {
  const flatListRef = useRef<FlatList<Post>>(null);
  useScrollToTop(flatListRef);

  function renderItem({item}: ListRenderItemInfo<Post>) {
    return <PostItem post={item} />;
  }

  return (
    <Screen style={$screen}>
      <InfinityScrollList
        queryKey={[QueryKeys.PostList]}
        getList={postService.getList}
        renderItem={renderItem}
        flatListProps={{ListHeaderComponent: <HomeHeader />}}
      />
    </Screen>
  );
}

const $screen: StyleProp<ViewStyle> = {
  paddingBottom: 0,
  paddingTop: 0,
  paddingHorizontal: 0,
  flex: 1,
};
