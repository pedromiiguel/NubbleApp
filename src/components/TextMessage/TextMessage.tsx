import React, {useRef} from 'react';
import {
  Pressable,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
} from 'react-native';

import {useAppTheme} from '@hooks';

import {Box} from '../Box/Box';
import {Text} from '../Text/Text';
import {$textInputStyle} from '../TextInput/TextInput';

interface TextMesssageProps extends RNTextInputProps {
  onPressSend: (message: string) => void;
}

export function TextMesssage({
  onPressSend,
  value,
  ...rnTextInputProps
}: TextMesssageProps) {
  const inputRef = useRef<RNTextInput>(null);
  const {colors} = useAppTheme();

  function focusInput() {
    inputRef.current?.focus();
  }

  const sendIsDisabled = value?.trim().length === 0;
  return (
    <Pressable onPress={focusInput}>
      <Box
        paddingHorizontal="s16"
        paddingVertical="s14"
        backgroundColor="gray5"
        borderRadius="s12"
        justifyContent="space-between"
        alignItems="center"
        flexDirection="row">
        <RNTextInput
          value={value}
          ref={inputRef}
          style={[$textInputStyle, {color: colors.gray1}]}
          {...rnTextInputProps}
          placeholderTextColor={colors.gray2}
        />
        <Pressable
          onPress={() => onPressSend(value || '')}
          disabled={sendIsDisabled}>
          <Text color={sendIsDisabled ? 'gray2' : 'primary'} bold>
            Enviar
          </Text>
        </Pressable>
      </Box>
    </Pressable>
  );
}
