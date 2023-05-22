import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home'
import Detail from './pages/detail/Detail'
import Header from './components/Header'
import Profile from './pages/profile/Profile'

const App = () => {

    // sets up localStorage object for adding and saving user movies
    const profile = {
        "username":"Local",
        "password":"admin",
        "movies":[{"id":713704}, {"id":447365
        },
        {"id":868985}]
    }
    if (!("profile" in localStorage)){
        localStorage.setItem("profile",JSON.stringify(profile))
    }


    return (
        <>
        <Header />
        <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/details/:id' element={<Detail/>}/>
            <Route path='/profile' element={<Profile/>}/>
        </Routes>

        </>
    );

}

export default App;