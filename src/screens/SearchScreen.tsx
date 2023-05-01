import React, { useEffect, useState } from 'react';
import { Platform, View, FlatList, Dimensions, Keyboard, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SearchInput } from '../components/SearchInput';
import { usePokemonSearch } from '../hooks/usePokemonSearch';
import { Loading } from '../components/Loading';
import { SimplePokemon } from '../interfaces/pokemonInterfaces';
import { CustomTitle } from '../components/CustomTitle';
import { PokemonCard } from '../components/PokemonCard';
import { PokeWarning } from '../components/PokeWarning';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

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


    if (isNaN(Number(term))) {
      //Busqueda por nombre
      setPokemonFiltered(
        simplePokemonList.filter(
          (poke) => poke.name.toLocaleLowerCase()
            .includes(term.toLocaleLowerCase()))
      )
      // Busqueda por id#
    } else {
      const pokemonById = simplePokemonList.find((poke) => poke.id === term)
      setPokemonFiltered(
        (pokemonById) ? [pokemonById] : []
      );
    }
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

      {term && pokemonFiltered.length === 0
        ?
        <PokeWarning />

        :
        <ScrollView
          scrollEnabled={false}
          contentContainerStyle={{ flex: 1 }}
        >
          <FlatList
            data={pokemonFiltered}
            keyExtractor={(pokemon) => pokemon.id}
            numColumns={2}
            ListHeaderComponent={<CustomTitle title={term} />}

            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <PokemonCard pokemon={item} />
            )}
          />
        </ScrollView>

      }


    </View>
  );
};

