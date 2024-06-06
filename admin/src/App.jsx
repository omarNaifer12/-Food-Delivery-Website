import React from 'react';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import FoodListPage from './component/FoodListPage/FoodListPage';

import './App.css';

function App() {
  return (
    <Router>
     
      <Routes>
          <Route path="/" element={<FoodListPage/>} />
          
          </Routes>
    </Router>
  );
}

export default App;
