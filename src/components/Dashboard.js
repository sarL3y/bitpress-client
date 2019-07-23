import React from 'react';

import firebase from '../firebase';

import Navbar from './Navbar';
import DashboardFeed from './DashboardFeed';

import './Dashboard.scss';
import './DashboardFeed.scss';

export default function Dashboard(props) {

    if(!firebase.getCurrentUsername()) {
        props.history.replace("/login");
        return null;
    }

    return (
        <main role="main">
            <Navbar {...props} />

            <div className="container-dashboard">
                <div className="dashboard-headers">
                    <p className="dashboard-title">YOUR NEWS.</p>
                </div>
                
                <div className="container-feed">
                    <DashboardFeed />
                </div>
            </div>
        </main>
    ); 
};