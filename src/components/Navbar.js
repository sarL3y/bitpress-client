import React from 'react';
import { Link } from 'react-router-dom';

import firebase from '../firebase';

import './Navbar.scss';

export default function Navbar(props) {
    
    async function logout(e) {
        e.preventDefault();
        await firebase.logout();
        props.history.push("/");
    }

    return (
        <nav className="navbar" role="navigation" aria-label="main navigation">

            <div className="navbar-brand">
                <Link to="/">
                    <h1><img src="/bitPressIconLeftFront.png" alt="bitPress logo" className="navbar-logo" /></h1>
                </Link>
            </div>

            <div className="navbar-news mobile-hidden">
                <a href="https://www.cnn.com/2019/06/10/politics/donald-trump-cnbc-tariffs-china-mexico/index.html" className="news-link">
                    "The 27 most dubious lines from Donald ..." >>
                </a>
            </div>

            {!firebase.getCurrentUsername() ? false : (
                <div className="navbar-search-form mobile-hidden">
                <form onSubmit={e => e.preventDefault() && false}>
                    <div className="form-input-text">
                        <input 
                            placeholder="Oat Milk"
                            type="text"
                            value=""
                            aria-label="topic"
                            onChange={e => e.preventDefault()}
                        />

                        <button type="submit" className="button navbar-search-button" onClick={e => e.preventDefault}>
                            Search
                        </button>
                    </div>
                </form>
            </div>
            )}

            <div className="navbar-links">
                {!firebase.getCurrentUsername() ? (
                    <div className="navbar-buttons">
                        <Link className="button primary" to="/register">Sign Up</Link>
                        <Link className="button" to="/login">Login</Link>
                    </div>
                ) : (
                    <div className="navbar-buttons">
                        <Link className="button primary" to="/dashboard">Dashboard</Link>
                        <Link className="button" to="/profile">Profile</Link>
                        <a href="/logout"className="button" onClick={logout}>Logout</a>
                    </div>
                )}
            </div>
        </nav>
    );
};