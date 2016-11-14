import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableHighlight,
  BackAndroid,
  WebView,
} from 'react-native';

const YOUTUBE_VIDEO_URL_PREFIX = 'https://www.youtube.com/watch?v=';
let navigator = null;

export default class MovieTrailer extends React.Component {
  constructor(props) {
    super(props);
    this.backToMovieDetails = this.backToMovieDetails.bind(this);
  }

  componentDidMount() {
    navigator = this.props.navigator;
    BackAndroid.addEventListener('hardwareBackPress', function() {
      navigator.pop();
      return true;
    });
  }

  backToMovieDetails() {
    this.props.navigator.pop();
  }

  render() {
    const { source } = this.props;
    return (
      <View style={styles.container}>
        <TouchableHighlight onPress={this.backToMovieDetails}>
          <Text style={styles.backButton}>
            Back
          </Text>
        </TouchableHighlight>
        <WebView
          source={{ uri: `${YOUTUBE_VIDEO_URL_PREFIX}${source}` }}
          domStorageEnabled={true}
          startInLoadingState={true}
          automaticallyAdjustContentInsets={false}
          javaScriptEnabled={true}
          decelerationRate="normal"
          startInLoadingState={true}
          scalesPageToFit={true}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F1C1F',
  },
  backButton: {
    color: '#CAC7CA',
    fontSize: 15,
    padding: 10,
  },
  // portraitBackdrop: {
  //   // width: 150,
  //   height: 200,
  //   flex: 1,
  // },
  // landscapeBackdrop: {
  //   width: 300,
  //   height: 200,
  // },
  // title: {
  //   color: '#CAC7CA',
  //   fontSize: 20,
  // },
  // year: {
  //   color: '#A6A3A7',
  //   marginBottom: 20,
  // },
  // overview: {
  //   color: '#A6A3A7',
  // },
  // playIcon: {
  //   position: 'absolute',
  //   top: 0,
  //   left: 0,
  // },
});
