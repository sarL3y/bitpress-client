import React, { useEffect } from 'react';
import Navbar from './Navbar';
import firebase from '../firebase';

import Topics from './Topics';

import './Profile.scss';
import './Topics.scss';
import './Sources.scss';

export default function Profile(props) {

    useEffect(() => {
        firebase.addNewReader();
    }, []);

    if(!firebase.getCurrentUsername()) {
        alert("Please login");
        console.log("PROFILE DID IT");
        props.history.replace("/login");
        return null;
    }

    return (
        <main role="main">
            <Navbar {...props} />

            <div className="container-profile">
                <div className="page-headers">
                    <h2>Profile</h2>
                    <p>Lorem Ipsum</p>
                </div>

                <div className="container-personal-info">
                    <h3>Personal Info</h3>
                    <p>Username: {firebase.auth.currentUser.displayName}</p>
                    <p>Email: {firebase.auth.currentUser.email}</p>
                </div>
                <div className="container-preferences">
                    <h3>Preferences</h3>
                    <h4>Topics</h4>
                    <Topics />
                </div>
            </div>
        </main>
    );
};