import React, { useState, useEffect, useRef } from 'react';
import ImageColors from 'react-native-image-colors';
import { Text, TouchableOpacity, View, StyleSheet, Dimensions, Image } from 'react-native';
import { SimplePokemon } from '../interfaces/pokemonInterfaces';
import { FadeInImage } from './FadeInImage';


const windowWidth = Dimensions.get('window').width

interface Props {
  pokemon: SimplePokemon;
}



export const PokemonCard = ({ pokemon }: Props) => {
  // Creamos un estado para colocar el bg a la card Pokemon
  const [bgColor, setBgColor] = useState('grey');

  //Solución al problema del scroll rápido o warning en pantalla.
  // El problema: al no montarse el componente 
  // nos tira un warning en la pantalla.
  // Utilizamos un useRef (no dispara una re renderizacion.
  const isMounted = useRef(true);


  // function que utilizamos en la App de peliculas. 
  // para tomar el color de la imagen.
  // const getImageColors = async (uri: string) => {
  //   const colors = await ImageColors.getColors(uri, {});

  //   let primary;

  //   switch (colors.platform) {
  //     case 'android':
  //       primary = colors.dominant;

  //       break;

  //     case 'ios':
  //       primary = colors.primary;

  //     default:
  //       break;
  //   }
  //   setBgColor(primary || 'grey');

  //   return [primary];
  // }


  // // Usamos UseEffects para disparar el procedimiento de la libreria
  useEffect(() => {
    ImageColors.getColors(pokemon.picture, { fallback: 'grey' })
      .then(colors => {
        if (!isMounted.current) return;

        (colors.platform === 'android')
          ? setBgColor(colors.dominant || 'grey')
          : setBgColor(colors.background || 'grey')
      })
    return () => {
      isMounted.current = false
    }
    // getImageColors(pokemon.picture);
  }, []);


  return (
    <TouchableOpacity
      activeOpacity={0.9}
    >
      <View style={{
        ...styles.cardContainer,
        width: windowWidth * 0.4,
        backgroundColor: bgColor

      }}>
        {/* Nombre del pokemon y ID */}
        <View>
          <Text style={styles.name}>
            {pokemon.name}
            {'\n#' + pokemon.id}
          </Text>
        </View>
      </View>

      {/* Pokebola bg */}
      <View style={styles.pokebolaContainer}>
        <Image
          source={require('../assets/pokebola-blanca.png')}
          style={styles.pokebola}
        />
      </View>

      <FadeInImage
        uri={pokemon.picture}
        style={styles.pokemonImage}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 10,
    backgroundColor: 'grey',
    height: 120,
    width: 150,
    marginBottom: 25,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  name: {
    color: 'blue',
    fontSize: 16,
    fontWeight: 'bold',
    top: 20,
    left: 10
  },
  pokebolaContainer: {
    width: 100,
    height: 100,
    position: 'absolute',
    right: 0,
    bottom: 26,
    opacity: 0.5,
  },
  pokebola: {
    width: 100,
    height: 100,
    position: 'absolute',
    right: -20,
    bottom: -20,
    overflow: 'hidden',
  },
  pokemonImage: {
    width: 100,
    height: 100,
    position: 'absolute',
    right: -2,
    bottom: 8,
  }
});