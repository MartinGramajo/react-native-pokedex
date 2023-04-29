import React from 'react';
import { View, StyleSheet, Platform, StyleProp, ViewStyle } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';

//Pre carga de la información.
// al no tener una búsqueda por nombre sino que por nombre exacto 
// tenemos que que buscar una solución para ello.
// creamos un hook 

// Tipamos el style para solucionar el problema del notch 
// de esta forma los pokemon al hacer scroll
// estarán por detrás de la barra de búsqueda.

// style? = primero es opcional 
// tipo: StyleProp (al ser un generico debemos tiparlo)
// <ViewStyle> : debemos especificar el tipo de elemento
// para el cual estamos esperando los style.
interface Props {
  style?: StyleProp<ViewStyle>
}



export const SearchInput = ({ style }: Props) => {
  return (
    <View style={{
      ...styles.container,
      ...style as any
    }}>
      <View style={styles.textBackground}>
        <TextInput
          placeholder='Buscar Pokemon'
          style={{
            ...styles.textInput,
            top: (Platform.OS === 'ios') ? 0 : 1
          }}
          autoCapitalize='none'
          autoCorrect={false}
        />

        <Icon
          name="search-outline"
          color="grey"
          size={20}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'red'
  },
  textBackground: {
    backgroundColor: '#F3F1F3',
    borderRadius: 50,
    height: 40,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,

  },
  textInput: {
    flex: 1,
    fontSize: 18,
  }
});
