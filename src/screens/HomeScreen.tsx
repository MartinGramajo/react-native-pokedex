import React from 'react';
import { Image } from 'react-native';
import { styles } from '../theme/appTheme';
import { CustomTitle } from '../components/CustomTitle';
import { usePokemonPaginated } from '../hooks/usePokemonPaginated';


export const HomeScreen = () => {

  usePokemonPaginated();

  return (
    <>
      <Image
        source={require('../assets/pokebola.png')}
        style={styles.pokebolaBG}
      />
      <CustomTitle title="Pokedex" />
    </>
  );
};
