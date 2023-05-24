import React, { useEffect, useState } from 'react';

import searchIcon from '../search.svg'
import MovieCard from '../components/MovieCard';
import api from '../api/apiConfig';
let page = 1;

const Home = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const getMovies = async () => {
        const response = await fetch(`${api.baseUrl}movie/popular?api_key=${api.apiKey}&page=${page}`)
        const data = await response.json();
        setMovies(data.results)
    }

    const searchMovie = async (searchName) => {
        const response = await fetch(`${api.baseUrl}search/movie?api_key=${api.apiKey}&query=${searchName}`)
        const data = await response.json();
        setMovies(data.results)
    }

    const nextPage = () => {
        page+=1;
        getMovies();
    }
    const previousPage = () => {
        if (page > 1){
            page-=1;
            getMovies();
        }
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            searchMovie(searchTerm)
          }
    }

    useEffect(() => {
        getMovies();
    }, []);

    return (
    <>
    <div className='titleArea'>
        <h1 className='title'>Movie Tracker</h1>
    </div>
    <div className='searchMain'>
        <div className='searchArea'>
            <div><input placeholder='Search movie' value={searchTerm} onKeyDown={handleKeyDown} onChange={(e) => { setSearchTerm(e.target.value) }} /></div>
            <div><img width='40px' height='40px' className='icons' src={searchIcon} alt="search" onClick={() => { searchMovie(searchTerm) }} /></div>
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
        <> Page {page} </>
        <button onClick={nextPage}>{">"}</button>
        </div>
    </div>
    </>
  )
}

export default Home;
