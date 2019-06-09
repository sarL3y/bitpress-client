import React from 'react';
import Navbar from './Navbar';

import Preferences from './Preferences';
import PersonalInfo from './PersonalInfo';

import './Profile.scss';

const Profile = props => {
    return (
        <main>
            <Navbar {...props} />

            <div className="container-profile">
                <h2>Profile</h2>
                <p>Lorem Ipsum</p>

                <div className="container-personal-info">
                    <h3>Personal Info</h3>
                    <PersonalInfo />
                </div>
                <div className="container-preferences">
                    <h3>Preferences</h3>
                    <Preferences />
                </div>
            </div>
        </main>
    );
};

export default Profile;