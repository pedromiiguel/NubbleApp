import React from 'react';

import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {Screen, Icon, Text, Button} from '@components';
import {RootStackParamList} from '@routes';

type ScreenProps = NativeStackScreenProps<RootStackParamList, 'SuccessScreen'>;

export function SuccessScreen({route, navigation}: ScreenProps) {
  const {title, description, icon} = route.params;

  function goBackToBegin() {
    navigation.goBack();
  }

  return (
    <Screen>
      <Icon {...icon} />
      <Text preset="headingLarge" mt="s24">
        {title}
      </Text>
      <Text preset="paragraphLarge" mt="s16">
        {description}
      </Text>

      <Button mt="s40" onPress={goBackToBegin} title="Voltar ao início" />
    </Screen>
  );
}
