import React, { useEffect } from 'react';

import Navbar from './Navbar';
import TopicsBar from './TopicsBar';
import DashboardFeed from './DashboardFeed';
import firebase from '../firebase';

import './Dashboard.scss';

export default function Dashboard(props) {

    return (
        <div>
            <Navbar {...props} />

            <div className="container-dashboard">
                <TopicsBar />

                <div className="container-feed">
                    <DashboardFeed />
                </div>
            </div>
        </div>
    ); 
};