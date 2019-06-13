import React, { useState, useEffect } from 'react';
import useQueryParams from './useQueryParams';

export default function useHttp(url) {

    const [fetchedData, setFetchedData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    // const [queryPreferences, setQueryPreferences] = useQueryParams("");
    // const [queryPreferences, setQueryPreferences] = useQueryParams([]);
    // console.log(queryPreferences);

    useEffect(() => {
        setIsLoading(true);

        let newData = fetch(url)
            .then((response) => {
                const newData = response.json();
                console.log(newData);
                setIsLoading(false);
            })
            .catch(error => {
                console.log(error);
                setIsLoading(false);
            })

        setFetchedData(newData);
    }, []);

    return fetchedData;
};

