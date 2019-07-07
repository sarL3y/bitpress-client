import React, { useEffect, useState } from 'react';

// Topic page will call the API in the useEffect
// Topic page will have forward and back buttons to navigate to the topic page url
// OR Topic page will have the rest of the topics in a list

import firebase from '../firebase';
import Navbar from './Navbar';
import TopicsBar from './TopicsBar';

import './Topic.scss';

export default function Topic(props) {

    const [topic, setTopic] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [followsCount, setFollowsCount] = useState("");
    const [follows, setFollows] = useState([]);

    useEffect(() => {

        firebase.countFollows(props.match.params.id)
            .then(count => {
                setFollowsCount(count);
            });

        firebase.getTopic(props.match.params.id)
            .then(topic => {
                let newTopic = {};

                newTopic.id = topic.id;
                newTopic.data = topic.data().topic;
                setTopic(newTopic);
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
        <div>
            <Navbar {...props} />

            <div className="container-dashboard">
                <TopicsBar />
            </div>

            {topic ? (
                <div className="container-topic">
                    <h5>{topic.data.topic}</h5>
                    <p>{followsCount}</p>
                        {follows.includes(topic.id) ? (
                            <div className="button-unFollow unFollowTopic">
                                <a 
                                    href={`/unFollowTopic/${topic.id}`}
                                    onClick={e => toggleFollowTopic(e, false, topic.id)}
                                >
                                    Following {topic.data.topic}
                                </a>
                            </div>
                            ) : (
                                <div className="button-follow followTopic">
                                    <a 
                                        href={`/followTopic/${topic.id}`}
                                        onClick={e => toggleFollowTopic(e, true, topic.id)}
                                    >
                                        Follow {topic.data.topic}
                                    </a>
                                </div>
                            )
                        }
                </div>
            ) : (
                <div>Loading...</div>
            )
            }
        </div>
    );
};