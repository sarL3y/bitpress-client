// import { useState, useEffect } from 'react';

// import useGetTopicTitles from './useGetTopicTitles';
// import firebase from '../firebase';

// export default function useHttp(topic) {

//     const [fetchedData, setFetchedData] = useState([]);
//     const [error, setError] = useState(null);
//     const [isLoading, setIsLoading] = useState(false);
//     const [urls, setUrls] = useState([]);

//     useEffect(() => {
//         setIsLoading(true);
//         // getFetchData();
//         setQueryParamsAndFetch(topic);

//         // return () => {
//         //     getData();
//         // };

//     }, [topic]);

//     async function setQueryParamsAndFetch(topic) {

//         await fetch(`https://newsapi.org/v2/everything?q=${topic}&apiKey=2ebfd3fb49e24fb0bb7f76b9cab685b5`)
//                 .then(response => {
//                     response.json();
//                     console.log(response);
//                     setFetchedData(response);
//                     setIsLoading(false);
//                 })
//                 .catch(error => {
//                     console.log(error);
//                     setError(error);
//                     setIsLoading(false);
//                 });

//         await console.log(fetchedData);
//     }

//     // async function getFetchData() {
//     //         console.log(titles);
//     //     // try {
//     //         const response = await fetch(url, titles);
//     //         const json = await response.json();
//     //         await setFetchedData(json);
//     //         await setIsLoading(false);
        
//         // } catch (error) {
//         //     setError(error);
//         //     console.log(error);
//         //     setIsLoading(false);
//     // };

//     return { fetchedData, error, isLoading };
// };

