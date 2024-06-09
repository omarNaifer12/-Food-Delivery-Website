import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className='footer-content'> 
        <div className='footer-content-left'> 
<img src={assets.logo}/>
<p>lorem is hdt-zh zhtz uksud péizduj jidydg jytj,yu kiikki ddefeg</p>
<div className='footer-social-icons'>
    <img src={assets.facebook_icon} alt=""/>
    <img src={assets.twitter_icon} alt=""/>
    <img src={assets.linkedin_icon} alt=""/>

</div>
</div>
<div className='footer-content-center'>
    <h2>Company</h2>
    <ul>
        <li>Home</li>
        <li>About us</li>
        <li>Delivery</li>
        <li>Privasy Policy</li>
    </ul>

</div>
<div className='footer-content-right'>
<h2>Get in touch</h2>
<ul>
    <li>+1-241-245-7542</li>
    <li>contact  @naifer.com</li>
</ul>
</div>
        </div>
        <hr />
        <p className='footer-copyright'> copyright 2024 * naifer.com - All right reserved</p>
    </div>
  )
}

export default Footer