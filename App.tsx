import React from 'react';

import {SafeAreaView, View} from 'react-native';

import {Text} from './src/components/Text/Text';
import {ThemeProvider} from '@shopify/restyle';
import {theme} from './src/theme/theme';

function App(): JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <SafeAreaView>
        <View>
          <Text preset="headingLarge" italic>
            Hello World Teste
          </Text>
        </View>
      </SafeAreaView>
    </ThemeProvider>
  );
}

export default App;
