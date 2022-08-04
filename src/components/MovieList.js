import React from "react";

const MovieList = (props) => {
    const FavouriteComponents = props.favoriteComponent;
    return (
        < >
            {
                props.movies.map((movie, index) => 
                    <div className="col d-flex justify-content-start m-3 image-container">
                        
                        <img src={movie.Poster} alt='movie'></img>
                        <div onClick={()=>props.handleFavouritesClick(movie)} className="overlay d-flex align-items-center justify-content-center" >
                            <FavouriteComponents/>
                        </div>
                    </div>
                )
            }


        </>
    );
};

export default MovieList;