import React from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {

  constructor() {
    super();
    this.state = {
      movies: [
        {
          _id: 1,
          Title: 'Two Weeks Notice',
          Description: 'A lawyer decides that she\'s used too much like a nanny by her boss, so she walks out on him.',
          ImagePath: 'https://m.media-amazon.com/images/M/MV5BYTg4N2M2ODItZjVjMy00YTljLTllNjUtYzY4ZTE2MTI2M2RhXkEyXkFqcGdeQXVyNjExODE1MDc@._V1_UX182_CR0,0,182,268_AL_.jpg'
        },
        {
          _id: 2,
          Title: 'Uncle Buck',
          Description: 'Bachelor and all-round slob Buck babysits his brother\'s rebellious teenage daughter and her cute younger brother and sister',
          ImagePath: 'https://m.media-amazon.com/images/M/MV5BMjIwOWVkNzMtZTIyZC00ZWM0LTg5MWYtMWYwYjVhZTM3MDMzXkEyXkFqcGdeQXVyNTI4MjkwNjA@._V1_UX182_CR0,0,182,268_AL_.jpg'
        },
        {
          _id: 3,
          Title: 'Parasite',
          Description: 'Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.',
          ImagePath: 'https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_UX182_CR0,0,182,268_AL_.jpg'
        },
      ],
      selectedMovie: null
    };
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  render() {
    const { movies, selectedMovie } = this.state;
    // if (selectedMovie) return <MovieView movie={selectedMovie} />;
    if (movies.length === 0) return <div className='main-view'>The list is empty!</div>;
    return (
      <div className="main-view">
        {selectedMovie
          ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => {
            this.setSelectedMovie(newSelectedMovie);
          }} />
          : movies.map(movie => (
            <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => {
              this.setSelectedMovie(movie)
            }} />
          ))
        }
      </div>
    );
  }
}
