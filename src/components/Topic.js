import React, { useEffect, useState } from 'react';

// Topic page will call the API in the useEffect
// Topic page will have forward and back buttons to navigate to the topic page url
// OR Topic page will have the rest of the topics in a list (solved by TopicsBar already)

import firebase from '../firebase';
import Navbar from './Navbar';
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

                // let today = new Date();
                // console.log(today);

                fetch(`https://newsapi.org/v2/everything?q=${newTopicTitle}&sortBy=relevancy&sortBy=publishedAt&apiKey=2ebfd3fb49e24fb0bb7f76b9cab685b5`)
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

                    {topic ? (
                        <div className="topic-headers">  
                            <div className="border-heavy-top"></div>
                            <p className="topic-header">THE TOP HEADLINES FOR</p>
                            <p className="topic-title">{topic.data.topic}</p>
                            <div className="border-heavy-bottom"></div>
                            <div className="follower-header">
                                <div className="follower-count">
                                    <p><span className="follower-count-number">{followsCount}</span> following</p>   
                                </div>  
                                {follows.includes(topic.id) ? (
                                    <a 
                                        href={`/unFollowTopic/${topic.id}`}
                                        onClick={e => toggleFollowTopic(e, false, topic.id)}
                                    >
                                        <div className="button-topic-following">
                                            Following
                                        </div>
                                    </a>
                                    ) : (
                                    <a
                                        href={`/followTopic/${topic.id}`}
                                        onClick={e => toggleFollowTopic(e, true, topic.id)}
                                    >
                                        <div className="button-topic-follow">
                                            Follow
                                        </div>
                                    </a>
                                    )}
                            </div>
                        </div>
                    ) : (
                        <LoadingIcon />
                    )}

                    {fetchedData ? (
                        fetchedData.articles.map((data, index) => (
                            <div key={index} className="article-container">
                                <div className="article-container-left">
                                    <div className="article-image-container">
                                        <img className="article-image" src={`${data.urlToImage}`} alt={"Article related"} />
                                    </div>
                                </div>

                                <div className="article-container-right">
                                    <p className="article-reporting"><span className="article-author">{`${data.author}`}</span> reporting for <span className="article-source">{`${data.source.name}`}</span>:</p>
                                    <a className="article-title" href={`${data.url}`} rel="noreferrer">
                                        <h4>{`${data.title}`}</h4>
                                    </a>
                                    <p className="article-description">{`${data.description}`}</p>
                                    <p className="article-date">Published: {`${data.publishedAt.substring(0, 10)}`}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <LoadingIcon />
                    )}
                </div>
            </main>
    );
};