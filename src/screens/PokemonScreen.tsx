import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, ActivityIndicator } from 'react-native';

import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../navigator/Tab1';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Icon from 'react-native-vector-icons/Ionicons';
import { FadeInImage } from '../components/FadeInImage';
import { usePokemon } from '../hooks/usePokemon';
import { PokemonDetails } from '../components/PokemonDetails';


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

  const { name, id, picture } = simplePokemon;

  const { top } = useSafeAreaInsets();

  // Obtener información extra del Pokemon
  // mediante el hook que creamos
  const { isLoading, pokemon } = usePokemon(id);

  return (
    <View style={{ flex: 1 }}>
      {/* Header Container*/}
      <View style={{
        ...styles.headerContainer,
        backgroundColor: color,
      }}>
        {/* backButton */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.pop()}
          style={{
            ...styles.backButton,
            top: top + 5,
          }}
        >
          <Icon
            name="arrow-back-outline"
            color="white"
            size={35}
          />
        </TouchableOpacity>

        {/* Name Pokemon */}
        <Text style={{
          ...styles.pokemonName,
          top: top + 40
        }}>
          {name + '\n'} #{id}
        </Text>

        {/* Pokebola blanca */}
        <Image
          source={require('../assets/pokebola-blanca.png')}
          style={
            styles.pokeball
          }
        />

        <FadeInImage
          uri={picture}
          style={styles.pokemonImage}
        />

      </View>
      {/* Detalles y Loading */}
      {isLoading
        ? (
          <View style={styles.loadingIndicator}>
            <ActivityIndicator
              color={color}
              size={50}
            />
          </View>
        ) : <PokemonDetails pokemon={pokemon} />
      }




    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 370,
    zIndex: 999,
    alignItems: 'center',
    borderBottomRightRadius: 1000,
    borderBottomLeftRadius: 1000
  },
  backButton: {
    position: 'absolute',
    left: 20
  },
  pokemonName: {
    color: 'white',
    fontSize: 30,
    alignSelf: 'flex-start',
    left: 20
  },
  pokeball: {
    width: 250,
    height: 250,
    bottom: -30,
    opacity: 0.7
  },
  pokemonImage: {
    width: 250,
    height: 250,
    position: 'absolute',
    bottom: -20
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});