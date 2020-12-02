import React from 'react';
import {Link} from 'react-router-dom';
import './home.css';


function Home() {
  return (
    <div>
        <h1 className="header">WELCOME</h1>
        <Link to="/reactjs">
            <h3 className="options">Software Engineering</h3>
        </Link>
        <Link to="/nodejs">
            <h3 className="options">Microprocessor</h3>
        </Link>
    </div>
  );
}

export default Home;
