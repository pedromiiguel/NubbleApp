import React from 'react';
import {FlatList, ListRenderItemInfo} from 'react-native';

import {useAuthSignOut} from '@domain';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {Button, Screen, Separator} from '@components';
import {AppStackParamList} from '@routes';

import {MenuItem, MenuItemProps} from './components/MenuItem';

type ScreenProps = NativeStackScreenProps<AppStackParamList, 'SettingsScreen'>;

export function SettingsScreen({navigation}: ScreenProps) {
  const {isLoading, signOut} = useAuthSignOut();

  const items: MenuItemProps[] = [
    {label: 'Termos de uso', onPress: () => {}},
    {label: 'Política de privacidade', onPress: () => {}},
    {
      label: 'Modo escuro',
      onPress: () => {
        navigation.navigate('DarkModeScreen');
      },
    },
  ];

  function renderItem({item}: ListRenderItemInfo<MenuItemProps>) {
    return <MenuItem {...item} />;
  }

  return (
    <Screen canGoBack title="Configurações" flex={1}>
      <FlatList
        data={items}
        bounces={false}
        renderItem={renderItem}
        ItemSeparatorComponent={Separator}
        ListFooterComponent={
          <Button
            loading={isLoading}
            mt="s48"
            title="Sair da conta"
            onPress={signOut}
          />
        }
      />
    </Screen>
  );
}
