import { createContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios"
export const StoringContext=createContext(null);
const StoreContextProvider=(props)=>{
    const url="http://localhost:3000";
    const[cartItem,setCartItem]=useState({})
    const[token,setToken]=useState("");
    const [food_list,setFoodList]=useState([]);
    const addToCart= async (itemId)=>{
if(!cartItem[itemId]){
    setCartItem(prev=>({...prev,[itemId]:1}));
}else{
    setCartItem(prev=>({...prev,[itemId]:prev[itemId]+1}));
}
if(token){
    await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
}
    }
    const removeFromCart= async (itemId)=>{
       
            setCartItem(prev=>({...prev,[itemId]:prev[itemId]-1}));
        if(token){
         await   axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
        }
        }
            const getTotalCartAmout=()=>{
return food_list.reduce((sum,item)=>{
if(cartItem[item._id]>0){
     sum+=(item.price*cartItem[item._id]);
}
return sum;
},0)

            }
            const fetchFoodList=async ()=>{
                const response=await axios.get(url+"/api/food/all")
                setFoodList(response.data);
                }
                const loadCartData=async(token)=>{
const response= await axios.post(url+"/api/cart/get",{},{headers:{token}});
setCartItem(response.data.cartData);
console.log("cartdata is " ,response.data);
                }
            useEffect(()=>{
                
                async function loadData(){
                    await fetchFoodList();
                    if(localStorage.getItem("token")){
                        setToken(localStorage.getItem("token"));
            await loadCartData(localStorage.getItem("token"));
                    }
                }
                loadData();
            },[])
           
    const contextValue={
        food_list,
        setCartItem,
        removeFromCart,
        addToCart,
        cartItem,
        getTotalCartAmout,
        url,
        token,
        setToken,
    }

return(
    <StoringContext.Provider value={contextValue}>
{props.children}
    </StoringContext.Provider>
)
}
export default StoreContextProvider