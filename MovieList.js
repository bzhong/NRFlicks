import React, { Component } from 'react';
import {
  Text,
  View,
  ListView,
  TouchableHighlight,
  ActivityIndicator,
  StyleSheet,
  RefreshControl,
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
    };
    this.renderMovieRow = this.renderMovieRow.bind(this);
    this.clickMovie = this.clickMovie.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.fetchData = this.fetchData.bind(this);
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
    const { dataSource } = this.state;

    return (
      <View style={styles.container}>
        {this.state.animating && (
          <View style={styles.centering}>
            <ActivityIndicator
              animating={this.state.animating}
              size='large'
            />
          </View>
        )}
        {this.state.canLoadData || this.state.loadSuccess ? (
          <View style={{flex: 1}}>
          <ListView
            dataSource={dataSource}
            renderRow={(rowData) => this.renderMovieRow(rowData)}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
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
    // flex: 1,
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
});
