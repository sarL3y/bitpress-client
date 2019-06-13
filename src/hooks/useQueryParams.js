// import React, { useState, useEffect } from 'react';
// import firebase from '../firebase';

// export default function useQueryParams(searchParams) {

//     const [isLoading, setIsLoading] = useState(false);
//     const [queryPreferences, setQueryPreferences] = useState(null);
//     const [topics, setTopics] = useState([]);

//     const [params, setParams] = useState("");

//     useEffect(() => {

//     }, [])

//     firebase.getTopics()
//         .then(topics => {
//             console.log(topics);

//             let newTopics = [];
//             topics.forEach(topic => {
//                 newTopics.push({
//                     id: topic.id,
//                     data: topic.data().topic
//                 });
//             })
//             setTopics(newTopics);
//             setIsLoading(false);
//         });

//     setIsLoading(true);
//     setQueryPreferences(topics);

//     return queryPreferences;
// };

