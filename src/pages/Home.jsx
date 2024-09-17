import React, { useEffect, useState } from 'react'; // Import React and hooks
import { useNavigate } from 'react-router-dom'; // Import navigation hook
import searchIcon from '../search.svg'; // Import search icon
import MovieCard from '../components/MovieCard'; // Import MovieCard component
import api from '../api/apiConfig'; // Import API configuration

let page = 1; // Initialize page variable for pagination

const Home = () => {
    const navigate = useNavigate(); // Initialize navigation
    const [movies, setMovies] = useState([]); // State for fetched movies
    const [searchTerm, setSearchTerm] = useState(""); // State for search input

    // Fetch popular movies from the API
    const getMovies = async () => {
        const response = await fetch(`${api.baseUrl}movie/popular?api_key=${api.apiKey}&page=${page}`);
        const data = await response.json();
        setMovies(data.results); // Update state with movie results
    }

    // Navigate to the next page of movies
    const nextPage = () => {
        page += 1; // Increment page number
        getMovies(); // Fetch movies for the new page
    }

    // Navigate to the previous page of movies
    const previousPage = () => {
        if (page > 1) {
            page -= 1; // Decrement page number
            getMovies(); // Fetch movies for the new page
        }
    }

    // Handle key down events in the search input
    const handleKeyDown = (event) => {
        if (event.key === 'Enter' || event.target.className === "icons") {
            navigate("/search/" + searchTerm); // Navigate to search results
        }
    }

    // Fetch movies when the component mounts
    useEffect(() => {
        getMovies(); // Call function to fetch movies
    }, []); // Run only once on mount

    // Render the Home component
    return (
        <>
            <div className='titleArea'>
                <h1 className='title'>Movie Tracker</h1> {/* Main title */}
            </div>
            <div className='searchMain'>
                <div className='searchArea'>
                    <div>
                        <input 
                            placeholder='Search movie' 
                            value={searchTerm} 
                            onKeyDown={handleKeyDown} // Handle key down for search
                            onChange={(e) => { setSearchTerm(e.target.value); }} // Update search term
                        />
                    </div>
                    <div>
                        <img 
                            width='40px' 
                            height='40px' 
                            className='icons' 
                            src={searchIcon} 
                            alt="search" 
                            onClick={handleKeyDown} // Trigger search on icon click
                        />
                    </div>
                </div>
            </div>
            <div className='movieSection'>
                {
                    movies?.length > 0 // Check if movies exist
                        ? (
                            movies.map((movie) => {
                                if (movie.poster_path) { // Ensure movie has a poster
                                    return <MovieCard key={movie.id} movie={movie} /> // Render MovieCard
                                }
                            })
                        ) : (
                            <div className='empty'>
                                <h2>No movies found</h2> {/* Message for no movies */}
                            </div>
                        )
                }
            </div>
            <div className='pageSection'>
                <div>
                    <button onClick={previousPage}>{"<"}</button> {/* Previous page button */}
                    <> Page {page} </> {/* Current page number */}
                    <button onClick={nextPage}>{">"}</button> {/* Next page button */}
                </div>
            </div>
        </>
    )
}

export default Home; // Export the Home component