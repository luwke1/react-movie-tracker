import React, { useEffect, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import searchIcon from '../search.svg'
import MovieCard from '../components/MovieCard';
import api from '../api/apiConfig';
let page = 1;
let maxPages = 1;

const Search = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [movies, setMovies] = useState([]);
    
    const [searchTerm, setSearchTerm] = useState(`${id}`);

    const getMovies = async () => {
        const response = await fetch(`${api.baseUrl}search/movie?api_key=${api.apiKey}&query=${id}&page=${page}`)
        const data = await response.json();
        maxPages = data.total_pages;
        setMovies(data.results);
    }

    const nextPage = () => {
        console.log(maxPages)
        if (page < maxPages){
            page+=1;
            getMovies();
        }
    }
    const previousPage = () => {
        if (page > 1){
            page-=1;
            getMovies();
        }
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' || event.target.className === "icons") {
            navigate("/search/"+searchTerm);
        }
    }

    useEffect(() => {
        getMovies();
    }, []);

    return (
        <>
        <div className='titleArea'>
        </div>
        <div className='searchMain'>
            <div className='searchArea'>
                <div><input placeholder='Search movie' value={searchTerm} onKeyDown={handleKeyDown} onChange={(e) => { setSearchTerm(e.target.value) }} /></div>
                <div><img width='40px' height='40px' className='icons' src={searchIcon} alt="search" onClick={handleKeyDown} /></div>
            </div>
        </div>
        <div className='movieSection'>
            {
    
                movies?.length > 0
                    ? (
                        movies.map((movie) => {
                            if (movie.poster_path){
                                return <MovieCard movie={movie} />
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

export default Search;