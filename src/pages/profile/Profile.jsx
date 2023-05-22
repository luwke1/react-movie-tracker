import React, { useEffect, useState } from 'react';
import './profile.css'
import api from '../../api/apiConfig'
import MovieCard from '../../components/MovieCard';

const Profile = () => {
    const [movies, setMovies] = useState([]);
    let profile = JSON.parse(localStorage.getItem("profile"));

    const getWatched = async () => {
        try {
            // Create an array of promises for each movie in the profile
            const moviePromises = profile.movies.map(async (item) => {
                const response = await fetch(`https://api.themoviedb.org/3/movie/${item.id}?api_key=${api.apiKey}`);
                const data = await response.json();
                data["user_rating"] = item.rating
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
                        <h1>{`Your Watched List`}</h1>
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
                                <h2>No movies found in watched</h2>
                            </div>
                        )
                }
            </div>
        </div>
    );
}



export default Profile;