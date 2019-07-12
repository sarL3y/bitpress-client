import React, { useEffect, useState } from 'react';

// Topic page will call the API in the useEffect
// Topic page will have forward and back buttons to navigate to the topic page url
// OR Topic page will have the rest of the topics in a list (solved by TopicsBar already)

import firebase from '../firebase';
import Navbar from './Navbar';
import TopicsBar from './TopicsBar';
import LoadingIcon from './LoadingIcon';

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

        if (firebase.auth.currentUser) {
            firebase.getUserFollows()
                .then(follows => {
                    let newFollows = [];

                    follows.forEach(follow => {
                        newFollows.push(follow);
                    });

                setFollows(newFollows);
            });
        }

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

                fetch(`https://newsapi.org/v2/top-headlines?q=${newTopicTitle}&apiKey=2ebfd3fb49e24fb0bb7f76b9cab685b5`)
                        .then(response => {
                            response.json()
                                .then(newResponse => {
                                    setFetchedData(newResponse);
                                });
                        })
                        .catch(error => {
                            setError(error);
                        });
            });

    }, [isLoading, props.match.params.id]);

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

    return error ? 
        <div>{error.message}</div> : (
            <main role="main">
                <Navbar {...props} />
                <div className="container-topic">
                    <div className="row-topics">
                        <TopicsBar />
                    </div>

                    <div className="page-headers">
                    <h2>BitPress Topic Page</h2>
                    <p>Do some topic stuff.</p>
                </div>
                
                {topic && fetchedData ? (
                    <div>
                        <h3>{topic.data.topic}</h3>
                        <p>{followsCount} Following</p>
                            {follows.includes(topic.id) ? (
                                <div className="button-unFollow unFollowTopic">
                                    <a 
                                        href={`/unFollowTopic/${topic.id}`}
                                        onClick={e => toggleFollowTopic(e, false, topic.id)}
                                    >
                                        Following
                                    </a>
                                </div>
                                ) : (
                                    <div className="button-follow followTopic">
                                        <a 
                                            href={`/followTopic/${topic.id}`}
                                            onClick={e => toggleFollowTopic(e, true, topic.id)}
                                        >
                                            Follow
                                        </a>
                                    </div>
                                )
                            }
                            {fetchedData.articles.map((data, index) => (
                                <div key={index} className="article-card">
                                    <p>{data.title}</p>
                                    <a href={`${data.url}`} rel="noreferrer">{data.url}</a>
                                    <p>By: {`${data.author}`}</p> 
                                    <p>Date posted: July 7th, 2019</p>
                                    <img src={`${data.url}`} alt={`${"Alt text"}`} />
                                </div>

                            ))}
                    </div>

                ) : (
                    <div className="container-topic">
                        <LoadingIcon />
                    </div>
                )}
            </div>
        </main>
    );
};