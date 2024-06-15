import React, { useState, useContext, useEffect } from 'react';
import './PlaceOrder.css';
import { StoringContext } from '../../context/StoreContex';

import axios from "axios"
import { useNavigate } from 'react-router-dom';
const PlaceOrder = () => {
  const { getTotalCartAmout, token, food_list, cartItem, url } = useContext(StoringContext);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city:"",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  });
const navigate=useNavigate();
 useEffect(()=>{
if(!token){
    navigate("/");
}
else if(getTotalCartAmout()===0){
    navigate("/cart");  
}
 },[token])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };
const placeOrder= async(e)=>{
    
    e.preventDefault();
    console.log("datais",data);
    let orderItems=[];
    food_list.map((item)=>{
        if(cartItem[item._id]>0){
        let   letInfo=item;
        letInfo["quantity"]=cartItem[item._id];
        orderItems.push(letInfo);
        }
    })
  let orderData={
    address:data,
    amount:getTotalCartAmout()+2,
    items:orderItems,
  }
  let response=await axios.post(url+"/api/order/place",orderData,{headers:{token}});

  if(response.data.success){ 
    const {session_url}=response.data;
    window.location.replace(session_url);
  }
  else{
    const {session_url}=response.data;
    window.location.replace(session_url);
  }
}

  return (
    <div>
      <form onSubmit={placeOrder} className='place-order' >
        <div className='place-order-left'>
          <p className='title'>Delivery information</p>
          <div className='multi-fields'>
            <input  required type='text' name='firstName' placeholder='First name' value={data.firstName} onChange={handleChange} />
            <input required  type='text' name='lastName' placeholder='Last name' value={data.lastName} onChange={handleChange} />
          </div>
          <input  required type='email' name='email' placeholder='Email address' value={data.email} onChange={handleChange} />
          <input  required type='text' name='street' placeholder='Street' value={data.street} onChange={handleChange} />
          <div className='multi-fields'>
            <input  required type='text' name='city' placeholder='City' value={data.city} onChange={handleChange} />
            <input type='text' name='state' placeholder='State' value={data.state} onChange={handleChange} />
          </div>
          <div className='multi-fields'>
            <input required  type='text' name='zipcode' placeholder='Zip code' value={data.zipcode} onChange={handleChange} />
            <input required  type='text' name='country' placeholder='Country' value={data.country} onChange={handleChange} />
          </div>
          <input  required type='text' name='phone' placeholder='Phone' value={data.phone} onChange={handleChange} />
        </div>
        <div className='place-order-right'>
          <div className='cart-total'>
            <h2>Total Cart</h2>
            <div className='cart-total-details'>
              <p>Subtotal</p>
              <p>${getTotalCartAmout()}</p>
            </div>
            <hr />
            <div className='cart-total-details'>
              <p>Delivery Fee</p>
              <p>$2</p>
            </div>
            <hr />
            <div className='cart-total-details'>
              <p>Total</p>
              <p>${getTotalCartAmout() + 2}</p>
            </div>
            <button  type='submit'>Proceed to payement</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PlaceOrder;
