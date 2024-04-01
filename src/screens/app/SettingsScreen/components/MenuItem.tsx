import React from 'react';

import {Icon, PressableBox, Text} from '@components';

export type MenuItemProps = {
  label: string;
  onPress: () => void;
};

export function MenuItem({label, onPress}: MenuItemProps) {
  return (
    <PressableBox
      onPress={onPress}
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      paddingVertical="s16">
      <Text semiBold>{label}</Text>
      <Icon name="chevronRight" />
    </PressableBox>
  );
}
