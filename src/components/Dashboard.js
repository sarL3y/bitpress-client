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
                    {/* <div className="border-heavy-top"></div> */}
                    {/* <p className="dashboard-header">THE NEWS.</p> */}
                    <p className="dashboard-title">YOUR NEWS.</p>
                    {/* <div className="border-heavy-bottom"></div> */}
                </div>
                
                <div className="container-feed">
                    <DashboardFeed />
                </div>
            </div>
        </main>
    ); 
};