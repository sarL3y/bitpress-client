import React, { useState, useEffect } from 'react';

import firebase from '../firebase';
import useCountFollows from '../hooks/useCountFollows';
import LoadingIcon from './LoadingIcon';

import './DashboardFeed.scss';

export default function DashboardFeed() {

	const { allFollows } = useCountFollows(null);
	const [topics, setTopics] = useState([]);
	const [follows, setFollows] = useState([]);


	useEffect(() => {
		firebase.addNewReader();

		firebase.getTopics()
            .then(topics => {
                let newTopics = [];

                topics.forEach(topic => {
                    newTopics.push({
                        id: topic.id,
                        data: topic.data().topic,
                    });
                });

                newTopics.sort((a, b) => {

                    return a.data.topic - b.data.topic;
                });

                setTopics(newTopics);
			});
			
		firebase.getUserFollows()
            .then(follows => {
                let newFollows = [];

                follows.forEach(follow => {
                    newFollows.push(follow);
                });

                setFollows(newFollows);
			});

		firebase.getAllFollows();

	}, []);

	return topics && allFollows ? (
		!follows ? (
			<div>Head to your profile to start following!</div>
		) : (
			<div className="container-topics-list">
				<h3>Following</h3>
				<div className="container-following">
				{topics.map((topic, index) => (
					follows.includes(topic.id) ? (
						<a key={index} href={`/topic/${topic.id}`}>
							<div className="dashboard-card">
								<h4>{topic.data.topic}</h4>
							</div>
						</a>
					) : (
						false
					)
				))}
				</div>

				<h3>Everything Else</h3>
				<div className="container-trending">
				{topics.map((topic, index) => (
					follows.includes(topic.id) ? (
						false
					) : (
						<a key={index} href={`/topic/${topic.id}`}>
							<div className="dashboard-card">
								<h4>{topic.data.topic}</h4>
							</div>
						</a>
					))
				)}
				</div>
			</div>		
		)
	) : (
		<LoadingIcon />
	)
};