import React, { useState, useEffect } from 'react';

import firebase from '../firebase';

import './TopicsBar.scss';

export default function TopicsBar() {

    const [topics, setTopics] = useState([]);
    const [follows, setFollows] = useState([]);
    
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

        if (firebase.auth.currentUser) {
            firebase.getUserFollows()
                .then(follows => {
                    let newFollows = [];

                    follows.forEach(follow => {
                        newFollows.push(follow);
                    });

                    setFollows(newFollows);
                })
        }
        
    }, []);

    const following = () => {
        return topics && follows ? (
            topics.map((topic, index) => (
                follows.includes(topic.id) ? (
                    <div key={index} className="row-topic">
                        <a 
                            href={`/topic/${topic.id}`}
                            className="button-topic"
                        >
                            {topic.data.topic}
                        </a>
                    </div>
                ) : (
                    false
                )
            ))
        ) : (
            <div>Loading...</div>
        )
    };

    const trending = () => {
        return topics && follows ? (
            topics.map((topic, index) => (
                follows.includes(topic.id) ? (
                    false
                ) : (
                    <div key={index} className="row-topic">
                        <a 
                            href={`/topic/${topic.id}`}
                            className="button-topic"
                        >
                            {topic.data.topic}
                        </a>
                    </div>
                )
            ))
        ) : (
            <div>Loading...</div>
        );
    };

    return [following(), trending()];
    
};