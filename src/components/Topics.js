import React, { useEffect, useState } from 'react';

import firebase from '../firebase';

import './Topics.scss';

export default function Topics(props) {

    const [topics, setTopics] = useState([]);
    const [topic, setTopic] = useState("");
    const [readers, setReaders] = useState({});
    const [follows, setFollows] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    
    useEffect(() => {

        let tempReaders = {};

        firebase.getReaders()
            .then(readers => {
                readers.forEach(reader => {
                    tempReaders[reader.data().uid] = reader.data().username;
                });

                setReaders(tempReaders);

                firebase.addNewReader();

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
            });

    }, [isLoading]);

    if(!firebase.getCurrentUsername()) {
        alert("Please login");
        props.history.replace("/login");
        return null;
    }

    async function addTopic() {
        try {
            await firebase.addTopic({ topic, owner: firebase.auth.currentUser.uid });
            await firebase.followAddedTopic(topic)
                .then(topicToFollow => {
                    firebase.addFollow(topicToFollow.id);               
                    });
            await setTopic("");

            setIsLoading(!isLoading);
        } catch(error) {
            console.log(error.message);
            setIsLoading(!isLoading);
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
            <h3>Enter a topic</h3>
            <form className="form-topics" onSubmit={e => e.preventDefault() && false}>
                <div className="form-input-text">
                    <input 
                        placeholder="Nancy Pelosi"
                        type="text"
                        value={topic}
                        aria-label="topic"
                        onChange={e => setTopic(e.target.value)}
                    />

                    <button type="submit" onClick={addTopic}>
                        Add
                    </button>
                </div>
            </form>

            <div className="topics">
            {topics.map((topic, index) => (  
                follows.includes(topic.id) ? (
                    <div key={index} className="unFollowTopic topic">
                        <a 
                            href={`/unFollowTopic/${topic.id}`}
                            className="button-unFollow"
                            onClick={e => toggleFollowTopic(e, false, topic.id)}
                        >
                            {topic.data.topic}
                        </a>
                    </div>
                    ) : (
                    <div key={index} className="followTopic topic">
                        <a 
                            href={`/followTopic/${topic.id}`}
                            className="button-follow"
                            onClick={e => toggleFollowTopic(e, true, topic.id)}
                        >
                            {topic.data.topic}
                        </a>
                    </div>
                )
            ))}
            </div>

            {/* <div className="topics">
            {topics.map((topic, index) => (
                <div key={index} className="topic">
                    <a 
                        href={`/followTopic/${topic.id}`}
                        className="button-follow"
                        onClick={e => handleSelectTopic(e, topic.id)}
                    >
                        {topic.data.topic}
                    </a>

                    {firebase.auth.currentUser.uid === topic.data.readers ? (
                        <a 
                            href="/deleteTopic"
                            className="button-delete"
                            onClick={e => deleteTopic(e, topic.id)}
                        >
                            X
                        </a>
                        ) : ""
                    }
                    <div>
                        <p></p>
                    </div>
                </div>
            ))}
            </div> */}
        </div>
    );
};