import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Search from './pages/Search';
import Detail from './pages/detail/Detail';
import Header from './components/Header';
import Profile from './pages/profile/Profile';
import Watchlist from './pages/watchlist/Watchlist';
import Recommend from './pages/recommend/Recommend';


const App = () => {

    // sets up localStorage object for adding and saving user movies
    if (!("profile" in localStorage)){
        const profile = {
            "username":"Local",
            "password":"admin",
            "movies":{},
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
            <Route path='/search/:id' element={<Search/>}/>
            <Route path='/profile' element={<Profile/>}/>
            <Route path='/watchlist' element={<Watchlist/>}/>
            <Route path='/recommend' element={<Recommend/>}/>
        </Routes>

        </>
    );

}

export default App;