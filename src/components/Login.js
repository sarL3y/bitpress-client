import React, { useState } from 'react';
import firebase from '../firebase';

import Navbar from './Navbar';

import './Login.scss';

const Login = props => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const [isLoading, setIsLoading] = useState(false);

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
                <div className="page-headers">
                    <h2>BitPress Login Page</h2>
                    <p>Do some login stuff.</p>
                </div>

                <div className="form-login">
                    <form onSubmit={e => e.preventDefault() && false}>
                        <div className="form-input-email">
                            <input 
                                placeholder="Email"
                                type="email"
                                value={email}
                                aria-label="uemail"
                                onChange={e => setEmail(e.target.value)}
                                />
                        </div>
                        <div className="form-input-password">
                            <input 
                                placeholder="Password"
                                type="password"
                                value={password}
                                aria-label="password"
                                onChange={e => setPassword(e.target.value)}
                                />
                        </div>

                        <button type="submit" className="button primary" onClick={login}>
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </main>
    );
};

export default Login;