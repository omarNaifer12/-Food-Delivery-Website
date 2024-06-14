import React from 'react'
import Navbar from './components/Navbar/Navbar'
import {   Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import PlaceOrder from './pages/placeOrder/PlaceOrder';
import Footer from './components/Footer/Footer';
import './index.css'
import { useState } from 'react';
import LoginPopup from './components/LoginPopup/LoginPopup';
import Verify from './pages/verify/verify';
const index = () => {
    const[showLogin,setShowLogin]=useState(false);
  return (
  <>
   <div>
        {
            showLogin?<LoginPopup setShowLogin={setShowLogin} />:<></>
        }
        <Navbar setShowLogin={setShowLogin}/>
        <Routes>
       
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order" element={<PlaceOrder />} />
<Route path='/verify' element={<Verify />}/>
      </Routes>
    </div>
    <Footer />
  </>
 
  )
}

export default index