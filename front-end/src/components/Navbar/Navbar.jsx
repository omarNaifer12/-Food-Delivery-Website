import React from 'react'
import { assets } from '../../assets/assets'
import './Navbar.css'
import {Link,useNavigate} from "react-router-dom"
import { useContext } from 'react'
import { StoringContext } from '../../context/StoreContex'
const Navbar = ({setShowLogin}) => {
  const{token,setToken,getTotalCartAmout}=useContext(StoringContext);
  const navigate=useNavigate();
  const logout=()=>{
    localStorage.removeItem("token");
    setToken("");
    navigate("/")
  }
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
<div className={getTotalCartAmout()===0?"dot":""}></div>
            </div>
          
            {
              !token?<button onClick={()=>setShowLogin(true)}  className='sign-in'>sign in</button>:
              <div className='navbar-profile'> 
<img src={assets.profile_icon} alt="" />
<ul className='nav-profile-drapdown'>
  <li ><img src={assets.bag_icon} alt='' />Orders</li>
  <hr />
  <li onClick={logout}><img src={assets.logout_icon} alt="" />Logout</li>
</ul>
              </div>
            }

</div>
    </div>
  )
}

export default Navbar