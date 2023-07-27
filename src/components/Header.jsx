import React from 'react';

const Header = ()=>{
    
    return (
        <div className='header'>
            <a href="/">Home</a>
            <a href="/profile">Watched</a>
            
            <a href="/recommend">Recommender</a>
            <a href="/watchlist">Watchlist</a>
        </div>
    );
}



export default Header;