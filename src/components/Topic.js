// import React, { useEffect, useState } from 'react';

// import firebase from '../firebase';

// export default function Topic() {
    
//     const [topics, setTopics] = useState([]);
//     const [topic, setTopic] = useState("");
//     const [isLoading, setIsLoading] = useState(false);

//     useEffect(() => {
//         firebase.getTopics()
//             .then(topics => {
//                 let newTopics = [];
//                 topics.forEach(topic => {
//                     newTopics.push({
//                         id: topic.id,
//                         data: topic.data().topic
//                     });
//                 })
//                 setTopics(newTopics);
//                 setIsLoading(false);
//             })
//     }, [isLoading])

//     return (
//         <div className="topics">
//             {topics.map((topic, index) => (
//                 <div key={index} className="topic">
//                     <header className="header-topic">
//                         <p>{topic.data.topic}</p>
//                     </header>
//                 </div>
//             ))}
//         </div>
//     );
// };






            