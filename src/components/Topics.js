import React, { useEffect, useState } from 'react';

import firebase from '../firebase';

import './Topics.scss';

export default function Topics(props) {

    const [topics, setTopics] = useState([]);
    const [topic, setTopic] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [readers, setReaders] = useState({});
    
    useEffect(() => {

        // let tempReaders = {};

        // firebase.getReaders().then(readers => {
            
        //     readers.forEach(reader => {
        //         tempReaders[reader.data().uid] = reader.data().username;
        //     });

        //     setReaders(tempReaders);

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
    
                // firebase.addReader();
        // })
    }, [isLoading]);

    if(!firebase.getCurrentUsername()) {
        alert("Please login");
        props.history.replace("/login");
        return null;
    }

    async function addTopic() {
        try {
            await firebase.addTopic({ topic, readers: firebase.auth.currentUser.uid });
            setTopic("");
            setIsLoading(true);
        } catch(error) {
            alert(error.message);
        }
    }

    async function deleteTopic(e, id) {
        e.preventDefault();
        await firebase.deleteTopic(id);
        setIsLoading(true);
    }

    function handleSelectTopic(e) {
        e.preventDefault();
        console.log("handleSelectTopic ran!");
    }

    return (
        <div className="container-topics">
            <h5>{topics.length} topics selected.</h5>
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
                <div key={index} className="topic">
                    <a 
                        href="/selectTopic"
                        className="button-select"
                        onClick={e => handleSelectTopic(e, topic.id)}
                    >
                        {topic.data.topic}
                    </a>

                    {(firebase.auth.currentUser.uid === topic.data.readers) ? (
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
                        <p>{console.log(readers.length)}</p>
                    </div>
                </div>
            ))}
            </div>
        </div>
    );
};