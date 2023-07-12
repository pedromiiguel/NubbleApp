import React, {useRef} from 'react';
import {
  Pressable,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  TextStyle,
} from 'react-native';

import {useAppTheme} from '@hooks';

import {Box, BoxProps} from '../Box/Box';
import {$fontFamily, $fontSizes, Text} from '../Text/Text';

export interface TextInputProps extends RNTextInputProps {
  label: string;
  errorMessage?: string;
  rightComponent?: React.ReactElement;
  boxProps?: BoxProps;
}

export function TextInput({
  label,
  errorMessage,
  rightComponent,
  boxProps,
  ...rnTextInputProps
}: TextInputProps) {
  const {colors} = useAppTheme();

  const inputRef = useRef<RNTextInput>(null);

  const $textInputContainer: BoxProps = {
    borderWidth: errorMessage ? 2 : 1,
    padding: 's16',
    borderColor: errorMessage ? 'error' : 'gray4',
    borderRadius: 's12',
  };

  function focusInput() {
    inputRef.current?.focus();
  }

  return (
    <Box {...boxProps}>
      <Pressable onPress={focusInput}>
        <Text mb="s4" preset="paragraphMedium">
          {label}
        </Text>
        <Box {...$textInputContainer} flexDirection="row">
          <RNTextInput
            autoCapitalize="none"
            ref={inputRef}
            style={$textInputStyle}
            {...rnTextInputProps}
            placeholderTextColor={colors.gray2}
          />
          {!!rightComponent && (
            <Box ml="s16" justifyContent="center">
              {rightComponent}
            </Box>
          )}
        </Box>
        {!!errorMessage && (
          <Text preset="paragraphSmall" bold color="error">
            {errorMessage}
          </Text>
        )}
      </Pressable>
    </Box>
  );
}

const $textInputStyle: TextStyle = {
  padding: 0,
  flexGrow: 1,
  flexShrink: 1,
  fontFamily: $fontFamily.regular,
  ...$fontSizes.paragraphMedium,
};
