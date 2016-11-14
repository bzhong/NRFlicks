import React from 'react';
import MovieList from './MovieList';

export default function NowPlayingMovies({
  navigator,
}) {
  return (
    <MovieList
      movieType="now_playing"
      navigator={navigator}
    />
  );
}
