import React, { useEffect, useState } from 'react';

import firebase from '../firebase';

export default function Sources(props) {

    const [sources, setSources] = useState([]);
    const [source, setSource] = useState("");
    const [isSource, setIsSource] = useState(true);
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

    async function addSource() {
        try {
            await firebase.addSource({ source });
            setSource("");
            setIsLoading(true);
        } catch(error) {
            alert(error.message);
        }
    }

    async function deleteSource(e, id) {
        e.preventDefault();
        await firebase.deleteSource(id);
        setIsLoading(true);
    }

    return (
        <div className="container-sources">
            <h5>{sources.length} sources selected</h5>
            <form onSubmit={e => e.preventDefault() && false}>
                <div className="form-input-text">
                    <input 
                        placeholder="CNN, MSNBC..."
                        type="text"
                        value={source}
                        aria-label="source"
                        onChange={e => setSource(e.target.value)}
                    />

                    <button type="submit" onClick={addSource}>
                        Add
                    </button>

                    {sources.map((source, index) => (
                        <div key={index} className="source">
                            <input 
                                type="checkbox"
                                checked={isSource}
                                value={source.data.source}
                                aria-label="source"
                                onChange={e => setSource(e.target.value)}
                            />
                            <label>
                                {source.data.source}
                            </label>
                        </div>
                    ))}
                </div>
            </form>

            {/* <div className="sources">
                {sources.map((source, index) => (
                    <div key={index} className="source">
                        <p>{source.data.source}</p>
                        <a 
                            href="/deleteSource"
                            className="button-delete"
                            onClick={e => deleteSource(e, source.id)}
                        >
                            X
                        </a>
                    </div>
                ))}
            </div> */}
        </div>
    );
};