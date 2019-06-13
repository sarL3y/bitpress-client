import React from 'react';

import Navbar from './Navbar';
import TopicsBar from './TopicsBar';
import Feed from './Feed';

import './Dashboard.scss';

export default function Dashboard(props) {
    console.log('Dashboard loaded');

    return (
        <div>
            <Navbar {...props} />

            <div className="container-dashboard">
                <TopicsBar />
            </div>

            <div className="container-feed">
                <Feed />
            </div>
        </div>
    ); 
};