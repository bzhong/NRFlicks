import React, { Component } from 'react';
import {
  Text,
  View,
  ListView,
  Navigator,
  TouchableHighlight,
  ViewPagerAndroid,
  Button,
  StyleSheet,
  StatusBar,
} from 'react-native';
import NowPlayingMovies from './NowPlayingMovies';
import TopRatedMovies from './TopRatedMovies';
import MovieDetails from './MovieDetails';
import MovieTrailer from './MovieTrailer';
import Icon from 'react-native-vector-icons/FontAwesome';

const routes = [
  {title: 'Movie List', index: 0},
  {title: 'Movie Details', index: 1},
  {title: 'Movie Trailer', index: 2},
];

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
    };
    this.onPageSelected = this.onPageSelected.bind(this);
    this.renderTabBar = this.renderTabBar.bind(this);
  }

  onPageSelected(event) {
    this.setState({
      page: event.nativeEvent.position,
    });
  }

  goto(page) {
    this.viewPager.setPage(page);
    this.setState({ page });
  }

  renderTabBar() {
    return (
      <View style={styles.tabBar}>
        <TouchableHighlight
          style={styles.tab}
          underlayColor='#2F2F2F'
          onPress={() => this.goto(0)}
        >
          <View style={styles.tabAlignment}>
            <Text style={styles.tabText}>
              <Icon name="film" size={30} />
            </Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.tab}
          underlayColor='#2F2F2F'
          onPress={() => this.goto(1)}
        >
          <View style={styles.tabAlignment}>
            <Text style={styles.tabText}>
              <Icon name="star" size={30} />
            </Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }

  renderScene(route, navigator) {
    StatusBar.setBackgroundColor('#434343', true);
    if (route.index === 0) {
      return (
        <View>
          {this.renderTabBar()}
          <ViewPagerAndroid
            initialPage={0}
            onPageSelected={this.onPageSelected}
            ref={ viewPager => this.viewPager = viewPager }
          >
            <NowPlayingMovies navigator={navigator} />
            <TopRatedMovies navigator={navigator} />
          </ViewPagerAndroid>
        </View>
      );
    } else if (route.index === 1) {
      return (
          <MovieDetails navigator={navigator} movie={route.movie} />
      );
    } else if (route.index === 2) {
      return (
        <MovieTrailer navigator={navigator} source={route.source} />
      );
    }
  }

  render() {
    return (
      <Navigator
        initialRoute={routes[0]}
        initialRouteStack={routes}
        renderScene={(route, navigator) => this.renderScene(route, navigator)}
      />
    );
  }
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
  },
  tab: {
    flex: 1,
    height: 60,
    backgroundColor: '#2F2F2F',
  },
  tabText: {
    color: '#D5D3D5',
    fontSize: 20,
  },
  tabAlignment: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    color: '#CAC7CA',
    fontSize: 15,
    padding: 15,
  },
  navigationBar: {
    backgroundColor: '#1F1C1F',
  },
});
