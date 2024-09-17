import React from 'react'; // Import React library
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook for navigation

// Retrieve user profile from local storage
let profile = JSON.parse(localStorage.getItem("profile"));

// Define the RecommendCard functional component
const RecommendCard = ({ movie, user_rating = false }) => {
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

    // Render the RecommendCard component
    return (
        <div className='recCard'>
            <div className='recPoster' onClick={loadDetails}> {/* Clickable poster to load details */}
                <img src={`https://image.tmdb.org/t/p/w92/${movie.poster_path}`} alt="poster" /> {/* Movie poster image */}
            </div>
            <div className='recDesc'>
                <h3 onClick={loadDetails}>{movie.original_title}</h3> {/* Movie title, clickable to load details */}
                <p>{`${movie.vote_average.toFixed(1)} / 10`}</p> {/* Display average vote */}
                <p>{movie.description}</p> {/* Display movie description */}
            </div>
        </div>
    );
};

// Export the RecommendCard component
export default RecommendCard;