import React from 'react';
import Navbar from './Navbar';

const HomePage = props => {
    return (
        <main>
            <Navbar {...props} />
            <div className="container-homepage">
                <h2>bitPress HomePage</h2>
                <p>Lorem Ipsum</p>
            </div>
        </main>
    );
};

export default HomePage;