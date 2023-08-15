import React from 'react';

import {useNavigation} from '@react-navigation/native';

import {Box, TouchableOpacityBox, Text, Icon} from '@components';

import {ScreenProps} from '../Screen';

type Props = Pick<ScreenProps, 'title' | 'canGoBack'>;

const ICON_SIZE = 20;
export function ScreenHeader({canGoBack, title}: Props) {
  const navigation = useNavigation();

  return (
    <Box
      mb="s24"
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between">
      {canGoBack && (
        <TouchableOpacityBox
          flexDirection="row"
          alignItems="center"
          onPress={navigation.goBack}>
          <Icon size={ICON_SIZE} name="arrowLeft" color="primary" />
          {!title && (
            <Text preset="paragraphMedium" semiBold marginLeft="s8">
              Voltar
            </Text>
          )}
        </TouchableOpacityBox>
      )}
      {title && <Text preset="headingSmall">{title}</Text>}
      {title && <Box height={ICON_SIZE} width={ICON_SIZE} />}
    </Box>
  );
}
