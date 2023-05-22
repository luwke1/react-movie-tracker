import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../api/apiConfig'
import './detail.css'
var profile = JSON.parse(localStorage.getItem("profile"));

const Detail = () => {
	const { id } = useParams();
	const [movieData, setData] = useState({});
	const [castData, setCast] = useState([]);
	const [movies, setMovies] = useState(profile.movies);

	useEffect(() => {
		getDetails();
		getCast();
	}, []);

	const getDetails = async () => {
		const response = await fetch(`${api.baseUrl}/movie/${id}?api_key=` + api.apiKey)
		const data = await response.json();
		// console.log(data)
		setData(data)
	}
	const getCast = async () => {
		const response = await fetch(`${api.baseUrl}/movie/${id}/credits?api_key=` + api.apiKey)
		let data = await response.json();
		setCast(data)
	}
	async function addMovie(rating){
		movies.push({"id":movieData.id, "rating":rating})
		setMovies([...movies]);
		profile.movies = [...movies]
		localStorage.setItem("profile", JSON.stringify(profile));
	}
	async function removeMovie(){
		let index = movies.findIndex(x => x.id === movieData.id);
		if (index > -1){
			movies.splice(index, 1)
			setMovies([...movies]);
			profile.movies = [...movies]
			localStorage.setItem("profile", JSON.stringify(profile));
		}
	}

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
							profile.movies.find(x => x.id === movieData.id)
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
				</div>
			</div>
		</div>
		
		</>
	)
}

export default Detail;