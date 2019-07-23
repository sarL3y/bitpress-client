import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import firebase from '../firebase';
import LoadingIcon from './LoadingIcon';

import './DashboardFeed.scss';

export default function DashboardFeed() {

	const [topics, setTopics] = useState([]);
	const [follows, setFollows] = useState([]);
	const [dataIsFetched, setDataIsFetched] = useState(false);

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
				
                setTopics(newTopics);
			});
			
		firebase.getUserFollows()
            .then(follows => {
				let newFollows = [];
				
				follows.forEach(follow => {
					newFollows.push(follow);
				});

				setDataIsFetched(true);
				setFollows(newFollows);
			});
	}, []);

	const topicsList = () => {
		return (
			follows.length < 1 && dataIsFetched ? newUserBreadcrumb() : (
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
		)
	}

	const newUserBreadcrumb = () => {
		return (
			<div className="breadcrumb">
				<p className="breadcrumb-text">Head to your <Link className="button" to="/profile">Profile</Link> to start following topics, or click on a topic above to read its top headlines.</p>
				<p className="breadcrumb-text">Come back to the <Link className="button primary" to="/dashboard">Dashboard</Link> to see everything you're following, and more.</p>
			</div>
		)
	};

	return !dataIsFetched ? <LoadingIcon /> : topicsList();
};