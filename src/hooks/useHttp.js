import React, { useState, useEffect } from 'react';

import firebase from '../firebase';

import useGetTopicTitles from './useGetTopicTitles';

export default function useHttp(url) {

    const [fetchedData, setFetchedData] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [titles] = useGetTopicTitles([]);

    useEffect(() => {
        setIsLoading(true);

        
        const getData = async () => {
            try {
                const response = await fetch(url);
                const json = await response.json();
                await setFetchedData(json);
                await setIsLoading(false);
            } catch (error) {
                setError(error);
                console.log(error);
            }
        }

        getData();
    }, [url]); 
    
    return { fetchedData, error, isLoading };
};

