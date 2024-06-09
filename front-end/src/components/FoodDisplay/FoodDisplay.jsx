import React from 'react'
import './FoodDisplay.css'
import { useContext } from 'react'
import { StoringContext } from '../../context/StoreContex'
import FoodItem from '../FoodItem/FoodItem'
const FoodDisplay = ({category}) => {
  const{food_list}=useContext(StoringContext);
    return (
    <div className='food-display' id='food-display'>
        <h2>top dishes near you</h2>
        <div className='food-display-list'>
            {
                food_list.map((item,index)=>{
                  if(category==="all"||category===item.category){
return <FoodItem key={index} item={item} />
                }
})
            }

        </div>

    </div>
  )
}

export default FoodDisplay