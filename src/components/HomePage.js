import React from 'react';
import { Link } from 'react-router-dom';

import Navbar from './Navbar';
import TopicsBar from './TopicsBar';

import './HomePage.scss';
import './LoadingIcon.scss';

export default function HomePage(props) {
    return (
        <main role="main">
            <Navbar {...props} />

            <div className="container-homepage">
                <div className="row-topics">
                <TopicsBar {...props} />
                </div>

                <div className="page-headers">
                    <h2>HomePage for BitPress.</h2>
                    <p>Do some signup stuff.</p>
                </div>

                <div className="container-tinyNews">
                    <div className="tinyNews">
                        <div className="tinyNewsTitleBig">
                            <img src="/bitPressIconLeftFront.png" alt="bitPress logo" className="navbar-logo" />
                        </div>
                        <div className="tinyNewsTitleSmall"></div>
                            <div className="tinyNewsColumns">
                                <div className="tinyNewsLeft"></div>
                                <div className="tinyNewsCenter">
                                    <div className="tinyNewsCenterTop"></div>
                                    <div className="tinyNewsCenterBottom"></div>
                                </div>
                                <div className="tinyNewsRight"></div>
                            </div>
                    </div>
                </div>

                <div className="navbar-links">
                    <div className="navbar-buttons">
                        <Link className="button primary" to="/register">Sign Up</Link>
                        <Link className="button" to="/login">Login</Link>
                    </div>
                </div>
            </div>
        </main>
    );
};