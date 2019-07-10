import React, { useEffect, useState } from 'react';

// Topic page will call the API in the useEffect
// Topic page will have forward and back buttons to navigate to the topic page url
// OR Topic page will have the rest of the topics in a list

import firebase from '../firebase';
import Navbar from './Navbar';
import TopicsBar from './TopicsBar';
import useHttp from '../hooks/useHttp';

import './Topic.scss';

export default function Topic(props) {

    const [topic, setTopic] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [followsCount, setFollowsCount] = useState("");
    const [follows, setFollows] = useState([]);
    const [fetchedData, setFetchedData] = useState(null);
    const [error, setError] = useState("");

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
                newTopic.title = topic.data().topic.topic;
                setTopic(newTopic);
                return newTopic;
            })
            .then(newTopic => {
                let newTopicTitle = newTopic.title;

                fetch(`https://newsapi.org/v2/everything?q=${newTopicTitle}&apiKey=2ebfd3fb49e24fb0bb7f76b9cab685b5`)
                        .then(response => {
                            const newResponse = response.json()
                                .then(newResponse => {
                                    setFetchedData(newResponse);
                                });
                        })
                        .catch(error => {
                            setError(error);
                        });
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

            {topic && fetchedData ? (
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
                        {fetchedData.articles.map((data, index) => (
                            <div key={index} className="article-card">
                                <p>{data.title}</p>
                                <a href={`${data.url}`}>{data.url}</a>
                                <p>By: {`${data.author}`}</p> 
                                <p>Date posted: July 7th, 2019</p>
                                <img src={`${data.url}`} alt={`${"Alt text"}`} />
                            </div>
                        ))}
                </div>

            ) : (
                <div>Loading...</div>
            )
            }
        </div>
    );
};