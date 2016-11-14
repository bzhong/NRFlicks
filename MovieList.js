import React, { Component } from 'react';
import {
  Text,
  View,
  ListView,
  TouchableHighlight,
  ActivityIndicator,
  StyleSheet,
  RefreshControl,
  TextInput,
} from 'react-native';
import MovieRow from './MovieRow';

const MOVIE_API_PREFIX = 'https://api.themoviedb.org/3/movie';
const API_KEY = 'a07e22bc18f5cb106bfe4cc1f83ad8ed';

export default class MovieList extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds,
      animating: true,
      canLoadData: true,
      loadSuccess: false,
      refreshing: false,
      searchText: null,
      movies: [],
    };
    this.renderMovieRow = this.renderMovieRow.bind(this);
    this.clickMovie = this.clickMovie.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.changeSearchText = this.changeSearchText.bind(this);
    this.getFilteredData = this.getFilteredData.bind(this);
  }

  componentDidMount() {
    setTimeout(() => {
      if (!this.state.loadSuccess) {
        this.setState({
          canLoadData: false,
          animating: false,
        });
      }
    }, 5000);
    this.fetchData();
  }

  fetchData() {
    const { movieType } = this.props;
    fetch(`${MOVIE_API_PREFIX}/${movieType}?api_key=${API_KEY}`)
      .then(response => response.json())
      .then(responseJson => {
        const movies = responseJson.results;
        if (this.state.canLoadData) {
          this.setState({
            loadSuccess: true,
            dataSource: this.state.dataSource.cloneWithRows(movies),
            animating: false,
            refreshing: false,
            movies,
          });
        }
      })
      .catch((error) => {
        this.setState({
          canLoadData: false,
          animating: false,
          refreshing: false,
        });
      });
  }

  clickMovie(data) {
    this.props.navigator.push({
      movie: data,
      index: 1,
    })
  }

  changeSearchText(text) {
    this.setState({ searchText: text });
  }

  getFilteredData() {
    const { dataSource, searchText, movies } = this.state;
    this.setState({ searchText: null });
    if (searchText === null || searchText.length === 0) {
      this.setState({
        dataSource: dataSource.cloneWithRows(movies),
      });
    } else {
      const matches = movies.filter(movie => movie.title.search(searchText) >= 0);
      this.setState({
        dataSource: dataSource.cloneWithRows(matches),
      });
    }
  }

  onRefresh() {
    this.setState({refreshing: true});
    this.fetchData();
  }

  renderMovieRow(rowData) {
    return (
      <View style={styles.movieRow}>
        <MovieRow
          movie={rowData}
          press={this.clickMovie}
        />
      </View>
    );
  }

  render() {
    const {
      dataSource,
      searchText,
      loadSuccess,
      animating,
      refreshing
    } = this.state;

    return (
      <View style={styles.container}>
        {animating && (
          <View style={styles.centering}>
            <ActivityIndicator
              animating={animating}
              size='large'
            />
          </View>
        )}
        {loadSuccess ? (
          <View style={{flex: 1}}>
            <View style={styles.searchBar}>
              <TextInput
                style={styles.searchInput}
                placeholder="Search"
                value={searchText}
                onChangeText={this.changeSearchText}
                autoCapitalize="none"
                onSubmitEditing={this.getFilteredData}
              />
            </View>
            <ListView
              dataSource={dataSource}
              renderRow={(rowData) => this.renderMovieRow(rowData)}
              enableEmptySections={true}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={this.onRefresh}
                />
              }
            />
          </View>
        ) : (
          <View style={styles.networkError}>
            <Text style={styles.networkText}>
              Network Error
            </Text>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1F1C1F',
    height: 800,
  },
  centering: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  movieRow: {
    paddingBottom: 20,
    marginLeft: 30,
    marginRight: 20,
  },
  networkText: {
    color: '#F2F2F3',
    fontSize: 15,
  },
  networkError: {
    height: 40,
    backgroundColor: '#404041',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBar: {
    backgroundColor: '#1F1C1F',
  },
  searchInput: {
    height: 50,
    margin: 5,
    paddingLeft: 10,
    backgroundColor: '#747175',
    borderRadius: 5,
  },
});
