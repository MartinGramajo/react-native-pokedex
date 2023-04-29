import React from 'react';
import { ActivityIndicator, Platform, View, StyleSheet, Text, FlatList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SearchInput } from '../components/SearchInput';
import { usePokemonSearch } from '../hooks/usePokemonSearch';
import { CustomTitle } from '../components/CustomTitle';
import { PokemonCard } from '../components/PokemonCard';

// Debouncer: cuando el usuario escribe en el input, la acción no se va a disparar hasta que termine de escribir. Esto lo hacemos para evitar que con cada letra que escriba tire y cargue resultados que coincidan con ella.

// Implementaremos un tabs en el navigator. 

export const SearchScreen = () => {
  const { top } = useSafeAreaInsets();

  // utilizamos el hook 
  const { isFetching, simplePokemonList } = usePokemonSearch();

  if (isFetching) {
    return (
      <View style={styles.activityContainer}>
        <ActivityIndicator size={50} color="grey" />
        <Text>
          Cargando...
        </Text>
      </View>
    )
  }

  return (
    <View style={{
      flex: 1,
      marginTop: (Platform.OS === 'ios') ? top : top + 10,
      marginHorizontal: 20
    }}>
      <SearchInput />
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

const styles = StyleSheet.create({
  activityContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});