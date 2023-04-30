import React, { useEffect, useState } from 'react';
import { Platform, View, FlatList, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SearchInput } from '../components/SearchInput';
import { usePokemonSearch } from '../hooks/usePokemonSearch';
import { CustomTitle } from '../components/CustomTitle';
import { PokemonCard } from '../components/PokemonCard';
import { Loading } from '../components/Loading';
import { SimplePokemon } from '../interfaces/pokemonInterfaces';

// Debouncer: cuando el usuario escribe en el input, la acción no se va a disparar hasta que termine de escribir. Esto lo hacemos para evitar que con cada letra que escriba tire y cargue resultados que coincidan con ella.

// Implementaremos un tabs en el navigator. 

const screenWidth = Dimensions.get('window').width;

export const SearchScreen = () => {
  const { top } = useSafeAreaInsets();

  // utilizamos el hook 
  const { isFetching, simplePokemonList } = usePokemonSearch();

  // Array para el filtrado
  const [pokemonFiltered, setPokemonFiltered] = useState<SimplePokemon[]>([]);

  // state para el termino del busqueda
  const [term, setTerm] = useState('pikachu');

  // UseEffect del filtrado
  useEffect(() => {
    if (term.length === 0) {
      return setPokemonFiltered([]);
    }
    setPokemonFiltered(
      simplePokemonList.filter(
        (poke) => poke.name.toLocaleLowerCase()
          .includes(term.toLocaleLowerCase()))
    )
  }, [term]);


  if (isFetching) {
    return <Loading />
  }

  return (
    <View style={{
      flex: 1,
      marginHorizontal: 20
    }}>

      <SearchInput
        // Function para conectar con el debounced 
        // la mandamos por props y la agregamos 
        // en la interface de searchScreen
        onDebounce={(value) => setTerm(value)}

        style={{
          position: 'absolute',
          zIndex: 999,
          width: screenWidth - 40,
          top: (Platform.OS === 'ios' ? top : top + 10)
        }}
      />

      <FlatList
        data={pokemonFiltered}
        keyExtractor={(pokemon) => pokemon.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={<CustomTitle title={term} />}
        renderItem={({ item }) => (
          <PokemonCard pokemon={item} />
        )}
      />
    </View>
  );
};

