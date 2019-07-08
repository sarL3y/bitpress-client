import React, { useState, useEffect } from 'react';

import useHttp from '../hooks/useHttp';
import firebase from '../firebase';

import './DashboardFeed.scss';

export default function DashboardFeed() {

	const { fetchedData, error, isLoading } = useHttp('https://jsonplaceholder.typicode.com/photos');

	return isLoading ? (
		<div>Loading...</div>
	) : (
		fetchedData.map((data, index) => (
			<div key={index} className="card">
				<p>{data.title}</p>
				<a href={`${data.url}`}>{data.url}</a>
				<p>Author: Claire Walter</p> 
				<p>Date posted: July 7th, 2019</p>
				<img src={`${data.url}`} alt={`${"Alt text"}`} />
			</div>
		))
	);
};