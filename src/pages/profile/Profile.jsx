import React, { useEffect, useState } from 'react'; // Import React and necessary hooks
import './profile.css'; // Import CSS for styling
import api from '../../api/apiConfig'; // Import API configuration
import MovieCard from '../../components/MovieCard'; // Import MovieCard component

let profile = JSON.parse(localStorage.getItem("profile")); // Retrieve user profile from local storage

const Profile = () => {
    const [movies, setMovies] = useState([]); // State to hold watched movies

    // Function to fetch watched movies from the API
    const getWatched = async () => {
        try {
            // Create an array of promises for each movie in the profile
            const moviePromises = Object.keys(profile.movies).map(async (key) => {
                const response = await fetch(`https://api.themoviedb.org/3/movie/${key}?api_key=${api.apiKey}`); // Fetch movie details
                const data = await response.json(); // Parse response to JSON
                data["user_rating"] = profile.movies[key]["user_rating"]; // Add user rating to movie data
                return data; // Return movie data
            });

            // Wait for all promises to resolve and set the data
            const movieData = await Promise.all(moviePromises);
            setMovies(movieData); // Update state with fetched movie data
        } catch (error) {
            console.error(error); // Log any errors encountered
        }
    }

    // useEffect to fetch watched movies when the component mounts
    useEffect(() => {
        setMovies([]); // Reset movies state
        getWatched(); // Call function to fetch watched movies
    }, []);

    // Render the Profile component
    return (
        <div className='profileBody'>
            <div className='profileSec'>
                <div>
                    <h1>{`Your Watched Movies`}</h1> {/* Display header for watched movies */}
                </div>
            </div>
            <div className='movieSection'>
                {
                    movies.length > 0 // Check if there are any movies
                        ? (
                            movies.map((movie) => {
                                return <MovieCard key={movie.id} movie={movie} user_rating={movie.user_rating} /> // Render MovieCard for each movie
                            })
                        ) : (
                            <div className='empty'>
                                <h2>No movies found in watched</h2> {/* Message when no movies are found */}
                            </div>
                        )
                }
            </div>
        </div>
    );
}

export default Profile; // Export the Profile component