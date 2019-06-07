import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import { API_BASE_URL } from './config';

import './Card.scss';

const Card = (props) => {

  const [data, setData] = useState({ cards: [] });
  const [url, setUrl] = useState('http://localhost:8080/api/board');
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const result = await axios(url);

        setData(result.data);
      } catch(error) {
        setIsError(true);
      }

      setIsLoading(false);
    };

    fetchData();
  }, [url]);

  return isLoading ?
    <div>Loading...</div> : (
      <ul>
        {data.cards.map((item, index) => (
          <li key={index}>
            <div className='card'>
              <img src={item.image} alt='' />
              <h3 className='card-title'>{item.title}</h3>
              <p className='card-author'>{item.author}</p>
              <p className='card-date'>{item.date}</p>
              <p>{item.text}</p>
            </div>
          </li>
        ))}
      </ul>
    )
};

export default Card;