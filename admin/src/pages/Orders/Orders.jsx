import React,{useEffect,useState} from 'react'

import axios from "axios"
import './Orders.css'
import {toast} from "react-toastify"
import { assets } from '../../assets/assets'
const Orders = () => {
  const [orders, setOrders] = useState([]);
  const fetchOrders=async ()=>{
 
    const response =await axios.get("http://localhost:3000/api/order/listorder");
    console.log("reach here ");
   if(response.data.success){
    setOrders(response.data.data);
    console.log("respose is ",response.data);
   }
    else{
      console.log("reach here bad");
toast.error("error");
    }
    
  }
useEffect(()=>{
  
  fetchOrders();

},[])
const statusHandler=async (e,orderId)=>{
const response= await axios.post("http://localhost:3000/api/order/status",{
  orderId,
 status: e.target.value
})
if(response.data.success){
  fetchOrders();
}
}
  return (
    <div className='order add'>
      <h3>Order Page</h3>
    <div className='order-list'>
{
  orders.map((order,index)=>{
   return( <div key={index} className='order-item'>
      <img src={assets.parcel_icon} alt=""/>
      <div>
        <p className='order-item-food'>
          {
            order.items.map((item,index)=>{
              if(index===order.items.length-1){
                return item.name+ " x "+item.quantity
            }else{
                return item.name+ " x "+item.quantity+",  "
            } 
            })
          }
        </p>
        <p className='order-item-name'>{order.address.firstName+" "+order.address.lastName}</p>
      <div className='order-item-address'>
<p>{order.address.street+","}</p>
        <p>{order.address.city+", "+order.address.state+", "+order.address.country+", "
          +order.address.zipcode}</p>
      </div>
      <p  className='order-item-phone'> {order.address.phone}</p>
      </div>
<p>Item:{order.items.length}</p>
<p>amount: ${order.amount}</p>
<select onChange={(e)=>statusHandler(e,order._id)} value={order.status}>
  <option value="Food Processing"> Food Processing</option>
  <option value="Out for delivery"> Out for delivery</option>
  <option value="Delivered">Delivered</option>
</select>
    </div>
   )
  })
}
    </div>
    </div>
  )
}

export default Orders