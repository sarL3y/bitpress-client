import { useState, useEffect } from 'react';

import firebase from '../firebase';

export default function useCountFollows(topic) {
    const [allFollows, setAllFollows] = useState([]);

    useEffect(() => {
        firebase.getAllFollows()
            .then(follows => {
                setAllFollows(follows);
            })
    }, []);

    return { allFollows };
}