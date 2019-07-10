import React, { useState, useEffect } from 'react';

import firebase from '../firebase';

import './TopicsBar.scss';

export default function TopicsBar() {

    const [topics, setTopics] = useState([]);
    
    useEffect(() => {

        firebase.getTopics()
            .then(topics => {
                let newTopics = [];

                topics.forEach(topic => {
                    newTopics.push({
                        id: topic.id,
                        data: topic.data().topic
                    });
                });

                setTopics(newTopics);
            });
    }, []);

    return !topics ? 
        <div>Loading...</div> : (
            <div className="row-topics">
                <p>Following:</p>
                {topics.map((topic, index) => (
                    <div key={index} className="row-topic">
                        <a 
                            href={`/topic/${topic.id}`}
                            className="button-topic"
                        >
                            {topic.data.topic}
                        </a>
                    </div>
                ))}
            </div>
    );
};