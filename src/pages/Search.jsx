import React, { useEffect, useState } from 'react'; // Import React and hooks
import { useNavigate, useParams } from 'react-router-dom'; // Import navigation hooks
import searchIcon from '../search.svg'; // Import search icon
import MovieCard from '../components/MovieCard'; // Import MovieCard component
import api from '../api/apiConfig'; // Import API configuration

let page = 1; // Current page
let maxPages = 1; // Max pages

const Search = () => {
    const navigate = useNavigate(); // Navigation hook
    const { id } = useParams(); // Get search term
    const [movies, setMovies] = useState([]); // Fetched movies
    const [searchTerm, setSearchTerm] = useState(`${id}`); // Search input

    // Fetch movies based on search term
    const getMovies = async () => {
        const response = await fetch(`${api.baseUrl}search/movie?api_key=${api.apiKey}&query=${id}&page=${page}`);
        const data = await response.json();
        maxPages = data.total_pages; // Update max pages
        setMovies(data.results); // Set movies
    }

    // Navigate to next page
    const nextPage = () => {
        if (page < maxPages) {
            page += 1;
            getMovies();
        }
    }

    // Navigate to previous page
    const previousPage = () => {
        if (page > 1) {
            page -= 1;
            getMovies();
        }
    }

    // Handle search input
    const handleKeyDown = (event) => {
        if (event.key === 'Enter' || event.target.className === "icons") {
            navigate("/search/" + searchTerm);
            navigate(0); // Refresh
        }
    }

    // Fetch movies on mount
    useEffect(() => {
        getMovies();
    }, []);

    // Render component
    return (
        <>
            <div className='titleArea'></div>
            <div className='searchMain'>
                <div className='searchArea'>
                    <div>
                        <input 
                            placeholder='Search movie' 
                            value={searchTerm} 
                            onKeyDown={handleKeyDown} 
                            onChange={(e) => { setSearchTerm(e.target.value); }} 
                        />
                    </div>
                    <div>
                        <img 
                            width='40px' 
                            height='40px' 
                            className='icons' 
                            src={searchIcon} 
                            alt="search" 
                            onClick={handleKeyDown} 
                        />
                    </div>
                </div>
            </div>
            <div className='movieSection'>
                {
                    movies?.length > 0 
                        ? (
                            movies.map((movie) => {
                                if (movie.poster_path) {
                                    return <MovieCard key={movie.id} movie={movie} />;
                                }
                            })
                        ) : (
                            <div className='empty'>
                                <h2>No movies found</h2>
                            </div>
                        )
                }
            </div>
            <div className='pageSection'>
                <div>
                    <button onClick={previousPage}>{"<"}</button>
                    <> Page {page} / {maxPages} </> 
                    <button onClick={nextPage}>{">"}</button>
                </div>
            </div>
        </>
    )
}

export default Search; // Export component
