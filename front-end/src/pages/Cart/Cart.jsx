import React from 'react'
import './Cart.css'
import { useContext } from 'react'
import { StoringContext } from '../../context/StoreContex'
import {useNavigate} from 'react-router-dom'
const Cart = () => {
    const{cartItem,food_list,removeFromCart,getTotalCartAmout}=useContext(StoringContext);
  const navigate=useNavigate();
    return (
    <div className='cart'>
        <div className='cart-items'>
<div className='cart-items-title'>
    <p>Items</p>
    <p>Title</p>
    <p>price</p>
    <p>Quantity</p>
    <p>total</p>
    <p>remove</p>

</div>
<br/>
<hr/>
{
    food_list.map((item,index)=>{
        if(cartItem[item._id]>0){
            return(
               <div> 
                   <div  className='cart-items-title cart-items-item'>
                   <img src={item.image} alt=""/>
                   <p>{item.name}</p>
<p>${item.price}</p>
<p>{cartItem[item._id]}</p>
<p>${item.price*cartItem[item._id]}</p>
<p onClick={()=>removeFromCart(item._id)} className='cross'>x</p>
                     </div>
                     <hr/>
               </div>
            
            )
        }
    })
}

        </div>
<div className='cart-bottom'>
    <div className='cart-total'>
<h2>total cart</h2>
<div className='cart-total-details'>
<p>subtotal</p>
<p>${getTotalCartAmout()}</p>
</div>
<hr />
<div className='cart-total-details'>
<p>delivery fee</p>
<p>${2}</p>
</div>
<hr />
<div className='cart-total-details'>
<p>total</p>
<p>${getTotalCartAmout()+2}</p>
</div>
<button onClick={()=>navigate('/order')} >proceed To checkout</button>
    </div>
    <div className='cart-promocode'>
        <div>
            <p>if you have a promo code,enter it here </p>
            <div className='cart-promocode-input'>
                <input type='text' placeholder='promo code'/>
                <button>submit</button>

            </div>
        </div>

    </div>

</div>
    </div>
  )
}

export default Cart