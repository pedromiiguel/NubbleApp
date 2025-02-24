import React from 'react';

import {useNavigation} from '@react-navigation/native';

import {Button, ButtonProps} from '../../Button/Button';

type ButtonVariant = 'myProfile' | 'isFollowing' | 'isNotFollowing';

const buttonVariants: Record<
  ButtonVariant,
  Pick<ButtonProps, 'title' | 'preset'>
> = {
  myProfile: {
    title: 'Editar perfil',
    preset: 'gray',
  },
  isFollowing: {
    title: 'Mensagem',
    preset: 'primary',
  },
  isNotFollowing: {
    title: 'Seguir',
    preset: 'outline',
  },
};

type ProfileButtonProps = {
  isMyProfile?: boolean;
  isFollowing?: boolean;
};

export function ProfileButton({isFollowing, isMyProfile}: ProfileButtonProps) {
  const navigation = useNavigation();

  const variant = getVariant({isFollowing, isMyProfile});
  const buttonProps = buttonVariants[variant];

  function handleOnPress() {
    if (isMyProfile) {
      navigation.navigate('EditProfileScreen');
    }
  }

  return (
    <Button {...buttonProps} onPress={handleOnPress} marginVertical="s24" />
  );
}

function getVariant({
  isMyProfile,
  isFollowing,
}: Pick<ProfileButtonProps, 'isMyProfile' | 'isFollowing'>): ButtonVariant {
  if (isMyProfile) {
    return 'myProfile';
  }

  if (isFollowing) {
    return 'isFollowing';
  }

  return 'isNotFollowing';
}
