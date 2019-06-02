import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Feed from './Feed';

import * as serviceWorker from './serviceWorker';

// function App() {
//     // const [ user, setUser ] = useState({ username: null })

//     // const saveUser = newUser => {
//     //     localStorage.setItem("user", newUser.username);
//     //     setUser(newUser);
//     // }

//     // const logout = () => {
//     //     localStorage.clear();
//     //     setUser({ username: null });
//     // }

//     return (
//         <Card />
//     )
// }

ReactDOM.render(
    <Feed />, 
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
