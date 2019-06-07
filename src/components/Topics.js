import React, { useEffect, useState } from 'react';

import firebase from '../firebase';

export default function Topics(props) {

    const [topics, setTopics] = useState([]);
    const [topic, setTopic] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    
    useEffect(() => {
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
            })
    }, [isLoading])

    if(!firebase.getCurrentUsername()) {
        alert("Please login");
        props.history.replace("/login");
        return null;
    }

    async function addTopic() {
        try {
            await firebase.addTopic({ topic });
            setTopic("");
            setIsLoading(true);
        } catch(error) {
            alert(error.message);
        }
    }

    return (
        <div className="container-topics">
            <h5>{topics.length} out of infinity...</h5>
            <form onSubmit={e => e.preventDefault() && false}>
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
        </div>
    );
};