import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';

const IMAGE_URL_PREFIX = 'https://image.tmdb.org/t/p/w342';

export default function MovieRow({
  movie,
  press,
}) {
  const releaseDate = new Date(movie.release_date);
  return (
    <TouchableHighlight onPress={() => press(movie)}>
      <View style={styles.container}>
        <Image
          style={styles.poster}
          resizeMode={Image.resizeMode.resize}
          source={{ uri: `${IMAGE_URL_PREFIX}${movie.poster_path}` }}
        />
        <View>
          <Text style={styles.title}>
            {movie.title}
          </Text>
          <View style={styles.yearRow}>
            <Text style={styles.overview}>
              {releaseDate.getFullYear()}
            </Text>
            {movie.vote_average >= 5.0 ? (
              <Text style={styles.highScore}>
                {movie.vote_average}
              </Text>
            ) : (
              <Text style={styles.lowScore}>
                {movie.vote_average}
              </Text>
            )}
          </View>
          <Text
            style={styles.overview}
            numberOfLines={3}
          >
            {movie.overview}
          </Text>
        </View>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
    flex: 1,
    flexDirection: 'row',
  },
  poster: {
    width: 100,
    marginRight: 30,
    flex: 1,
  },
  title: {
    color: '#D4D1D4',
    marginBottom: 15,
  },
  overview: {
    color: '#7A777B',
  },
  highScore: {
    color: '#69A360',
    marginLeft: 10,
  },
  lowScore: {
    color: '#87541C',
    marginLeft: 10,
  },
  yearRow: {
    flexDirection: 'row',
    marginBottom: 15,
  },
});
