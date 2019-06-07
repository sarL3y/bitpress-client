import React from 'react';
import firebase from '../firebase';

import Navbar from './Navbar';
import Feed from './Feed';

const Dashboard = props => {
    return (
        <main>
            <Navbar {...props} />
            <div>
                <h2>Dashboard</h2>
                <h3>Hello, {firebase.getCurrentUsername()}.</h3>
                <p>Lorem Ipsum</p>
                <Feed />
            </div>
        </main>
    );
};

export default Dashboard;

// import React, { useState, useEffect } from 'react';

// import Feed from './Feed';

// export default function Dashboard() {

//     const [isLoading, setIsLoading] = useState(false);

//     return isLoading ? 
//         <div>Loading...</div> : 
//             <main>
//                 <Feed />
//             </main>;
// };