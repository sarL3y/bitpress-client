import React from 'react';

import Navbar from './Navbar';
import Feed from './Feed';

const Dashboard = props => {
    return (
        <main>
            <Navbar {...props} />
            <div>
                <h2>BitPress Dashboard</h2>
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