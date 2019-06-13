import React, { useState, useEffect } from 'react';

import useHttp from '../hooks/useHttp';

import './Card.scss';

export default function Card() {
  console.log('Card loaded');

  const [isLoading, setIsLoading] = useState(false);
  const [newFetchedData, setNewFetchedData] = useState([]);
  const fetchedData = useHttp('https://newsapi.org/v2/everything?q=bitcoin&$pageSize=5&from=2019-05-12&sortBy=publishedAt&apiKey=2ebfd3fb49e24fb0bb7f76b9cab685b5');

  // useEffect(() => {
  //   setNewFetchedData(fetchedData);
  // }, [])

  return !fetchedData ? 
    <div>Working...</div> : (
      <div className='card'>
        <img src={fetchedData.urlToImage} alt='' />
        <h3 className='card-title'>{fetchedData.cardTitle}</h3>
        <p className='card-author'>"item.author"</p>
        <p className='card-date'>"item.date"</p>
        <p>"item.text"</p>
      </div>
    )
};