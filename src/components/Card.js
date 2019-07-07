import React, { useState, useEffect } from 'react';

import useHttp from '../hooks/useHttp';
import firebase from '../firebase';

import './Card.scss';

export default function Card(props) {

	const [isLoading, setIsLoading] = useState(false);
	const [fetchedData, setFetchedData] = useState([]);

	useEffect(() => {
		//props.match.params

		// fetch('https://newsapi.org/v2/everything?q=apple&from=2019-06-11&to=2019-06-11&sortBy=popularity&apiKey=2ebfd3fb49e24fb0bb7f76b9cab685b5')
		// 	.then(response => response.json())
		// 	.then(json => setFetchedData(json))
		// 	.catch(error => {
		// 		console.log(error);
		// 	});
  	}, []);

	return ( 
		<div className="card">{fetchedData.totalResults}
		{/* {fetchedData.articles.map((item, index) => (
		<div key={index} className='card'>
			<img src="" alt="" />
			<h3 className='card-title'>Today in {item.title}</h3>
		</div>
		))} */}
		</div>
	);
};