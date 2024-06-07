import React from 'react';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import FoodListPage from './component/FoodListPage/FoodListPage';

import './App.css';
import FoodFormPage from './component/FoodFormPage/FoodFormPage ';

function App() {
  return (
    <Router>
     
      <Routes>
          <Route path="/" element={<FoodListPage/>} />
          <Route path="/add" element={<FoodFormPage/>} />
          <Route path="/edit" element={<FoodFormPage/>} />
          
          </Routes>
    </Router>
  );
}

export default App;
