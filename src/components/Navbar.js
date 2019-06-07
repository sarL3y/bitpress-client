import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import firebase from '../firebase';

import './Navbar.scss';

export default function Navbar(props) {
    async function logout() {
        await firebase.logout();
        props.history.push("/");
    }

    return (
        <nav className="navbar" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <h1>
                    <Link to="/">BitPress</Link>
                </h1>
            </div>

            <div className="navbar-links">
                {!firebase.getCurrentUsername() ? (
                    <div className="navbar-buttons">
                        <Link className="button" to="/register">Sign Up</Link>
                        <Link  className="button" to="/login">Login</Link>
                    </div>
                ) : (
                    <div className="navbar-buttons">
                        <Link className="button" to="/dashboard">Dashboard</Link>
                        <Link className="button" to="/profile">Profile</Link>
                        <a className="button" onClick={logout}>Logout</a>
                    </div>
                )}
            </div>
        </nav>
    );
};