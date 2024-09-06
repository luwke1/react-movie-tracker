import React, { useEffect, useState } from 'react';

import addIcon from '../../plus-square.svg'

import api from '../../api/apiConfig'
import openapi from '../../api/openAPI'
import { Configuration, OpenAIApi } from 'openai';
import sendIcon from '../../send-fill.svg'
import './recommend.css'
import RecommendCard from '../../components/RecommendCard';

const openai = new OpenAIApi(new Configuration({
    apiKey: openapi.apiKey
}))

let searchDisplay = "grid";
let loadDisplay = "none";

const Collection = () => {
    const [watchlist, setWatchlist] = useState([]);
    const [recs, setRecs] = useState({});
    const [disabled, setDisabled] = useState(false);
    let profile = JSON.parse(localStorage.getItem("profile"));

    // Used once openAI API returns a JSON of all the movie recommendations
    // This will fetch movie data from TMDB API for each movie in the JSON and save to local storage
    async function getAllMovies(movieJSON) {
        try {
            // Create an array of promises for each movie in the JSON
            const moviePromises = movieJSON.movies.map(async (movie) => {
                const response = await fetch(`${api.baseUrl}search/movie?api_key=${api.apiKey}&primary_release_year=${movie.release_date.substring(0, 4)}&query=${movie.title}`);
                const data = await response.json();
                if (data.total_results >= 1) {
                    data.results[0]["description"] = movie.description
                    return data.results[0];
                }
            });
            // Waits for all promises to resolve and sets the data
            const movieData = await Promise.all(moviePromises);
            profile.recommended = movieData;
            localStorage.setItem("profile", JSON.stringify(profile));
            setRecs(movieData);
        } catch (error) {
            console.error(error);
        }
    }

    // Makes a call to OpenAI API to generate movie recommendations based on the user prompt.
    // It will forcefully return JSON code that I can use to get movie details on TMDB API
    async function generateMovies(prompt) {
        try {
            searchDisplay = "none";
            loadDisplay = "grid";
            setDisabled(true);
            
            const completion = await openai.createChatCompletion({
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        role: "system",
                        content: "You are a movie recommendation assistant that only speaks JSON. List 15 movies based on the user prompt and return JSON in the format of the movie's title, release date, and non-spoiler description of why it fits. Do not write normal text."
                    },
                    { role: "user", content: prompt }
                ]
            });

            const movieData = JSON.parse(completion.data.choices[0].message.content);
            await getAllMovies(movieData);
        } catch (error) {
            console.error("Error generating movies:", error);
            // Handle the error appropriately (e.g., show an error message to the user)
        } finally {
            searchDisplay = "grid";
            loadDisplay = "none";
            setDisabled(false);
        }
    }
    
    useEffect(() => {
        if (Object.keys(profile.recommended).length > 1) {
            setRecs(profile.recommended);
        }
    }, []);

    const handleKeyDown = (event) => {
        const VALID_CHARS = /^[A-Za-z ]+$/
        if (event.key === 'Enter') {
            let prompt = event.target.value
            if (prompt.length > 5) {
                generateMovies(prompt);
            }
        } else if (!VALID_CHARS.test(event.key)) {
            event.preventDefault();
        }
    }

    return (
        <div className='profileBody'>
            <div className='profileSec'>
                <div>
                    <h1>Generate Recommendations </h1>
                </div>
            </div>
            <div className='recSection'>
                <div style={{display: loadDisplay}} class="center">
                    <div class="wave"></div>
                    <div class="wave"></div>
                    <div class="wave"></div>
                    <div class="wave"></div>
                    <div class="wave"></div>
                    <div class="wave"></div>
                    <div class="wave"></div>
                    <div class="wave"></div>
                    <div class="wave"></div>
                    <div class="wave"></div>
                </div>
                <div style={{display: searchDisplay}} className='searchArea'>
                    <div><input disabled={disabled} minLength={5} maxLength={80} placeholder='ex: list action movies that have dogs as the main character' onKeyDown={handleKeyDown} /></div>
                    <div><img width='30px' height='40px' className='icons' src={sendIcon} alt="search" /></div>
                </div>
            </div>
            <div className='recSection'>

                {

                    recs.length > 0
                        ? (
                            recs.map((movie) => {
                                if (movie) {
                                    return <RecommendCard movie={movie} />
                                }
                            })
                        ) : (
                            <p></p>
                        )
                }
            </div>
        </div>
    );
}

export default Collection;