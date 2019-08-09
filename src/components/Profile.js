import React, { useEffect } from 'react';
import Navbar from './Navbar';
import firebase from '../firebase';

import Topics from './Topics';

import './Profile.scss';

export default function Profile(props) {

    useEffect(() => {
        firebase.addNewReader();
    }, []);

    if(!firebase.getCurrentUsername()) {
        alert("Please login");
        props.history.replace("/login");
        return null;
    }

    return (
        <main role="main">
            <Navbar {...props} />

            <div className="container-profile">
                <div className="profile-headers">
                    <h3 className="profile-title">PROFILE.</h3>
                </div>

                <div className="container-preferences">
                    <Topics />
                </div>

                <div className="container-personal-info">
                    <h3>Personal Info</h3>
                    <p>Username: {firebase.auth.currentUser.displayName}</p>
                    <p>Email: {firebase.auth.currentUser.email}</p>
                </div>
            </div>
        </main>
    );
};