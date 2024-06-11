import React, { useState } from 'react';
import './LoginPopup.css';
import { assets } from '../../assets/assets';
import { useContext } from 'react';
import { StoringContext } from '../../context/StoreContex';
import axios from "axios"

const LoginPopup = ({ setShowLogin }) => {
  const [currState, setCurrState] = useState("Login");
  const{url,setToken}=useContext(StoringContext);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

 const onLogin=async (e)=>{
  e.preventDefault();
 let newUrl=url;
  if(currState==="Login"){
newUrl+="/api/user/login"
  }else{
    newUrl+="/api/user/registor"
  }
const response=await axios.post(newUrl,data);
if(response.data.success){
  setToken(response.data.token);
  console.log("token and data",response.data.token);
  localStorage.setItem("token",response.data.token);
  alert(response.data.message);
  
 
}
else{
  alert(response.data.message);
} 
}
  return (
    <div className='login-popup'>
      <form  className='login-popup-container' >
        <div  className='login-popup-title'>
          <h2>{currState}</h2>
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="Close" />
        </div>
        <div className='login-popup-input'>
          {currState === "Sign Up" && (
            <input 
              type='text' 
              placeholder='Your name' 
              name="name" 
              value={data.name} 
              onChange={handleChange} 
              required 
            />
          )}
          <input 
            type='email' 
            placeholder='Your email' 
            name="email" 
            value={data.email} 
            onChange={handleChange} 
            required 
          />
          <input 
            type='password' 
            placeholder='Your password' 
            name="password" 
            value={data.password} 
            onChange={handleChange} 
            required 
          />
        </div>
        <button onClick={onLogin} >
          {currState === "Sign Up" ? "Create Account" : "Login"}
        </button>
        <div className='login-popup-condition'>
          <input type='checkbox' required />
          <p>By continuing, I agree to the Terms of Use & Privacy Policy</p>
        </div>
        {
          currState === "Login" ? (
            <p>Don't have an account? <span onClick={() => setCurrState("Sign Up")}>Click here</span></p>
          ) : (
            <p>Already have an account? <span onClick={() => setCurrState("Login")}>Login here</span></p>
          )
        }
      </form>
    </div>
  );
}

export default LoginPopup;
