import React from 'react'
import { assets } from '../../assets/assets'
import './Navbar.css'
import {Link} from "react-router-dom"
const Navbar = ({setShowLogin}) => {
  return (
    <div className='navbar'>
      <Link to='/'><img src={assets.logo} alt=""  className='logo'/></Link>  
        <ul>
            <Link to='/'>  home</Link>
            <a href='#explore-menu'> menu</a>
           <a href='#app-download'> mobile-app</a>
            <a href='#footer'> contact us</a>
        </ul>
        <div className='navbar-right'>
            <img src={assets.search_icon} alt=""/>
            <div className='navbar-search-icon'>
             <Link to='/cart' > <img src={assets.cart_icon}  alt=""/></Link>   
<div className='dot'></div>
            </div>
<button onClick={()=>setShowLogin(true)}  className='sign-in'>sign in</button>
        </div>
    </div>
  )
}

export default Navbar