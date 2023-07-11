import React from 'react';
import {View} from 'react-native';
import {zodResolver} from '@hookform/resolvers/zod';
import {Button} from '../../../components/Button/Button';
import {Text} from '../../../components/Text/Text';
import {Screen} from '../../../components/Screen/Screen';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../routes/routes';
import {useForm} from 'react-hook-form';
import {FormTextInput} from '../../../components/Form/FormTextInput';
import {FormPasswordInput} from '../../../components/Form/FormPasswordInput';
import {LoginSchema, loginSchema} from './LoginSchema';

type ScreenProps = NativeStackScreenProps<RootStackParamList, 'LoginScreen'>;

export function LoginScreen({navigation}: ScreenProps) {
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

  function submitForm(values: LoginSchema) {
    console.log(values);
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
