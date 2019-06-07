import React from 'react';
import Navbar from './Navbar';

import Preferences from './Preferences';

import './Profile.scss';

const Profile = props => {
    return (
        <main>
            <Navbar {...props} />
            <div className="container-profile">
                <h2>BitPress Profile</h2>
                <p>Lorem Ipsum</p>
                <h3>Preferences</h3>
                <Preferences />
            </div>
        </main>
    );
};

export default Profile;