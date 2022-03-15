/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import MainScreen from './src/MainScreen';
import PageOne from './src/PageOne';
import PageTwo from './src/PageTwo';
import PageThree from './src/PageThree';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'MainScreen'}>
        <Stack.Screen name={'MainScreen'} component={MainScreen} />
        <Stack.Screen name={'PageOne'} component={PageOne} />
        <Stack.Screen name={'PageTwo'} component={PageTwo} />
        <Stack.Screen name={'PageThree'} component={PageThree} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
