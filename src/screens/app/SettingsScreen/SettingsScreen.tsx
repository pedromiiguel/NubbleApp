import React from 'react';

import {useAuthSignOut} from '@domain';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {Button, Screen} from '@components';
import {AppStackParamList} from '@routes';

type ScreenProps = NativeStackScreenProps<AppStackParamList, 'SettingsScreen'>;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function SettingsScreen(props: ScreenProps) {
  const {isLoading, signOut} = useAuthSignOut();

  return (
    <Screen canGoBack title="Configurações">
      <Button loading={isLoading} title="Sair da conta" onPress={signOut} />
    </Screen>
  );
}
