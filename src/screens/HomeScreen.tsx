import React from 'react';
import { ActivityIndicator, FlatList, Image, View } from 'react-native';
import { styles } from '../theme/appTheme';
import { CustomTitle } from '../components/CustomTitle';
import { usePokemonPaginated } from '../hooks/usePokemonPaginated';
// import { FadeInImage } from '../components/FadeInImage';
import { PokemonCard } from '../components/PokemonCard';


export const HomeScreen = () => {

  const { simplePokemonList, loadPokemons } = usePokemonPaginated();

  return (
    <>
      <Image
        source={require('../assets/pokebola.png')}
        style={styles.pokebolaBG}
      />
      {/* <CustomTitle title="Pokedex" /> */}
      {/* Con Flatlist vamos a mostrar la data en pantalla  */}
      <View style={{
        // Quitamos el global margin porque hacia scroll lateral en IOS.
        // ...styles.globalMargin,
        alignItems: 'center'
      }}>
        <FlatList
          data={simplePokemonList}
          keyExtractor={(pokemon) => pokemon.id}
          numColumns={2}
          showsVerticalScrollIndicator={false}

          // Header 
          ListHeaderComponent={<CustomTitle title='Pokedex' />}

          renderItem={({ item }) => (
            <PokemonCard pokemon={item} />
            // En lugar de utilizar una Image 
            // utilizamos el useAnimation & FadeInImage
            // que creamos en clases anteriores.
            // <FadeInImage
            //   uri={item.picture}
            //   style={{
            //     width: 100,
            //     height: 100
            //   }}
            // />
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
      </View>
    </>
  );
};
