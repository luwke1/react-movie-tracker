import React from 'react';
import { useNavigate } from 'react-router-dom';
let profile = JSON.parse(localStorage.getItem("profile"));

const RecommendCard = ({movie, user_rating=false})=>{
    const navigate = useNavigate();
    if (profile.movies.hasOwnProperty(movie.id)){
        user_rating= profile.movies[movie.id]["user_rating"]
    }else {
        user_rating=false
    }
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
        <div className='recCard' >
            <div className='recPoster' onClick={loadDetails}>
                <img src={`https://image.tmdb.org/t/p/w92/${movie.poster_path}`} alt="poster" />
            </div>
            <div className='recDesc'>
                <h3 onClick={loadDetails}>{movie.original_title}</h3>
                <p>{`${movie.vote_average.toFixed(1)} / 10`}</p>
                <p>{movie.description}</p>
            </div>
        </div>
    );
}



export default RecommendCard;