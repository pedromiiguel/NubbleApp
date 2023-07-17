import React from 'react';

import {Text} from '@components';
import {AppTabScreenProps} from '@routes';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function MyProfileScreen(props: AppTabScreenProps<'MyProfileScreen'>) {
  return <Text preset="headingSmall">My Profile Screen</Text>;
}
