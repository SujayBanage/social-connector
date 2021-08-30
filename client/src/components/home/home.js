import React from 'react'
import './home.css';
import {Link} from 'react-router-dom';
import socialmedia from './socialmedia2.svg'
const Home = () => {
    return (
        <>
        <div className="homecomponent h-screen w-screen flex flex-col items-center justify-center">
            <h1 className="text-4xl lg:text-7xl text-white font-bold">Social-Connector</h1>
            <img src={socialmedia} className="mt-10 h-48 lg:h-80" alt="svg"/>
            <div className="buttons flex items-center justify-between">
                <Link to="/signup">
                    <button className="signup m-4">Signup</button>
                </Link>
                <Link to="/login">
                    <button className="login m-4">Login</button>
                </Link>
            </div>
        
        </div>
        </>
    )
}

export default Home;
