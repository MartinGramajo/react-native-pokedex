// Implementacion de debounce 
// Me permite que el usuario pueda realizar la busqueda con los valores ingresado 
// se puede incorporar tmb por medio de una LIBRERIA (INPUT + DEBOUNCE)

import { useEffect, useState } from "react"

// Por parametros tendremos 
// 1- El input: tipado en string 
// 2- el tiempo de espera para que la persona deje de escribir 
// para lanzar la busqueda.

export const useDebouncedValue = (input: string = '', time: number = 500) => {
  // state del valor del input
  const [debouncedValue, setDebouncedValue] = useState(input);

  // la magia sucede en el useEffect
  // Este useEffect se tiene que disparar cuando la persona 
  // deje de escribir, es decir, cuando el input cambie.
  useEffect(() => {
    // lo almacenamos en una variable.
    // esto nos permite que si el setTimeout() produce algun cambio
    // va a disparar el return.
    const timeout = setTimeout(() => {
      // aqui seteamos el state con el 
      //valor del input ingresado por el usuario
      setDebouncedValue(input);
    }, time)

    // Este return esta por si se produce un cambio por parte 
    // del setTimeout() y lo que hace es limpiar.
    return () => {
      clearTimeout(timeout);
    }

  }, [input]);

  return debouncedValue;

}
