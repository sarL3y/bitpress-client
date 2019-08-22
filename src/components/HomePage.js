import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import firebase from '../firebase';

import Navbar from './Navbar';

import './HomePage.scss';
import './LoadingIcon.scss';

export default function HomePage(props) {

    const [topics, setTopics] = useState([]);

    useEffect(() => {

        firebase.getTopics()
            .then(topics => {
                let newTopics = [];

                topics.forEach(topic => {
                    newTopics.push({
                        id: topic.id,
                        data: topic.data().topic,
                    });
                });

                setTopics(newTopics);
            });
    }, []);

    return (
        <main role="main">
            <Navbar {...props} />

            <div className="container-homepage">
                <div className="homepage-headers">
                    <p className="homepage-header">THE NEWS.</p>
                    <p className="homepage-title">YOUR WAY.</p>
                </div>

                <div className="homepage-cta">
                    <p>Sign up to create and follow <span className="homepage-cta-card">TOPICS</span> like the ones you see below.</p>
                    <p>You'll get the top headlines for each, so you can stay current with the news you care about.</p>
                </div>

                <div className="homepage-buttons">
                    <Link className="button primary" to="/register">Sign Up</Link>
                    <Link className="button" to="/login">Login</Link>
                </div>

                <div className="container-homepage-topics">
                {topics.map((topic, index) => (
                    <a key={index} href={`/topic/${topic.id}`}>
                        <div className="homepage-card">
                            <h4>{topic.data.topic}</h4>
                        </div>
                    </a>
                ))}
                </div>
            </div>
        </main>
    );
};