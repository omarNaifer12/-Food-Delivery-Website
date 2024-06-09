import { createContext } from "react";
import { food_list } from "../assets/assets";
import { useState } from "react";
export const StoringContext=createContext(null);
const StoreContextProvider=(props)=>{
    const[cartItem,setCartItem]=useState({})
    const addToCart=(itemId)=>{
if(!cartItem[itemId]){
    setCartItem(prev=>({...prev,[itemId]:1}));
}else{
    setCartItem(prev=>({...prev,[itemId]:prev[itemId]+1}));
}
    }
    const removeFromCart=(itemId)=>{
       
            setCartItem(prev=>({...prev,[itemId]:prev[itemId]-1}));
        
        }
            const getTotalCartAmout=()=>{
return food_list.reduce((sum,item)=>{
if(cartItem[item._id]>0){
     sum+=(item.price*cartItem[item._id]);
}
return sum;
},0)
            }
    const contextValue={
        food_list,
        setCartItem,
        removeFromCart,
        addToCart,
        cartItem,
        getTotalCartAmout,
    }
return(
    <StoringContext.Provider value={contextValue}>
{props.children}
    </StoringContext.Provider>
)
}
export default StoreContextProvider