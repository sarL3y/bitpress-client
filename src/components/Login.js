import React, { useState } from 'react';

import firebase from '../firebase';

import Navbar from './Navbar';

import './Login.scss';

export default function Login(props) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function login() {
        try {
            await firebase.login(email, password);
            props.history.replace("/dashboard");
        } catch (error) {
            alert(error.message);
        }
    }
    
    return (
        <main role="main">
            <Navbar {...props} />
            <div className="container-login">
                <div className="login-headers">
                    <p className="login-title">LOGIN.</p>
                </div>

                <div className="form-login">
                    <form onSubmit={e => e.preventDefault() && false}>
                        <div className="form-login-input-email">
                            <input 
                                placeholder="Email Address"
                                type="email"
                                value={email}
                                aria-label="uemail"
                                onChange={e => setEmail(e.target.value)}
                                required
                                />
                        </div>
                        <div className="form-login-input-password">
                            <input 
                                placeholder="Password"
                                type="password"
                                value={password}
                                aria-label="password"
                                onChange={e => setPassword(e.target.value)}
                                required
                                />
                        </div>

                        <button type="submit" className="button-login primary" onClick={login}>
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </main>
    );
};