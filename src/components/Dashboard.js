import React from 'react';

import Navbar from './Navbar';
import TopicsBar from './TopicsBar';
import Feed from './Feed';
import Card from './Card';

import './Dashboard.scss';

export default function Dashboard(props) {

    return (
        <div>
            <Navbar {...props} />

            <div className="container-dashboard">
                <TopicsBar />

                <div className="container-feed">
                    <Card />
                </div>
            </div>
        </div>
    ); 
};