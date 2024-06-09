import React from 'react'
import './LoginPopup.css'
import { useState } from 'react'
import { assets } from '../../assets/assets';
const LoginPopup = ({setShowLogin}) => {
    const[currState,setCurrState]=useState("Login");
  return (
    <div className='login-popup'>
        <form className='login-popup-container'>
<div className='login-popup-title'>
<h2>{currState}</h2>
<img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />

</div>
<div className='login-popup-input'>
{currState==="Login"?<></>:<input type='text' placeholder='your name' required />}
<input type='email' placeholder='your email' required />
<input type='password' placeholder='your password' required />
</div>
<button >{currState==="Sign Up"?"Create Account":"Login"}</button>
<div className='login-popup-condition'>
<input type='checkbox'  required/>
<p>continuing , i agree to the terms of use & Privacy Policy</p>
</div>
{
    currState==="Login"?<p>create new account? <span onClick={()=>setCurrState("Sing Up")}>click here </span></p>:
    <p>already have an  account? <span onClick={()=>setCurrState("Login")}>login here </span></p>
} 
        </form>
    </div>
  )
}

export default LoginPopup