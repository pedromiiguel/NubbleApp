import React from 'react';

import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {Screen, Text} from '@components';
import {AppStackParamList} from '@routes';

type ScreenProps = NativeStackScreenProps<AppStackParamList, 'SettingsScreen'>;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function SettingsScreen(props: ScreenProps) {
  return (
    <Screen canGoBack>
      <Text preset="paragraphLarge">Settings screen</Text>
    </Screen>
  );
}
