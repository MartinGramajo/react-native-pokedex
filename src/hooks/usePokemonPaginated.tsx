import { useEffect, useRef, useState } from 'react';
import { pokemonApi } from '../api/pokemonApi';
import { PokemonPaginatedResponse, SimplePokemon } from '../interfaces/pokemonInterfaces';

export const usePokemonPaginated = () => {

  //Creamos un state para guardar la resp de los pokemon
  const [simplePokemonList, setSimplePokemonList] = useState<SimplePokemon[]>([]);

  // Usamos useRef para guardar la referencia de Pokemon con el limit en 40
  // Esto nos servira mas adelante para hacer el infinite scroll.  
  const nextPageUrl = useRef('https://pokeapi.co/api/v2/pokemon?limit=40');


  // Creamos una función para cargar el response de los pokemon
  const loadPokemons = async () => {
    // Utilizamos el pedido de pokemonApi.tsx
    // Tipamos el pedido de pokemonApi con la interfaces que creamos previamente.
    const resp = await pokemonApi.get<PokemonPaginatedResponse>(nextPageUrl.current);

    // Guardamos la resp de la data de la siguiente pagina en nuestro useRef.
    nextPageUrl.current = resp.data.next;

    // Llamamos nuestra function a la cual le pasamos por parámetro
    // el resultado de la resp.data
    mapPokemonList(resp.data.results);
  };

  // Function para procesar la info de la resp.data
  // Esta función tendrá el objetivo de construir mi arreglo de simplePokemonList[]
  const mapPokemonList = (pokemonList: Result[]) => {
    pokemonList.forEach(poke => console.log(poke.name))
  }

  // Con un useEffect llamamos la función loadPokemon()
  useEffect(() => {
    loadPokemons();
  }, [])
}
