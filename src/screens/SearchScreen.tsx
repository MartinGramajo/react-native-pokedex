import React from 'react';
import { Platform, View, FlatList, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SearchInput } from '../components/SearchInput';
import { usePokemonSearch } from '../hooks/usePokemonSearch';
import { CustomTitle } from '../components/CustomTitle';
import { PokemonCard } from '../components/PokemonCard';
import { Loading } from '../components/Loading';

// Debouncer: cuando el usuario escribe en el input, la acción no se va a disparar hasta que termine de escribir. Esto lo hacemos para evitar que con cada letra que escriba tire y cargue resultados que coincidan con ella.

// Implementaremos un tabs en el navigator. 

const screenWidth = Dimensions.get('window').width;

export const SearchScreen = () => {
  const { top } = useSafeAreaInsets();

  // utilizamos el hook 
  const { isFetching, simplePokemonList } = usePokemonSearch();

  if (isFetching) {
    return <Loading />
  }

  return (
    <View style={{
      flex: 1,
      marginHorizontal: 20
    }}>

      <SearchInput
        style={{
          position: 'absolute',
          zIndex: 999,
          width: screenWidth - 40,
          top: (Platform.OS === 'ios' ? top : top + 10)
        }}
      />

      <FlatList
        data={simplePokemonList}
        keyExtractor={(pokemon) => pokemon.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={<CustomTitle title='Pokedex' />}
        renderItem={({ item }) => (
          <PokemonCard pokemon={item} />
        )}
      />
    </View>
  );
};

