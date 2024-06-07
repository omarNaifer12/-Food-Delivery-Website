import React, { useState,useContext } from 'react';
import axios from 'axios';
import {CartContext} from '../context/storeContext';
import { useNavigate } from 'react-router-dom';
import './allItems.css';
import {assets} from "../../assets/assets"
const AllItems = () => {
    const {items,token,cartData, fetchCartData,fetchItems,setToken,setCartData} = useContext(CartContext);
    const [quantities,setQuantities] = useState(cartData);
    const[itemsForSearch,setItemsForSearch]=useState(items);
const handleLogout=()=>{
  localStorage.removeItem("token");
  setToken("");
  setCartData({});
  fetchItems();

  alert("log out success");
}

const navigate = useNavigate();
  


 const handleClickAdd = (id) => {
      
  
      axios.post('http://localhost:3000/api/cart/add', { itemId: id }, {
          headers: {
              token: token
          }
      })
      .then(response => {
          console.log(response.data);
          if (response.data.success) {
              setQuantities(prevQuantities => ({
                  ...prevQuantities,
                  [id]: prevQuantities[id]===undefined?1: prevQuantities[id]+1
              }));
              fetchCartData();
          }
         
      })
      .catch(error => console.error('Error adding to cart:', error));
  };
  const handleClickDelete=(id)=>{
   
    axios.post('http://localhost:3000/api/cart/remove', { itemId: id }, {
      headers: {
          token: token
      }
  })
  .then(response => {
      console.log(response.data);
      if (response.data.success) {
          setQuantities(prevQuantities => ({
              ...prevQuantities,
              [id]: prevQuantities[id]>0?prevQuantities[id]- 1:0
          }));
          fetchCartData();
        }
       
  })
  .catch(error => console.error('Error adding to cart:', error));

  }
    return (
        <div className="App">
          <div className="header" > 
                <nav>
                    <div className="logo">Food Delivery</div>
                    <div className="search-bar">
                        <input  type="text" placeholder="Search for food..." />
                        <button >Search</button>
                    </div>
                    <div className="user-actions">
                        <div onClick={()=>navigate("/cart")} className="cart">
                      
                            <img  src={assets.cart_icon}alt="Cart" />
                            <span className="cart-count" >
                                {Object.values(cartData).reduce((acc, qty) => acc + qty, 0)}
                            </span>
                        </div>
                       
                        <button onClick={handleLogout}>log out</button>

                        <div  onClick={()=>navigate("/sign") }className="login">
                            <a  href="#" >Login</a>
                        </div>
                    </div>
                </nav>
            
            </div> 
            <div className='main'>
                <div className="food-items-container">
                    {items.map(item => (
                        <div className="food-item" key={item._id}>
                            <img src={`http://localhost:3000/api/food/uploads/${item.image}`} alt={item.name} />
                            <div className="food-details">
                                <h2>{item.name}</h2>
                                <p className="price">${item.price}</p>
                                <p className="category">Category: {item.category}</p>
                                <p className="description">{item.description}</p>
                                {token && (
    <div className="quantity-controls">
       {cartData[item._id]&&( <button className="circle-btn" onClick={() => handleClickDelete(item._id)}>-</button>)}
        <span className="quantity">{cartData[item._id]?cartData[item._id]:0}</span>
        <button className="circle-btn" onClick={() => handleClickAdd(item._id)}>+</button>
    </div>
)}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AllItems;
