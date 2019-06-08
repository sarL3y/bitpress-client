import React, { useEffect, useState } from 'react';

import firebase from '../firebase';

export default function Sources(props) {

    const [sources, setSources] = useState([]);
    const [source, setSource] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    
    useEffect(() => {
        firebase.getSources()
            .then(sources => {
                let newSources = [];
                sources.forEach(source => {
                    newSources.push({
                        id: source.id,
                        data: source.data().source
                    });
                })
                setSources(newSources);
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
            await firebase.addSource({ source });
            setSource("");
            setIsLoading(true);
        } catch(error) {
            alert(error.message);
        }
    }

    return (
        <div className="container-sources">
            <h5>{sources.length} out of infinity...</h5>
            <form onSubmit={e => e.preventDefault() && false}>
            <div className="form-input-text">
                <input 
                    placeholder="CNN"
                    type="text"
                    value={source}
                    aria-label="source"
                    onChange={e => setSource(e.target.value)}
                />

                <button type="submit" onClick={addTopic}>
                    Add
                </button>
            </div>
            </form>
        </div>
    );
};