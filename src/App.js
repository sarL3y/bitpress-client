import React, { useState, useEffect } from 'react';
import firebase from './firebase';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import Dashboard from './components/Dashboard';
import HomePage from './components/HomePage';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import Topic from './components/Topic';

import './App.scss';

export default function App() {

    const [firebaseInitialized, setFirebaseInitialized] = useState(false);
    // const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        firebase.isInitialized()
            .then(val => {
                setFirebaseInitialized(val);
            });
    },[]);

    const noMatch = ({ location }) => (
        <div>404! "{location.pathname}" not found!</div>
    )

    return firebaseInitialized !== false ? (
        <section className="App">
            <Router>
                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/dashboard" component={Dashboard} />
                    <Route exact path="/profile" component={Profile} />
                    <Route exact path="/topic/:id" component={Topic} />
                    <Redirect from="*" to="/" />
                    <Route component={noMatch} />
                </Switch>
            </Router>
        </section>
    ) : (
        <main className="App">
            <header className="container-header">
                <h1>bitPress</h1>
                <p>Loading...</p>
            </header>
        </main>
    );
};