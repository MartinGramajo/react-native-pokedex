import React from 'react';
import { Image, Text, View } from 'react-native';

export const PokeWarning = () => {
  return (
    <View
      style={{
        paddingTop: 60,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Image
        source={require('../assets/poke-warning.jpg')}
        style={{
          opacity: 0.7,

          width: 240,
          height: 210,
        }}
      />
      <Text style={{ fontSize: 20, marginTop: 10 }}>
        Pokemon no encontrado
      </Text>
    </View>
  );
};
