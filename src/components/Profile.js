import React from 'react';
import Navbar from './Navbar';
import firebase from '../firebase';

import Topics from './Topics';
import Sources from './Sources';

import './Profile.scss';
import './Topics.scss';
import './Sources.scss';

export default function Profile(props) {
    return (
        <main>
            <Navbar {...props} />

            <div className="container-profile">
                <h2>Profile</h2>
                <p>Lorem Ipsum</p>

                <div className="container-personal-info">
                    <h3>Personal Info</h3>
                    <p>Username: {firebase.auth.currentUser.displayName}</p>
                    <p>Email: {firebase.auth.currentUser.email}</p>
                </div>
                <div className="container-preferences">
                    <h3>Preferences</h3>
                    <h4>Topics</h4>
                    <Topics />
                    <h4>Sources</h4>
                    <Sources />
                </div>
            </div>
        </main>
    );
};