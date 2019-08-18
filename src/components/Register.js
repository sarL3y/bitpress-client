import React, { useState } from 'react';

import firebase from '../firebase';

import Navbar from './Navbar';

import './Register.scss';

const Register = props => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function onRegister() {
        let pass = true;

        const reader = await firebase.db
            .collection('readers')
            .where('username', "==", name)
            .get();
        
        let count = 0;

        reader.forEach(val => {
            count++;
        });

        if(!count) {
            if ( name.toString().length < 3 ) {
                pass = false;
                return alert('Username must be 3 or more characters long. Try again!');
            } else if ( email.toString() === '' ) {
                pass = false;
            } else if ( password.toString() === '' ) {
                pass = false;
            }

            if ( pass === false ) {
                return alert('All fields required! Please try again.'); 
            } else {
                try {
                    await firebase.register(name, email, password);
                } catch (error) {
                    alert(error.message);
                }
            }
        } else {
            return alert('Username already exists! Please try again.');
        }
    }
    
    return (
        <main role="main">
            <Navbar {...props} />

            <div className="container-register">
                <div className="register-headers">
                    <p className="register-title">REGISTER.</p>
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
                                required
                                />
                        </div>
                        <div className="form-register-input-email">
                            <input 
                                placeholder="Email Address"
                                type="email"
                                value={email}
                                aria-label="email"
                                onChange={e => setEmail(e.target.value)}
                                required
                                />
                        </div>
                        <div className="form-register-input-password">
                            <input 
                                placeholder="Password"
                                type="password"
                                value={password}
                                aria-label="password"
                                onChange={e => setPassword(e.target.value)}
                                required
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