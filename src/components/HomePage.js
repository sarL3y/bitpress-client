import React from 'react';

import Navbar from './Navbar';
import TopicsBar from './TopicsBar';

const HomePage = props => {
    return (
        <main>
            <Navbar {...props} />
            <div className="container-homepage">
                <TopicsBar />
            </div>
        </main>
    );
};

export default HomePage;