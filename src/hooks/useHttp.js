import React, { useState, useEffect } from 'react';
import useQueryParams from './useQueryParams';

export default function useHttp(url) {

    const [fetchedData, setFetchedData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    // const [queryPreferences, setQueryPreferences] = useQueryParams("");
    // const [queryPreferences, setQueryPreferences] = useQueryParams([]);
    // console.log(queryPreferences);

    useEffect(() => {

        fetch('https://jsonplaceholder.typicode.com/todos')
            .then((response) => {
                const newData = response.json();
                console.log(newData);
                setFetchedData(newData);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    if(fetchedData !== null){
        return fetchedData;
    } else {
        return isLoading;
    }

};

