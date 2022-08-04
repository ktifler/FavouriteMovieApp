import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import React, { useEffect, useState } from 'react';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddFavourite from './components/AddFavourite';
import RemoveFavourite from './components/RemoveFavourite'


const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [favourites,setFavourites] = useState([]);
  const getMoviesRequest = async (searchValue) => {
    const url = `https://www.omdbapi.com/?s=${searchValue}&apikey=9f29cc5e`;
    const response = await fetch(url);
    const responseJson = await response.json();
    if (responseJson.Search) {
      setMovies(responseJson.Search);
    }
    
  };
  const saveToLocalStorage = (items) =>{
    localStorage.setItem('react-movie-app-favourite',JSON.stringify(items));
  }
  const addFavouriteMovie = (movie) => {
    const newFavouritesList = [...favourites,movie];
    setFavourites(newFavouritesList);
    saveToLocalStorage(newFavouritesList);
  };
  const removeFavouriteMovie = (movie) => {
    const newFavouritesList = favourites.filter((favourite)=>
      favourite.imdbID !== movie.imdbID);
    setFavourites(newFavouritesList);
    saveToLocalStorage(newFavouritesList);
  };
  useEffect(() => {
    getMoviesRequest(searchValue);
  }, [searchValue]);
  useEffect(()=>{
    const movieFavourites = JSON.parse(localStorage.getItem('react-movie-app-favourite'));
    setFavourites(movieFavourites);
  },[]);
  return (
    <div className='container-fluid pt-3 movie-app'>
      <div className='row'>
        <MovieListHeading heading="Movies" />
        <SearchBox value={searchValue} setSearchValue = {setSearchValue}/>
      </div>

      <div className='row'>
        <MovieList movies={movies} handleFavouritesClick={addFavouriteMovie} favoriteComponent={AddFavourite}/>
      </div>
      <div className='row'>
        <MovieListHeading heading="Favourites" />
        <MovieList movies={favourites} handleFavouritesClick={removeFavouriteMovie} favoriteComponent={RemoveFavourite}/>


      </div>

    </div>
  );
};

export default App;
