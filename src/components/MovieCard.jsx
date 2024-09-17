import React from 'react'; // Import React library
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook for navigation

// Retrieve user profile from local storage
let profile = JSON.parse(localStorage.getItem("profile"));

// Define the MovieCard functional component
const MovieCard = ({ movie, user_rating = false }) => {
    const navigate = useNavigate(); // Initialize navigation

    // Check if the movie has a user rating in the profile
    if (profile.movies.hasOwnProperty(movie.id)) {
        user_rating = profile.movies[movie.id]["user_rating"]; // Get user rating from profile
    } else {
        user_rating = false; // Set user rating to false if not found
    }

    let color = ""; // Variable to hold color based on user rating

    // Determine color based on user rating
    if (user_rating >= 4) {
        color = "#66cc33"; // Green for high ratings
    } else if (user_rating < 3) {
        color = "red"; // Red for low ratings
    } else {
        color = "orange"; // Orange for medium ratings
    }

    // Function to load movie details when the card is clicked
    const loadDetails = () => {
        navigate("/details/" + movie.id); // Navigate to the details page for the movie
    };

    // Render the MovieCard component
    return (
        <div className='movieCard' onClick={loadDetails}> {/* Clickable card to load details */}
            <div className='posterSection'>
                {
                    user_rating // Check if user rating exists
                        ? (
                            <div style={{ "color": color }} className='top-right'>
                                <h1>{user_rating}</h1> {/* Display user rating */}
                            </div>
                        ) : (
                            <p></p> // Empty paragraph if no user rating
                        )
                }
                <img className='moviePoster' src={`https://image.tmdb.org/t/p/w342/${movie.poster_path}`} alt="poster" /> {/* Movie poster image */}
            </div>
            <div className='cardTitle'>
                <p>{`${movie.vote_average.toFixed(1)} / 10`}</p> {/* Display average vote */}
                <h3>{movie.original_title}</h3> {/* Display movie title */}
            </div>
        </div>
    );
};

// Export the MovieCard component
export default MovieCard;