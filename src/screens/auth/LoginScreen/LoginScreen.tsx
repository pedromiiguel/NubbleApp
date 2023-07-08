import React from 'react';
import {View} from 'react-native';
import {Button} from '../../../components/Button/Button';
import {TextInput} from '../../../components/TextInput/TextInput';

import {Text} from '../../../components/Text/Text';
import {Screen} from '../../../components/Screen/Screen';
import {PasswordInput} from '../../../components/PasswordInput/PasswordInput';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../routes/routes';

type ScreenProps = NativeStackScreenProps<RootStackParamList, 'LoginScreen'>;

export function LoginScreen({navigation}: ScreenProps) {
  function nagivateToSignUpScreen() {
    navigation.navigate('SignUpScreen');
  }

  function nagivateToForgotPasswordScreen() {
    navigation.navigate('ForgotPasswordScreen');
  }

  return (
    <Screen>
      <View>
        <Text marginBottom="s8" preset="headingLarge">
          Olá
        </Text>
        <Text preset="paragraphLarge" mb="s40">
          Digite seu e-mail e senha para entrar
        </Text>

        <TextInput
          label="E-mail"
          placeholder="Digite seu e-mail"
          boxProps={{mb: 's20'}}
        />
        <PasswordInput
          label="Senha"
          placeholder="Digite sua senha"
          boxProps={{mb: 's10'}}
        />

        <Text
          onPress={nagivateToForgotPasswordScreen}
          color="primary"
          preset="paragraphSmall"
          bold>
          Esqueci minha senha
        </Text>

        <Button title="Entrar" mt="s48" />
        <Button
          title="Criar uma conta"
          preset="outline"
          mt="s12"
          onPress={nagivateToSignUpScreen}
        />
      </View>
    </Screen>
  );
}
