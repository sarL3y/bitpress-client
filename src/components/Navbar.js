import React from 'react';
import { Link } from 'react-router-dom';

import firebase from '../firebase';

import TopicsBar from './TopicsBar';

import './Navbar.scss';
import './TopicsBar.scss';

export default function Navbar(props) {
    
    async function logout(e) {
        e.preventDefault();
        await firebase.logout();
        props.history.push("/");
    }

    return (
        <div className="nav-wrapper">
            <nav className="navbar" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <Link to="/HomePage">
                        <h1><img src="/bitPressIconLeftFront.png" alt="bitPress logo" className="navbar-logo" /></h1>
                    </Link>
                </div>

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
            </nav>

            <div className="row-topics">
                <TopicsBar {...props} />
            </div>
        </div>
    );
};