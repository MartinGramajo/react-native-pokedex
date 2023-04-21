import React from 'react';
import { ActivityIndicator, FlatList, Image, Text } from 'react-native';
import { styles } from '../theme/appTheme';
import { CustomTitle } from '../components/CustomTitle';
import { usePokemonPaginated } from '../hooks/usePokemonPaginated';
import { FadeInImage } from '../components/FadeInImage';


export const HomeScreen = () => {

  const { simplePokemonList, loadPokemons } = usePokemonPaginated();
  console.log("file: HomeScreen.tsx:11 ~ HomeScreen ~ simplePokemonList:", simplePokemonList)

  return (
    <>
      <Image
        source={require('../assets/pokebola.png')}
        style={styles.pokebolaBG}
      />
      {/* <CustomTitle title="Pokedex" /> */}
      {/* Con Flatlist vamos a mostrar la data en pantalla  */}
      <FlatList
        data={simplePokemonList}
        keyExtractor={(pokemon) => pokemon.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          // En lugar de utilizar una Image 
          // utilizamos el useAnimation & FadeInImage
          // que creamos en clases anteriores.
          <FadeInImage
            uri={item.picture}
            style={{
              width: 100,
              height: 100
            }}
          />
          // <Image
          //   source={{ uri: item.picture }}
          //   style={{ width: 100, height: 100 }}
          // />
        )}

        //Infinite scroll 
        onEndReached={loadPokemons}
        // Lo utilizamos para determinar a que nivel de la pantalla
        // mostraremos el spinner de carga(ActivityIndicator)
        // Esto equivale al 40% de la pantalla.
        onEndReachedThreshold={0.4}

        ListFooterComponent={<ActivityIndicator
          style={{ height: 100 }}
          size={20}
          color="grey"
        />}
      />
    </>
  );
};
