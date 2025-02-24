import React from 'react';

import {useNavigation} from '@react-navigation/native';

import {TouchableOpacityBox} from '../Box/Box';
import {Icon} from '../Icon/Icon';
import {Text} from '../Text/Text';

const ICON_SIZE = 20;

export type BackButtonProps = {
  showBackLabel?: boolean;
};

export function BackButton({showBackLabel}: BackButtonProps) {
  const navigation = useNavigation();

  return (
    <TouchableOpacityBox
      testID="screen-back-button"
      mr={showBackLabel ? 's10' : undefined}
      flexDirection="row"
      alignItems="center"
      onPress={navigation.goBack}>
      <Icon size={ICON_SIZE} name="arrowLeft" color="primary" />
      {showBackLabel && (
        <Text preset="paragraphMedium" semiBold marginLeft="s8">
          Voltar
        </Text>
      )}
    </TouchableOpacityBox>
  );
}
