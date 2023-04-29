import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Navigator } from './Navigator';
import { SearchScreen } from '../screens/SearchScreen';
import { Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

//NOTA: al implementar un Tab y tener un navigator como pantalla 
// principal debemos mostrar el navigator.
// Ademas tenemos que hacer la modificación correspondiente
// en el app.tsx

const Tab = createBottomTabNavigator();

export const Tabs = () => {
  return (
    <Tab.Navigator
      sceneContainerStyle={{
        backgroundColor: 'white'
      }}
      // Se utiliza screenOptions para la personalización del tab
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#5856D6',
        tabBarLabelStyle: {
          marginBottom: Platform.OS === 'ios' ? 0 : 15,
        },
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: 'rgba(255,255,255,0.92)',
          borderWidth: 0,
          elevation: 0,
          height: (Platform.OS === 'ios') ? 80 : 60,
        },
      }}
    >
      <Tab.Screen
        name="HomeScreen"
        component={Navigator}
        options={{
          tabBarLabel: "listado",
          tabBarIcon: ({ color }) => (
            <Icon
              color={color}
              size={25}
              name="list-outline" />
          )
        }}
      />
      <Tab.Screen
        name="PokemonScreen"
        component={SearchScreen}
        options={{
          tabBarLabel: "Busqueda",
          tabBarIcon: ({ color }) => (
            <Icon
              color={color}
              size={25}
              name="search-outline" />
          )
        }}

      />
    </Tab.Navigator>
  );
}
