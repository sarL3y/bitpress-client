import React, { useState } from 'react';
import firebase from '../firebase';

import Navbar from './Navbar';

import './Register.scss';

const Register = props => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function onRegister() {
        try {
            await firebase.register(name, email, password);
            props.history.replace("/dashboard");
        } catch (error) {
            alert(error.message);
        }
    }
    
    return (
        <main role="main">
            <Navbar {...props} />

            <div className="container-register">
                <div className="page-headers">
                    <h2>BitPress Register Page</h2>
                    <p>Do some Register stuff.</p>
                </div>

                <div className="form-register">
                    <form onSubmit={e => e.preventDefault() && false}>
                        <div className="form-input-text">
                            <input 
                                placeholder="Username"
                                type="text"
                                value={name}
                                aria-label="username"
                                onChange={e => setName(e.target.value)}
                                />
                        </div>
                        <div className="form-input-email">
                            <input 
                                placeholder="Email"
                                type="email"
                                value={email}
                                aria-label="email"
                                onChange={e => setEmail(e.target.value)}
                                />
                        </div>
                        <div className="form-input-text">
                            <input 
                                placeholder="Password"
                                type="password"
                                value={password}
                                aria-label="password"
                                onChange={e => setPassword(e.target.value)}
                                />
                        </div>

                        <button type="submit" className="button primary" onClick={onRegister}>
                            Register
                        </button>
                    </form>
                </div>
            </div>
        </main>
    );
};

export default Register;