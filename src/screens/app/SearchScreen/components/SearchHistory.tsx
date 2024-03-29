import React from 'react';
import {FlatList, ListRenderItemInfo} from 'react-native';

import {User} from '@domain';
import {useSeachHistory, useSearchHistoryService} from '@services';

import {Box, Icon, ProfileUser, Text} from '@components';

export function SearchHistory() {
  const userList = useSeachHistory();
  const {removeUser} = useSearchHistoryService();

  function renderItem({item}: ListRenderItemInfo<User>) {
    return (
      <ProfileUser
        avatarProps={{size: 48}}
        user={item}
        RightComponent={
          <Icon
            name="trash"
            color="primary"
            onPress={() => removeUser(item.id)}
          />
        }
      />
    );
  }

  return (
    <Box>
      <FlatList
        ListHeaderComponent={
          <Text mb="s16" preset="headingMedium">
            Buscas recentes
          </Text>
        }
        data={userList}
        renderItem={renderItem}
      />
    </Box>
  );
}
