import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartData, setCartData] = useState({});
  const [token, setToken] = useState(localStorage.getItem("token")?localStorage.getItem("token"):"");
  const [items, setItems] = useState([]);

  
  useEffect(() => {
    fetchCartData();
    fetchItems();
    
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
   if(token!==""){
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
}
  };



  return (
    <CartContext.Provider value={{ cartData,setCartData, setCartData, token, items,fetchCartData,fetchItems,setItems,setToken }}>
      {children}
    </CartContext.Provider>
  );
};

export  {CartContext,CartProvider} 
