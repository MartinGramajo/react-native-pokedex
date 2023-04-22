import React from 'react'
import { Text, View } from 'react-native';
import { RootStackParams } from '../navigator/Navigator';
import { StackScreenProps } from '@react-navigation/stack';

// extendemos la props
// en el stackScreenProps(el cual tenemos importar) debemos pasarle 2 argumentos: 
// 1- el rootStackParams : el cual lo debemos importar.
// 2- la pantalla en donde estoy actualmente, es decir, la pagina de detalle.

interface Props extends StackScreenProps<RootStackParams, 'PokemonScreen'> { };

export const PokemonScreen = ({ navigation, route }: Props) => {
  // desestructuramos del route params: 
  // simplepokemon: que contiene la data del pokemon 
  // esto lo definimos en pokemonCard.
  // color: el color del pokemon.
  const { simplePokemon, color } = route.params;

  return (
    <View style={{ backgroundColor: color }}>
      <Text>
        {simplePokemon.name} - {color}
      </Text>
    </View>
  );
};
