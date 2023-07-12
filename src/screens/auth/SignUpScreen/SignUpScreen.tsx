import React from 'react';
import {zodResolver} from '@hookform/resolvers/zod';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '@routes';
import {useResetNavigationSuccess} from '@hooks';
import {useForm} from 'react-hook-form';
import {SignUpSchema, signUpSchema} from './signUpSchema';
import {
  FormTextInput,
  FormPasswordInput,
  Screen,
  Text,
  Button,
} from '@components';

type ScreenProps = NativeStackScreenProps<RootStackParamList, 'SignUpScreen'>;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function SignUpScreen({navigation}: ScreenProps) {
  const {reset} = useResetNavigationSuccess();
  const {control, handleSubmit, formState} = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: '',
      fullName: '',
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  function submitForm(values: SignUpSchema) {
    console.log(values);
    reset({
      title: 'Sua conta foi criada com sucesso!',
      description: 'Agora é só fazer login na nossa plataforma',
      icon: {
        name: 'checkRound',
        color: 'success',
      },
    });
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
        name="fullName"
        control={control}
        label="Nome completo"
        placeholder="Digite seu nome"
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
        title="Criar minha conta"
        onPress={handleSubmit(submitForm)}
        disabled={!formState.isValid}
      />
    </Screen>
  );
}
