import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import MoviesList from "./components/MoviesList";
import AddMovie from "./components/AddMovie";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMoviesHandler = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(
        "https://react-practice-9b982-default-rtdb.firebaseio.com/movies.json"
      );
      const data = response.data;
      const loadedMovies = [];

      for (const key in data) {
        loadedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate,
        });
      }
      setMovies(loadedMovies);
    } catch (error) {
      setLoading(false);
      if (error.response) {
        if (error.response.status === 404) {
          setError("Resource not found");
        } else if (error.response.status === 401) {
          setError("Unauthorized");
        } else {
          setError("An error occurred");
        }
      } else if (error.request) {
        setError("No response from server");
      } else {
        setError("Request setup error");
      }
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  const addMovieHandler = async (movie) => {
    await axios.post(
      "https://react-practice-9b982-default-rtdb.firebaseio.com/movies.json",
      movie
    );
    fetchMoviesHandler();
  };

  const deleteMovieHandler = async (id) => {
    console.log(id);
    await axios.delete(
      `https://react-practice-9b982-default-rtdb.firebaseio.com/movies/${id}.json`
    );
    fetchMoviesHandler();
  };

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {!loading && !error && (
          <MoviesList movies={movies} onDelete={deleteMovieHandler} />
        )}
      </section>
    </React.Fragment>
  );
}

export default App;
