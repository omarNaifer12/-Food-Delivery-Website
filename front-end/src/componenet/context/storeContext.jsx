import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartData, setCartData] = useState({});
  const [token, setToken] = useState("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NjE4MGZkMWJmNDhhZWM0YzQyZmM4MSIsImlhdCI6MTcxNzY2ODI1MX0.M8njU0klqGb5tTr9qOXYeBBGUIlFgD2Yer_KpUQ7deU");
  const [items, setItems] = useState([]);

  
  useEffect(() => {
    fetchItems();
    fetchCartData();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/food/all');
      setItems(response.data);

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchCartData = async () => {
   
    try {
   console.log("tke,n is ",token);
        const response = await axios.post('http://localhost:3000/api/cart/get',null,{
        headers: {
          token: token
        }
    }
      );
console.log("res is ",response.data.cartData);
      if (response.data.success) {
        setCartData(response.data.cartData);
      }
    } catch (error) {
      console.error('Error fetching cart data:', error);
    }
  };



  return (
    <CartContext.Provider value={{ cartData, setCartData, token, items }}>
      {children}
    </CartContext.Provider>
  );
};

export  {CartContext,CartProvider} 
