import React from 'react';

import Navbar from './Navbar';
import TopicsBar from './TopicsBar';
import DashboardFeed from './DashboardFeed';
import firebase from '../firebase';

import './Dashboard.scss';
import './DashboardFeed.scss';

export default function Dashboard(props) {

    if(!firebase.getCurrentUsername()) {
        props.history.replace("/login");
        return null;
    }

    return (
        <div>
            <Navbar {...props} />

            <div className="container-dashboard">
                <div className="row-topics">
                    <TopicsBar />
                </div>

                <div className="page-headers">
                    <h2>BitPress Dashboard</h2>
                    <p>Do some dashboard stuff.</p>
                </div>
                
                <div className="container-feed">
                    <DashboardFeed />
                </div>
            </div>
        </div>
    ); 
};