import React from 'react';

import {useFollowUser} from '@domain';
import {useNavigation} from '@react-navigation/native';

import {Button, ButtonProps} from '../../Button/Button';

type ButtonVariant = 'myProfile' | 'isFollowing' | 'isNotFollowing' | 'loading';

const buttonVariants: Record<
  ButtonVariant,
  Pick<ButtonProps, 'title' | 'preset' | 'loading'>
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
  loading: {
    title: 'Carregando...',
    preset: 'outline',
    loading: true,
  },
};

type ProfileButtonProps = {
  userId: number;
  isMyProfile?: boolean;
  isFollowing?: boolean;
};

export function ProfileButton({
  userId,
  isFollowing,
  isMyProfile,
}: ProfileButtonProps) {
  const navigation = useNavigation();
  const {followUser, isLoading} = useFollowUser();

  const variant = getVariant({isFollowing, isMyProfile, isLoading});
  const buttonProps = buttonVariants[variant];

  function handleOnPress() {
    switch (variant) {
      case 'isFollowing':
        // navigation.navigate('ChatScreen', {userId});
        break;
      case 'isNotFollowing':
        followUser(userId);
        break;
      case 'myProfile':
        navigation.navigate('EditProfileScreen', {userId});
    }
  }

  return (
    <Button {...buttonProps} onPress={handleOnPress} marginVertical="s24" />
  );
}

function getVariant({
  isMyProfile,
  isFollowing,
  isLoading,
}: Pick<ProfileButtonProps, 'isMyProfile' | 'isFollowing'> & {
  isLoading: boolean;
}): ButtonVariant {
  if (isLoading) {
    return 'loading';
  }

  if (isMyProfile) {
    return 'myProfile';
  }

  if (isFollowing) {
    return 'isFollowing';
  }

  return 'isNotFollowing';
}
