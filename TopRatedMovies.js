import React from 'react';
import MovieList from './MovieList';

export default function TopRatedMovies({
  navigator,
}) {
  return (
    <MovieList
      movieType="top_rated"
      navigator={navigator}
    />
  );
}
