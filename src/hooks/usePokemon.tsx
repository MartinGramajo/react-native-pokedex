import { useState, useEffect } from 'react';
import { PokemonFull } from '../interfaces/pokemonInterfaces';
import { pokemonApi } from '../api/pokemonApi';

// Hook para traer cualquier informacion del pokemon.
export const usePokemon = (id: string) => {
  // state de carga de data
  const [isLoading, setIsLoading] = useState(true);

  //state con la info del pokemon
  const [pokemon, setPokemon] = useState<PokemonFull>({} as PokemonFull);

  // función para la peticion http
  const loadPokemon = async () => {
    const resp = await pokemonApi.get<PokemonFull>(`https://pokeapi.co/api/v2/pokemon/${id}`)
    setPokemon(resp.data);
    setIsLoading(false);
  }

  // useEffect para llamar la función que trae la data
  useEffect(() => {
    loadPokemon();
  }, []);


  return {
    isLoading,
    pokemon
  }
};
