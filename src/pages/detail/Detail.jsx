import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../api/apiConfig'
import './detail.css'
var profile = JSON.parse(localStorage.getItem("profile"));

const Detail = () => {
	// Extract the movie ID from URL parameters
	const { id } = useParams();

	// Create state to store movie data
	const [movieData, setData] = useState({});
	const [movies, setMovies] = useState(profile.movies);

	// Fetch movie details from API
	useEffect(() => {
		getDetails();
	}, []);

	// Function to fetch movie details from API
	const getDetails = async () => {
		const response = await fetch(`${api.baseUrl}movie/${id}?api_key=` + api.apiKey)
		const data = await response.json();
		setData(data)
	}

	// Function to add a movie to the user's watched list
	async function addMovie(rating) {
		profile.movies[movieData.id] = { title: movieData.title, release_date: movieData.release_date, user_rating: rating }
		localStorage.setItem("profile", JSON.stringify(profile));
		setMovies([1])
	}

	// Function to remove a movie from the user's watched list
	async function removeMovie() {
		if (profile.movies.hasOwnProperty(movieData.id)) {
			delete profile.movies[movieData.id]
			localStorage.setItem("profile", JSON.stringify(profile));
			setMovies([1])
		}
	}

	// Function to remove a movie from the user's watchlist
	async function removeFromWatchlist() {
		if (profile.watchlist.hasOwnProperty(movieData.id)) {
			delete profile.watchlist[movieData.id]
			localStorage.setItem("profile", JSON.stringify(profile));
			setMovies([1])
		}
	}

	// Function to add a movie to the user's watchlist
	async function addToWatchlist() {
		profile.watchlist[movieData.id] = { title: movieData.title, release_date: movieData.release_date }
		localStorage.setItem("profile", JSON.stringify(profile));
		setMovies([1])
	}

	// Render the movie details page

	return (
		<>
			<div className='movie-backdrop' style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w342/${movieData.backdrop_path})` }}>
				<div className='background-filter'></div>
				<div className='movieDetails'>
					<div className='detailPoster'> <img src={`https://image.tmdb.org/t/p/w500/${movieData.poster_path}`} alt="" /></div>
					<div className='movieDesc'>
						<h1 >{movieData.title}</h1>
						<span>
							{
								movieData.genres?.length > 0
									? (
										movieData.genres.map((genre) => {
											return <a className="genreTag" href="#">{genre.name}</a>
										})
									) : (
										<div className='empty'>

										</div>
									)
							}
						</span>
						<p>{movieData.overview}</p>
						<div className='movieOptions'>
							<p>{`${movieData.runtime} min | ${movieData.vote_average?.toFixed(1)} / 10`}</p>
							<br />
							{console.log(profile.movies)}
							{
								profile.movies.hasOwnProperty(movieData.id)
									? (
										<button className='removeButton' onClick={removeMovie} href="#">Remove From Watched</button>
									) : (
										<>
											<b>Rating:</b>
											<button className='addButton' onClick={() => addMovie(1)}>1</button>
											<button className='addButton' onClick={() => addMovie(2)}>2</button>
											<button className='addButton' onClick={() => addMovie(3)}>3</button>
											<button className='addButton' onClick={() => addMovie(4)}>4</button>
											<button className='addButton' onClick={() => addMovie(5)}>5</button>
										</>
									)
							}

						</div>
						<div className='movieOptions'>
						{
							profile.watchlist.hasOwnProperty(movieData.id)
								? (
									<button className='removeWatchlist' onClick={removeFromWatchlist} href="#">Remove from Watchlist</button>
								) : (
									<>
										<button className='addWatchlist' onClick={() => addToWatchlist(1)}>Add to Watchlist</button>
									</>
								)
						}
						</div>
					</div>
				</div>
			</div>

		</>
	)
}

export default Detail;