import React, { useState } from "react";
import axios from "axios";
import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMoviesHandler = async () => {
    try {
      setLoading(true);
      const response = await axios.get("https://swapi.dev/api/films/");
      const data = response.data;
      const transformedMovies = data.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date,
        };
      });
      setMovies(transformedMovies);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {loading && <p>Loading...</p>}
        {!loading && <MoviesList movies={movies} />}
      </section>
    </React.Fragment>
  );
}

export default App;
