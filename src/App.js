import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home'
import Detail from './pages/detail/Detail'
import Header from './components/Header'
import Profile from './pages/profile/Profile'
import Watchlist from './pages/watchlist/Watchlist';
import Recommend from './pages/recommend/Recommend'

const App = () => {

    // sets up localStorage object for adding and saving user movies
    if (!("profile" in localStorage)){
        const profile = {
            "username":"Local",
            "password":"admin",
            "movies":{"502356":{"title":"The Super Mario Bros. Movie","release_date":"2023-04-05","user_rating":4},"569094":{"title":"Spider-Man: Across the Spider-Verse","release_date":"2023-01-06","user_rating":4},"603692":{"title":"John Wick: Chapter 4","release_date":"2023-03-22","user_rating":1}},
            "recommended":{},
            "watchlist": {}
        }
        localStorage.setItem("profile",JSON.stringify(profile))
    }


    return (
        <>
        <Header />
        <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/details/:id' element={<Detail/>}/>
            <Route path='/profile' element={<Profile/>}/>
            <Route path='/watchlist' element={<Watchlist/>}/>
            <Route path='/recommend' element={<Recommend/>}/>
        </Routes>

        </>
    );

}

export default App;