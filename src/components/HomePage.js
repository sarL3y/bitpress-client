import React from 'react';

import Navbar from './Navbar';
import TopicsBar from './TopicsBar';

import './HomePage.scss';

export default function HomePage(props) {
    return (
        <main>
            <Navbar {...props} />
            <div className="container-homepage">
                <TopicsBar />
                <h2>HomePage for BitPress.</h2>
                <p>Do some signup stuff.</p>
            </div>
        </main>
    );
};