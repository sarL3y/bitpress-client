import React, { useState } from 'react';
import firebase from '../firebase';

import Navbar from './Navbar';

const Register = props => {

    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    // const [isLoading, setIsLoading] = useState(false);

    async function onRegister() {
        try {
            await firebase.register(name, email, password);
            props.history.replace("/dashboard");
        } catch (error) {
            alert(error.message);
        }
    }
    
    return (
        <main>
            <Navbar {...props} />
            <div className="container-register">
                <h2>BitPress Register</h2>
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

                    <button type="submit" className="button" onClick={onRegister}>
                    Register
                    </button>
                </form>
                <p>Lorem Ipsum</p>
            </div>
        </main>
    );
};

export default Register;