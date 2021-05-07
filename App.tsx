import 'react-native-gesture-handler';

import React from 'react'
import { View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { StackNavigator } from './src/navigator/StackNavigator';
import { PermissionsProvider } from './src/context/PermissionsContext';

const App = () => {
  return (
    <AppState>
      <NavigationContainer>
          <StackNavigator />
      </NavigationContainer>
    </AppState>
  )
}

const AppState = ({ children } : any ) => {
  return (
    <PermissionsProvider>
      { children }
    </PermissionsProvider>
  )
}

export default App;
  