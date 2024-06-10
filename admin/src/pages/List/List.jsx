import React, { useEffect, useState } from 'react'

import "./List.css"
import { toast } from 'react-toastify';
import axios from "axios"
const List = () => {
 const url="http://localhost:3000";
 const [foods, setFoods] = useState([]);

 useEffect(() => {
   const fetchFoods = async () => {
     try {
       const response = await axios.get(`${url}/api/food/all`);
       setFoods(response.data); // Assuming the response data is an array of foods
    console.log("data is ",response.data);
      } catch (error) {
       console.log('Error fetching food items:', error);
     toast.error("error");
      }
   };

   fetchFoods();
 }, []);
 const deleteFood = (id) => {
  axios.delete(`${url}/api/food/${id}`)
    .then(response => {
      setFoods(foods.filter(food => food._id !== id));
      toast.success(response.data.message);
    })
    .catch(error => {
      console.log('There was an error deleting the food item!', error);
      toast.error(response.data.message)
    });
};
  return (
    <div className='list  flex-col'>
      <p>All Foods List</p>
      <div className='list-table'>
        <div className='list-table-format'>
<b>Image</b>
<b>Name</b>
<b>Category</b>
<b>Price</b>
<b>Action</b>
        </div>
        {
          foods.map((food,index)=>{
            return(
              <div key={index} className='list-table-format'>
<img src={`${url}/api/food/uploads/`+food.image} alt=""/>
<p>{food.name}</p>
<p>{food.category}</p>
<p>{food.price}</p>
<p onClick={()=>deleteFood(food._id)}>X</p>

              </div>
            )
          })
        }

      </div>
    </div>
  )
}

export default List