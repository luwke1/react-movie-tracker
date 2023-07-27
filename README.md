# react-movie-helper

* NOTE: This react app cannot be built and tested without API keys, which can be setup in the "api" folder

Responsive ReactJS web app made with HTML, CSS, and JavaScript. Allows users to rate and save movies they have seen. Uses TMDB API for movie data and OpenAI API for smart movie recommendations.

Users can scroll through catalog of movies and either rate the movies they have seen from 1-5, or they can add a movie to their future watchlist.

Users can also get recommended movies. They can put in a prompt like "list action movies where a dog is the main character." The app will use OpenAI API to generate a list of movie recommendations, and then use TMDB API to get the movie data for those recommendations.

# Set-up

- Setup API keys in "api" folder
- Download and clone repository
- run ```npm install``` in project folder
- run ```npm start``` to preview app
