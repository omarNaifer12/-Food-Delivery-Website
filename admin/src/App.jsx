import React from 'react';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';


import './App.css';

import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';

function App() {
  return (
 <div>
  <Navbar />
  <hr />
  <div className='app-content'>
    
<Sidebar />
  </div>
 </div>
  );
}

export default App;
