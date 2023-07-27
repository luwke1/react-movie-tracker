import React, { useEffect, useState } from 'react';
import './profile.css'
import api from '../../api/apiConfig'
import MovieCard from '../../components/MovieCard';

let profile = JSON.parse(localStorage.getItem("profile"));

const Profile = () => {
    const [movies, setMovies] = useState([]);
    

    const getWatched = async () => {
        try {
            // Create an array of promises for each movie in the profile
            const moviePromises = Object.keys(profile.movies).map(async (key) => {
                const response = await fetch(`https://api.themoviedb.org/3/movie/${key}?api_key=${api.apiKey}`);
                const data = await response.json();
                data["user_rating"] = profile.movies[key]["user_rating"]
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
                        <h1>{`Your Watched Movies`}</h1>
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