import React, { useEffect, useState } from 'react';

import firebase from '../firebase';
import LoadingIcon from './LoadingIcon';

import './Topics.scss';

export default function Topics(props) {

    const [topics, setTopics] = useState([]);
    const [topic, setTopic] = useState("");
    const [follows, setFollows] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    
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

        firebase.getUserFollows()
            .then(follows => {
                let newFollows = [];

                follows.forEach(follow => {
                    newFollows.push(follow);
                });

                setFollows(newFollows);
            });

    }, [isLoading]);

    if(!firebase.getCurrentUsername()) {
        alert("Please login");
        props.history.replace("/login");
        return null;
    }

    async function addTopic() {
        const topicString = topic.toString();

        if (topicString.length < 2) {
            return alert("Type in a topic to search!");
        } else {
            try {
                await firebase.addTopic({ "topic": topic.toUpperCase() });
                await firebase.followAddedTopic(topic)
                    .then(topicToFollow => {
                        firebase.addFollow(topicToFollow.id);               
                        });
                await setTopic("");
    
                setIsLoading(!isLoading);
            } catch(error) {
                await setTopic("");
                setIsLoading(!isLoading);
            }
        }
    }

    async function toggleFollowTopic(e, followingBoolean, topic) {
        e.preventDefault();

        if(followingBoolean) {
            await firebase.addFollow(topic);
            setIsLoading(!isLoading);
        } else {
            await firebase.unFollow(topic);
            setIsLoading(!isLoading);
        }
    }

    return ( 
        <div className="container-topics">
            <div className="topics-headers">
                <h4>Enter a topic to start following.</h4>
                <p>Click below to follow or unfollow topics that other readers and you have added. Head back to the dashboard to view your personal selections and click them to read their top headlines.</p>
            </div>

            <form className="form-topics" onSubmit={e => e.preventDefault() && false}>
                <div className="form-input-text">
                    <input 
                        placeholder="Women's Soccer"
                        type="text"
                        value={topic.toString()}
                        aria-label="topic"
                        onChange={e => setTopic(e.target.value)}
                    />

                    <button type="submit" className="form-topics-submit" onClick={(topic) => addTopic(topic)}>
                        Search
                    </button>
                </div>
            </form>

            <div className="topics">
            {topics && follows ? (
                topics.map((topic, index) => (
                    follows.includes(topic.id) ? (
                        <a 
                            href={`/unFollowTopic/${topic.id}`}
                            className=""
                            onClick={e => toggleFollowTopic(e, false, topic.id)}
                            key={index}
                            >
                                <div className="following profile-topic">
                                    <h4>{topic.data.topic}</h4>
                                </div>
                        </a>
                    ) : (
                        false
                    )
                ))
            ) : (
                <LoadingIcon />
            )}
            {topics && follows ? (
                topics.map((topic, index) => (
                    follows.includes(topic.id) ? (
                        false
                    ) : (
                        <a 
                            href={`/followTopic/${topic.id}`}
                            className=""
                            onClick={e => toggleFollowTopic(e, true, topic.id)}
                            key={index}
                            >
                                <div className="follow profile-topic">
                                    <h4>{topic.data.topic}</h4>
                                </div>
                        </a>
                    )
                ))
            ) : (
                <LoadingIcon />
            )}

            </div>
        </div>
    );
};