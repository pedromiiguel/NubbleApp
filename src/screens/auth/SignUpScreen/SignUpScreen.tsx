import React from 'react';

import {useAuthSignUp} from '@domain';
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';

import {
  FormTextInput,
  FormPasswordInput,
  Screen,
  Text,
  Button,
} from '@components';
import {useResetNavigationSuccess} from '@hooks';
import {AuthScreenProps, AuthStackParamList} from '@routes';

import {SignUpSchema, signUpSchema} from './signUpSchema';

const resetParam: AuthStackParamList['SuccessScreen'] = {
  title: 'Sua conta foi criada com sucesso!',
  description: 'Agora é só fazer login na nossa plataforma',
  icon: {
    name: 'checkRound',
    color: 'success',
  },
};

const defaultValues: SignUpSchema = {
  username: '',
  firstName: '',
  lastName: '',
  email: '',
  password: '',
};

export function SignUpScreen({}: AuthScreenProps<'SignUpScreen'>) {
  const {reset} = useResetNavigationSuccess();

  const {signUp, isLoading} = useAuthSignUp({
    onSuccess: () => {
      reset(resetParam);
    },
  });

  const {control, handleSubmit, formState} = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues,
    mode: 'onChange',
  });

  function submitForm(formValues: SignUpSchema) {
    signUp(formValues);
  }

  return (
    <Screen canGoBack scrollable>
      <Text marginBottom="s32" preset="headingLarge">
        Criar uma conta
      </Text>

      <FormTextInput
        name="username"
        control={control}
        label="Seu username"
        placeholder="@"
        boxProps={{mb: 's20'}}
      />

      <FormTextInput
        name="firstName"
        control={control}
        label="Nome"
        placeholder="Digite seu nome"
        boxProps={{mb: 's20'}}
      />

      <FormTextInput
        name="lastName"
        control={control}
        label="Sobrenome"
        placeholder="Digite seu sobrenome"
        boxProps={{mb: 's20'}}
      />

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
        boxProps={{mb: 's48'}}
      />

      <Button
        loading={isLoading}
        title="Criar minha conta"
        onPress={handleSubmit(submitForm)}
        disabled={!formState.isValid}
      />
    </Screen>
  );
}
