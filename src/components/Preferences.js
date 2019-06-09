import React, { useEffect, useState } from 'react';
// import firebase from '../firebase';

import Topics from './Topics';
import Sources from './Sources';

export default function Preferences() {

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
        <main>
            <div className="container-topics">
                <h4>Topics</h4>
                <Topics />
            </div>
            
            <div className="container-topics">
                <h4>Sources</h4>
                <Sources />
            </div>
        </main>
    );
};