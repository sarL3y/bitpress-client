import React, { useState, useEffect } from 'react';

import firebase from '../firebase';

import './TopicsBar.scss';

const TopicsBar = (props) => {

    const [topics, setTopics] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    
    useEffect(() => {

        setIsLoading(true);

        firebase.getTopics()
        .then(topics => {
            let newTopics = [];
            topics.forEach(topic => {
                newTopics.push({
                    id: topic.id,
                    data: topic.data().topic
                });
            })
            setTopics(newTopics);
            setIsLoading(false);
        });
    }, []);

    return (
        <div className="row-topics">
            <p>Trending:</p>
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
    )
}

export default TopicsBar;