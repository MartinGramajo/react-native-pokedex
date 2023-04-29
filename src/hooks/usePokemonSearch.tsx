import { useEffect, useRef, useState } from 'react';
import { pokemonApi } from '../api/pokemonApi';
import { PokemonPaginatedResponse, Result, SimplePokemon } from '../interfaces/pokemonInterfaces';

export const usePokemonSearch = () => {
  //Agregamos un state para TRAER TODA LA DATA DE LOS POKEMON PARA LA BUSQUEDA
  const [isFetching, setIsFetching] = useState(true);

  //Creamos un state para guardar la resp de los pokemon
  const [simplePokemonList, setSimplePokemonList] = useState<SimplePokemon[]>([]);

  // Creamos una función para cargar el response de los pokemon
  const loadPokemons = async () => {
    // Tipamos el pedido de pokemonApi con la interfaces que creamos previamente.
    // NUEVO: pasamos la url con el limit.
    const resp = await pokemonApi.get<PokemonPaginatedResponse>(`https://pokeapi.co/api/v2/pokemon?limit=1200`);
    mapPokemonList(resp.data.results);
  };

  // Function para procesar la info de la resp.data
  // Esta función tendrá el objetivo de construir mi arreglo de simplePokemonList[]
  const mapPokemonList = (pokemonList: Result[]) => {
    // Creamos un nuevo array de Pokemon
    // de tipo SimplePokemon[]
    // hacemos un map del pokemonList 
    // desestructuramos name y url.
    const newPokemonList: SimplePokemon[] = pokemonList.map(({ name, url }) => {
      // utilizamos el metodo split para cortar el url.
      // con esto buscamos tomar por separado el id del pokemon en cada url.
      // al utilizar split el url nos queda de la siguiente forma dividido:
      // ["https:", "", "pokeapi.co", "api", "v2", "pokemon", "200", ""]
      // vamos a tomar el id que esta en penúltima posición
      // y guardarlo en una variable.
      const urlParts = url.split('/');
      // Con esto extraemos el id.
      const id = urlParts[urlParts.length - 2];

      // Con esto capturamos el picture de cada pokemon 
      // de forma dinámica al usar el id en la url.
      const picture = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

      // Ahora la function debe retornar un elemento de tipo SimplePokemon[]
      // es decir, debe tener un id,name y picture. 
      return { id, picture, name }
    });
    // Ahora debemos actualizar simplePokemonList
    // para ellos tenemos que utilizar setSimplePokemonList
    // conservar la lista anterior y pasar la nueva Lista. 
    //NOTA: al colocar de esta forma acumulamos los pokemons que ya teniamos guardados y agregamos la nueva lista.
    setSimplePokemonList(newPokemonList);
    setIsFetching(false);
  };

  // Con un useEffect llamamos la función loadPokemon()
  useEffect(() => {
    // esta function la usamos para el infinite scroll
    loadPokemons();
  }, []);

  // exponemos los nuevos state.
  // Nos vamos a HomeScreen!!!
  return {
    isFetching,
    simplePokemonList,
  };
};
