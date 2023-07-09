import React from 'react';
import {Screen} from '../../../components/Screen/Screen';
import {Icon} from '../../../components/Icon/Icon';
import {Text} from '../../../components/Text/Text';
import {Button} from '../../../components/Button/Button';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../routes/routes';

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