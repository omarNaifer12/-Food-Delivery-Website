import React from 'react'
import './PlaceOrder.css'
import { useContext } from 'react'
import { StoringContext } from '../../context/StoreContex'

const PlaceOrder = () => {
   const{getTotalCartAmout}=useContext(StoringContext)
  return (
    <div>
        <form className='place-order'>
            <div className='place-order-left'>
                <p className='title'>Delivery information</p>
                <div className='multi-fields'>
                    <input type='text' placeholder='First name'/>
                    <input type='text' placeholder='Last name'/>

                </div>
                <input type='email' placeholder='Email address'/>
                <input type='text' placeholder='Street'/>
                <div className='multi-fields'>
                    <input type='text' placeholder='City'/>
                    <input type='text' placeholder='State'/>

                </div>
                <div className='multi-fields'>
                    <input type='text' placeholder='Zip code'/>
                    <input type='text' placeholder='Country'/>

                </div>
                <input type='text' placeholder='phone'/>
            </div>
            <div className='place-order-left'>
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
            </div>

        </form>
    </div>
  )
}

export default PlaceOrder