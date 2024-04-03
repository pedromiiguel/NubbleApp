import React from 'react';

import {Box, ProgressIndicator, Text} from '@components';

import {OnboardingPageItem} from '../onboardingData';

type ContentProps = Omit<OnboardingPageItem, 'image'>;

export function Content({title, subtitle, total, index}: ContentProps) {
  return (
    <Box>
      <ProgressIndicator total={total} currentIndex={index} mb="s24" />
      <Text preset="headingLarge" mb="s16">
        {title.map(({text, highlight}, _index) => (
          <Text
            key={_index}
            preset="headingLarge"
            color={highlight ? 'carrotSecondary' : 'backgroundContrast'}>
            {text}
          </Text>
        ))}
      </Text>
      <Text preset="paragraphLarge">{subtitle}</Text>
    </Box>
  );
}
