import React from 'react';
import Navbar from './Navbar';

const Profile = props => {
    return (
        <main>
            <Navbar {...props} />
            <div>
                <h2>BitPress Profile</h2>
                <p>Lorem Ipsum</p>
            </div>
        </main>
    );
};

export default Profile;