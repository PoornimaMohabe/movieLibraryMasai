import React, { useEffect, useState } from 'react';
import './Mobile.css';

function Movie() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('Avengers');
  const [loading, setLoading] = useState(false);


  const fetchMovies = (query) => {
    setLoading(true);
    const url = `http://www.omdbapi.com/?apikey=c92df3e5&s=${query}`;

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        if (data.Response === 'True') {
          setData(data.Search);
          setError(null);
        } else {
          setError(data.Error);
          setData([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };


  useEffect(() => {
    fetchMovies(search);
  }, []);


  const handleSearch = (e) => {
    setSearch(e.target.value);
  };


  const handleSearchClick = () => {
    fetchMovies(search);
  };

  return (
    <div className="container">
      <h1 className="title">Movie Search</h1>

      {/* Search Input */}
      <div className="search-bar">
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Search for a movie..."
          className="search-input"
        />
        <button onClick={handleSearchClick} className="search-button">Search</button>
      </div>


      {error && <p className="error">Error: {error}</p>}


      {loading && <p className="loading">Loading...</p>}


      <div className="movie-list">
        {data.map((movie) => (
          <div key={movie.imdbID} className="movie-card">
            <img src={movie.Poster} alt={movie.Title} className="movie-poster" />
            <h2 className="movie-title">{movie.Title}</h2>
            <p className="movie-year">Year: {movie.Year}</p>
            <p className="movie-type">Type: {movie.Type}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Movie;