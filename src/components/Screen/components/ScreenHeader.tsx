import React from 'react';

import {Box, Text, BoxProps} from '@components';

import {BackButton} from '../../BackButton/BackButton';
import {ScreenProps} from '../Screen';

type Props = Pick<ScreenProps, 'title' | 'canGoBack' | 'HeaderComponent'> &
  BoxProps;

const ICON_SIZE = 20;

export function ScreenHeader({
  canGoBack,
  title,
  HeaderComponent,
  ...boxProps
}: Props) {
  if (!title && !canGoBack && !HeaderComponent) {
    return null;
  }

  const showBackLabel = !title && !HeaderComponent;

  return (
    <Box
      mb="s24"
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      {...boxProps}>
      {canGoBack && <BackButton showBackLabel={showBackLabel} />}
      {HeaderComponent}
      {title && <Text preset="headingSmall">{title}</Text>}
      {title && <Box height={ICON_SIZE} width={ICON_SIZE} />}
    </Box>
  );
}
