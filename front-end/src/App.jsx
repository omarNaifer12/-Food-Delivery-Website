import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AllItems from './componenet/allItems/allItems';
import CartTable from './componenet/cart/cartTable';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AllItems />} />
        <Route path="/cart" element={<CartTable />} />
      </Routes>
    </Router>
  );
}

export default App;
