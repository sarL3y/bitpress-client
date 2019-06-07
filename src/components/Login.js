import React from 'react';
import Navbar from './Navbar';

const Login = props => {
    return (
        <main>
            <Navbar {...props} />
            <div>
                <h2>BitPress Login</h2>
                <p>Lorem Ipsum</p>
            </div>
        </main>
    );
};

export default Login;