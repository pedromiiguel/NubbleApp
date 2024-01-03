import React from 'react';

import {SimpleLogo} from '@brand';
import {useNavigation} from '@react-navigation/native';

import {Box, BoxProps, Icon} from '@components';
import {useAppSafeArea} from '@hooks';

export function HomeHeader() {
  const {top} = useAppSafeArea();

  const navigation = useNavigation();

  function navigationToSearchScreen() {
    navigation.navigate('SearchScreen');
  }

  return (
    <Box {...$wrapper} style={{paddingTop: top}}>
      <SimpleLogo width={70} />
      <Box flexDirection="row" alignItems="center">
        <Box mr="s24">
          <Icon name="search" onPress={navigationToSearchScreen} />
        </Box>
        <Box mr="s24">
          <Icon name="bell" />
        </Box>
        <Box>
          <Icon name="comment" />
        </Box>
      </Box>
    </Box>
  );
}

const $wrapper: BoxProps = {
  paddingBottom: 's24',
  paddingHorizontal: 's24',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
};
