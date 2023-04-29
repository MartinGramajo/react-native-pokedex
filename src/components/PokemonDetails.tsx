import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { PokemonFull } from '../interfaces/pokemonInterfaces';
import { ScrollView } from 'react-native-gesture-handler';
import { FadeInImage } from './FadeInImage';
import { useNavigation } from '@react-navigation/native';


interface Props {
  pokemon: PokemonFull;
}

export const PokemonDetails = ({ pokemon }: Props) => {
  const { navigate } = useNavigation();
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        ...StyleSheet.absoluteFillObject,
      }}
    >
      {/* Types y peso*/}
      <View style={{
        ...styles.container,
        marginTop: 370,
      }}>

        <Text style={styles.title}> Types</Text>
        <View style={{ flexDirection: 'row' }}>
          {/* NOTA: De esta forma traemos los datos de un arreglo */}
          {
            pokemon.types.map(({ type }) => (
              <Text style={{
                ...styles.regularText,
                marginRight: 10
              }}
                key={type.name}
              >
                {type.name}
              </Text>
            ))
          }

        </View>
      </View>
      {/* Weight and Exp*/}
      <View style={{ flexDirection: 'row' }}>
        <View style={{
          ...styles.container,
          marginTop: 20
        }}>
          <Text style={styles.title}> Weight</Text>
          <Text style={styles.regularText}> {pokemon.weight} Kg</Text>
        </View>
        {/* Experience */}
        <View style={{
          ...styles.container,
          marginTop: 20
        }}>
          <Text style={styles.title}> Exp Base</Text>
          <Text style={styles.regularText}> {pokemon.base_experience}</Text>
        </View>
      </View>

      {/* Sprites */}
      <View style={{
        ...styles.container,
        marginTop: 20
      }}>
        <Text style={styles.title}> Sprites</Text>
      </View>

      {/* Para la lista se puede usar un FlatList o un Scrollview */}
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        <FadeInImage
          uri={pokemon.sprites.front_default}
          style={styles.basicSprite}
        />
        <FadeInImage
          uri={pokemon.sprites.back_default}
          style={styles.basicSprite}
        />
        <FadeInImage
          uri={pokemon.sprites.front_shiny}
          style={styles.basicSprite}
        />
        <FadeInImage
          uri={pokemon.sprites.back_shiny}
          style={styles.basicSprite}
        />
      </ScrollView>
      {/* Abilities */}
      <View style={styles.container}>
        <Text style={styles.title}> Abilities Base</Text>
        <View style={{ flexDirection: 'row' }}>
          {
            pokemon.abilities.map(({ ability }) => (
              <Text style={{
                ...styles.regularText,
                marginRight: 10
              }}
                key={ability.name}
              >
                {ability.name}
              </Text>
            ))
          }
        </View>
      </View>

      {/* Moves */}
      <View style={styles.container}>
        <Text style={styles.title}> Moves</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {/* NOTA: De esta forma traemos los datos de un arreglo */}
          {
            pokemon.moves.map(({ move }) => (
              <Text style={{
                ...styles.regularText,
                marginRight: 10
              }}
                key={move.name}
              >
                {move.name}
              </Text>
            ))
          }
        </View>
      </View>

      {/* Stats */}
      <View style={styles.container}>
        <Text style={styles.title}> Stats</Text>
        <View >
          {
            pokemon.stats.map((stat, i) => (
              <View
                style={{ flexDirection: 'row' }}
                key={stat.stat.name + i} >
                <Text style={{
                  ...styles.regularText,
                  marginRight: 10,
                  width: 150
                }}
                  key={stat.stat.name}
                >
                  {stat.stat.name}
                </Text>
                <Text style={{
                  ...styles.regularText,
                  fontWeight: 'bold'
                }}
                >
                  {stat.base_stat}
                </Text>

              </View>
            ))
          }
        </View>

        {/* sprite Final */}
        <View style={{
          marginBottom: 20,
          alignItems: 'center'
        }}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigate('HomeScreen')}
          >
            <FadeInImage
              uri={pokemon.sprites.front_default}
              style={styles.basicSprite}
            />

          </TouchableOpacity>
        </View>

      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20
  },
  regularText: {
    fontSize: 18
  },
  basicSprite: {
    width: 100,
    height: 100
  }
});

