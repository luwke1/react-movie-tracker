import React from 'react';
import { useNavigate } from 'react-router-dom';

const MovieCard = ({movie, user_rating=false})=>{
    const navigate = useNavigate();
    let color = "";
    if (user_rating >= 4){
        color = "#66cc33"
    } else if (user_rating < 3){
        color = "red"
    }else{
        color = "orange"
    }
    

    const loadDetails = () => {
        navigate("/details/"+movie.id)
    }

    return (
        <div className='movieCard' onClick={loadDetails}>
            <div className='posterSection' >
                {
                user_rating
                    ? (
                        <div style={{"color":color}} className='top-right'><h1>{user_rating}</h1></div>
                    ) : (
                        <p></p>
                    )
                }
                <img className='moviePoster' src={`https://image.tmdb.org/t/p/w342/${movie.poster_path}`} alt="poster" />
            </div>
            <div className='cardTitle'>
                <p>{`${movie.vote_average.toFixed(1)} / 10`}</p>
                <h3>{movie.original_title}</h3>
            </div>
        </div>
    );
}



export default MovieCard;