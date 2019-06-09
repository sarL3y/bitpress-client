import React, { useEffect, useState } from 'react';
import firebase from '../firebase';

export default function PersonalInfo() {

    // const [topic, setTopic] = useState("");
    // const [topics, setTopics] = useState([]);
    // const [source, setSource] = useState("");
    // const [sources, setSources] = useState([]);
    // const [isLoading, setIsLoading] = useState(false);

    // useEffect(() => {
    //     firebase.getTopics()
    //         .then(topics => {

    //         })
    // }, [isLoading])

    return (
        <div className="personal-info">
            <p>Username: {firebase.auth.currentUser.displayName}</p>
            <p>Email: {firebase.auth.currentUser.email}</p>
        </div>
    );
};