import React from 'react';
import Navbar from './Navbar';

const HomePage = props => {
    return (
        <main>
            <Navbar {...props} />
            <div>
                <h2>BitPress HomePage</h2>
                <p>Lorem Ipsum</p>
            </div>
        </main>
    );
};

export default HomePage;