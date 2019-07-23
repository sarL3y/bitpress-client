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
                <div className="register-headers">
                    {/* <div className="border-heavy-top"></div> */}
                    {/* <p className="register-header">THE NEWS.</p> */}
                    <p className="register-title">REGISTER.</p>
                    {/* <div className="border-heavy-bottom"></div> */}
                </div>

                <div className="form-register">
                    <form onSubmit={e => e.preventDefault() && false}>
                        <div className="form-register-input-username">
                            <input 
                                placeholder="Username"
                                type="text"
                                value={name}
                                aria-label="username"
                                onChange={e => setName(e.target.value)}
                                />
                        </div>
                        <div className="form-register-input-email">
                            <input 
                                placeholder="Email Address"
                                type="email"
                                value={email}
                                aria-label="email"
                                onChange={e => setEmail(e.target.value)}
                                />
                        </div>
                        <div className="form-register-input-password">
                            <input 
                                placeholder="Password"
                                type="password"
                                value={password}
                                aria-label="password"
                                onChange={e => setPassword(e.target.value)}
                                />
                        </div>

                        <button type="submit" className="button-register primary" onClick={onRegister}>
                            Register
                        </button>
                    </form>
                </div>
            </div>
        </main>
    );
};

export default Register;