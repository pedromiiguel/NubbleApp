import React, {useRef, useState} from 'react';

import {useUserGetById} from '@domain';

import {Button, InputButton, Screen} from '@components';
import {AppScreenProps} from '@routes';

import {EditProfileForm, EditProfileRef} from './components/EditProfileForm';
import {EditProfileHeader} from './components/EditProfileHeader';

export function EditProfileScreen({
  route,
  navigation,
}: AppScreenProps<'EditProfileScreen'>) {
  const userId = route.params?.userId;
  const {user} = useUserGetById(userId);

  const formRef = useRef<EditProfileRef>(null);

  const [formIsValid, setFormIsValid] = useState(false);

  function submitForm() {
    //TODO:
    formRef.current?.onSubmit();
  }

  return (
    <Screen canGoBack scrollable title="Editar Perfil">
      <EditProfileHeader mb="s24" user={user} />
      {user && (
        <EditProfileForm
          ref={formRef}
          user={user}
          onChangeIsValid={setFormIsValid}
        />
      )}

      {user && (
        <>
          <InputButton
            label="email"
            value={user?.email}
            mb="s16"
            onPress={() =>
              navigation.navigate('EditEmailScreen', {
                userId,
              })
            }
          />
          <InputButton
            label="Senha"
            value="•••••••"
            onPress={() =>
              navigation.navigate('EditPasswordScreen', {
                userId,
              })
            }
          />
        </>
      )}

      <Button
        mt="s40"
        title="Salvar Alterações"
        onPress={submitForm}
        disabled={!formIsValid}
      />
    </Screen>
  );
}
