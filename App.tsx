import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
// import { Navigator } from './src/navigator/Navigator';
import { Tabs } from './src/navigator/Tabs';

export const App = () => {
  return (
    <NavigationContainer >
      {/* {/* <Navigator /> */}
      {/* Mostramos el Tab  */}
      <Tabs />
    </NavigationContainer >
  );
};

export default App;