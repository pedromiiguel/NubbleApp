import React from 'react';
import {View} from 'react-native';

import {useAuthSignIn} from '@domain';
import {zodResolver} from '@hookform/resolvers/zod';
import {useAuthCredentials, useToastService} from '@services';
import {useForm} from 'react-hook-form';

import {
  Button,
  Text,
  Screen,
  FormPasswordInput,
  FormTextInput,
} from '@components';
import {AuthScreenProps} from '@routes';

import {LoginSchema, loginSchema} from './LoginSchema';

export function LoginScreen({navigation}: AuthScreenProps<'LoginScreen'>) {
  const {showToast} = useToastService();
  const {saveCredentials} = useAuthCredentials();
  const {isLoading, signIn} = useAuthSignIn({
    onError: message => showToast({message, type: 'error'}),
    onSuccess: authCredentials => {
      saveCredentials(authCredentials);
    },
  });

  const {control, handleSubmit, formState} = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  function nagivateToSignUpScreen() {
    navigation.navigate('SignUpScreen');
  }

  function nagivateToForgotPasswordScreen() {
    navigation.navigate('ForgotPasswordScreen');
  }

  function submitForm({email, password}: LoginSchema) {
    signIn({email, password});
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

        <FormTextInput
          name="email"
          control={control}
          label="E-mail"
          placeholder="Digite seu e-mail"
          boxProps={{mb: 's20'}}
        />

        <FormPasswordInput
          name="password"
          control={control}
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

        <Button
          title="Entrar"
          mt="s48"
          onPress={handleSubmit(submitForm)}
          disabled={!formState.isValid}
          loading={isLoading}
        />
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
