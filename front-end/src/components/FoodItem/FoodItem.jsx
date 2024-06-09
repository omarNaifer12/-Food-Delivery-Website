import React from 'react'
import './FoodItem.css'
import { assets } from '../../assets/assets'
import { useState } from 'react'
import { useContext } from 'react'
import { StoringContext } from '../../context/StoreContex'
const FoodItem = ({item}) => {
   
    const{ removeFromCart,addToCart,cartItem}=useContext(StoringContext);
  return (
    <div className='food-item'>
        <div className='food-item-emg-container'>
<img className='food-item-image' src={item.image}  alt=""/>
{!cartItem[item._id]?<img className='add' src={assets.add_icon_green} onClick={()=>addToCart(item._id)}/>
:<div className='food-item-counter'>
<img  src={assets.remove_icon_red} onClick={()=>removeFromCart(item._id)}/>
<p>{cartItem[item._id]}</p>
<img src={assets.add_icon_green} onClick={()=>addToCart(item._id)}/>
</div>
}
        </div>
<div className='food-item-info'>
    <div className='food-item-name-ratring'>
<p>{item.name}</p>
<img src={assets.rating_starts} alt=''/>
    </div>
<p className='food-item-desc'>{item.description} </p>
<p className='food-item-price'>${item.price}</p>

</div>
    </div>
  )
}

export default FoodItem