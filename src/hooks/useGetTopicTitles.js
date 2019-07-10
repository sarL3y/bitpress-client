
// import React, { useState, useEffect } from 'react';

// import firebase from '../firebase';

// export default function useGetTopicTitles() {
    
//     const [titles, setTitles] = useState([]);
//     const [error, setError] = useState("");
//     const [isLoading, setIsLoading] = useState(false);

//     useEffect(() => {

//         function getFollowTitles(topics) {
//             let topicTitles = [];
    
//             topics.forEach(topicId => {            
//                 firebase.getTopic(topicId)
//                     .then(topic => {
//                         let title = topic.data().topic.topic;
//                         topicTitles.push(title);
//                     })
//                     .catch(error => 
//                         setError(error));
//             });
            
//             console.log(topicTitles);
//             setTitles(topicTitles);
//         };
    
//         firebase.getUserFollows()
//             .then(topics => {
//                 let newTopics = [];
    
//                 topics.forEach(topic => {
//                     newTopics.push(topic);
//                 });
    
//                 getFollowTitles(newTopics);
//             });
//     }, []);

//     return { titles };
// };