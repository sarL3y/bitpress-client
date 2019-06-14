import React, { useState, useEffect } from 'react';

import useHttp from '../hooks/useHttp';

import './Card.scss';

export default function Card() {

  const [isLoading, setIsLoading] = useState(false);
  const [fetchedData, setFetchedData] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(response => response.json())
      .then(json => setFetchedData(json))
      .catch(error => {
          console.log(error);
      });
  }, []);

  return ( 
    <div className="card">
      {fetchedData.map((item, index) => (
      <div key={index} className='card'>
        <img src="" alt="" />
        <h3 className='card-title'>{item.title}</h3>
      </div>
      ))}
    </div>
  );
};