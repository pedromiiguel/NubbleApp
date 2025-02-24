import React from 'react';
import {GestureResponderEvent} from 'react-native';

import {User} from '@domain';

import {
  Box,
  PressableBox,
  PressableBoxProps,
  ProfileAvatar,
  ProfileAvatarProps,
  Text,
} from '@components';
import {useAppNavigation} from '@hooks';

type ProfileUserProps = {
  user: Pick<User, 'username' | 'profileUrl' | 'id'>;
  avatarProps?: Omit<Partial<ProfileAvatarProps>, 'imageURL'>;
  RightComponent?: React.ReactNode;
} & PressableBoxProps;

export function ProfileUser({
  user,
  avatarProps,
  onPress,
  RightComponent,
  ...pressableBoxProps
}: ProfileUserProps) {
  const navigate = useAppNavigation();

  function handleOnPress(event: GestureResponderEvent) {
    if (onPress) {
      onPress(event);
    }
    navigate.toProfile(user.id);
  }

  return (
    <PressableBox
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      mb="s16"
      onPress={handleOnPress}
      {...pressableBoxProps}>
      <Box flexDirection="row" alignItems="center">
        <ProfileAvatar
          {...avatarProps}
          imageURL={user.profileUrl}
          authorId={user.id}
        />

        <Text ml="s12" preset="paragraphMedium" semiBold>
          {user.username}
        </Text>
      </Box>
      {RightComponent}
    </PressableBox>
  );
}
