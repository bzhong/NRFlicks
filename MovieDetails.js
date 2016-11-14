import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableHighlight,
  BackAndroid,
} from 'react-native';

const IMAGE_URL_PREFIX = 'https://image.tmdb.org/t/p/w342';
const HIGH_RESO_IMAGE_URL_PREFIX = 'https://image.tmdb.org/t/p/original';
const DEFAULT_IMAGE_URL_PREFIX = IMAGE_URL_PREFIX;
const ORIENTATION_PORTRAIT = 0;
const ORIENTATION_LANDSCAPE = 1;
let navigator = null;

export default class MovieDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orientation: ORIENTATION_PORTRAIT,
    };
    this.viewLayout = this.viewLayout.bind(this);
    this.backToMovieList = this.backToMovieList.bind(this);
  }

  componentDidMount() {
    navigator = this.props.navigator;
    BackAndroid.addEventListener('hardwareBackPress', function() {
      navigator.pop();
      return true;
    });
  }

  viewLayout(layout) {
    const { width, height } = layout;
    if (width > height) {
      this.setState({ orientation: ORIENTATION_LANDSCAPE });
    } else {
      this.setState({ orientation: ORIENTATION_PORTRAIT });
    }
  }

  backToMovieList() {
    this.props.navigator.pop();
  }

  render() {
    const { movie } = this.props;
    if (!movie) return null;
    const releaseDate = new Date(movie.release_date);
    return (
      <View
        style={styles.container}
        onLayout={(event) => this.viewLayout(event.nativeEvent.layout)}
      >
        <TouchableHighlight onPress={this.backToMovieList}>
          <Text style={styles.backButton}>
            Back
          </Text>
        </TouchableHighlight>
        {this.state.orientation === ORIENTATION_PORTRAIT ? (
          <View>
            <Image
              style={styles.portraitBackdrop}
              resizeMode={Image.resizeMode.resize}
              source={{ uri: `${DEFAULT_IMAGE_URL_PREFIX}${movie.backdrop_path}` }}
            />
            <View>
              <Text style={styles.title}>
                {movie.title}
              </Text>
              <Text style={styles.year}>
                {'Released ' + releaseDate.getFullYear()}
              </Text>
              <Text style={styles.overview}>
                {movie.overview}
              </Text>
            </View>
          </View>
        ) : (
          <View>
            <View style={styles.landscapeContainer}>
              <View>
                <Text style={styles.title}>
                  {movie.title}
                </Text>
                <Text style={styles.year}>
                  {'Released ' + releaseDate.getFullYear()}
                </Text>
              </View>
              <Image
                style={styles.landscapeBackdrop}
                resizeMode={Image.resizeMode.resize}
                source={{ uri: `${DEFAULT_IMAGE_URL_PREFIX}${movie.backdrop_path}` }}
              />
            </View>
            <View>
              <Text style={styles.overview}>
                {movie.overview}
              </Text>
            </View>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F1C1F',
  },
  landscapeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  backButton: {
    color: '#CAC7CA',
    fontSize: 15,
    padding: 10,
  },
  portraitBackdrop: {
    // width: 150,
    height: 200,
    flex: 1,
  },
  landscapeBackdrop: {
    width: 300,
    height: 200,
  },
  title: {
    color: '#CAC7CA',
    fontSize: 20,
  },
  year: {
    color: '#A6A3A7',
    marginBottom: 20,
  },
  overview: {
    color: '#A6A3A7',
  },
});
