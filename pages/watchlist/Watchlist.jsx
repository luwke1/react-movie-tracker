import React, { useEffect, useState } from 'react';

import addIcon from '../../plus-square.svg'

import './watchlist.css'
import api from '../../api/apiConfig'
import MovieCard from '../../components/MovieCard';

const Collection = () => {
    const [movies, setMovies] = useState([]);
    let profile = JSON.parse(localStorage.getItem("profile"));

    const getWatched = async () => {
        try {
            // Create an array of promises for each movie in the profile
            const moviePromises = Object.keys(profile.watchlist).map(async (key) => {
                const response = await fetch(`https://api.themoviedb.org/3/movie/${key}?api_key=${api.apiKey}`);
                const data = await response.json();
                return data;
            });

            // Waits for all promises to resolve and sets the data
            const movieData = await Promise.all(moviePromises);
            setMovies(movieData);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        setMovies([])
        getWatched();
    }, []);

    return (
        <div className='profileBody'>
            <div className='profileSec'>
                <div>
                    <h1>Your Watchlist</h1>
                    {/* <div class="dropdown">
                        <button class="dropbtn"><img src={addIcon}/></button>
                        <div class="dropdown-content">
                            <a href="#" onClick={createCollection}>Custom</a>
                            <a href="#">By prompt</a>
                        </div>
                    </div> */}
                </div>
            </div>
            <div className='movieSection'>
                {

                    movies.length > 0
                        ? (
                            movies.map((movie) => {
                                return <MovieCard movie={movie} user_rating={movie.user_rating} />
                            })
                        ) : (
                            <div className='empty'>
                                <h2>No movies found in your watchlist</h2>
                            </div>
                        )
                }
            </div>
        </div>
    );
}

export default Collection;