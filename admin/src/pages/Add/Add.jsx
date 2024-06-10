import React, {  useState } from 'react'
import "./Add.css"
import { assets } from '../../assets/assets'
import axios from "axios"
import { toast } from 'react-toastify'
const Add = () => {
   const url="http://localhost:3000";
    const[image,setImage]=useState(false);
    const[data,setData]=useState({
        name:"",
        description:"",
        price:"",
        category:"salad"
    })
    const onchangeInputs=(e)=>{
const{name,value}=e.target;
setData(prev=>({...prev,[name]:value}))
    }

 const handleClickAdd=async(e)=>{
    
    e.preventDefault();
    console.log("image is ",image);
    const formData=new FormData();
    formData.append("name",data.name);
    formData.append("description",data.description);
    formData.append("price",Number(data.price));
    formData.append("category",data.category);
    formData.append("image",image);
const response=await axios.post(`${url}/api/food/add`,formData);
console.log("the response is ",response.data    
);
if(response.data.success){
  console.log("success men");
    setData({
        name:"",
        description:"",
        price:"",
        category:"salad"
    });
    setImage(false);
    toast.success(response.data.message)
}
else{
    console.log("bad main");
    toast.error(response.data.message)
}
 }

  return (
  <div className='add'>
        <form className='flex-col'> 
<div className='add-img-upload flex-col' >
<p>upload Image</p>
<label htmlFor='image'>
<img src={image?URL.createObjectURL(image):assets.upload_area} alt=""/>

</label>
<input onChange={(e)=>setImage(e.target.files[0])} type='file' id='image' hidden required/>
</div>
<div className='add-product-name flex-col'>
<p>product name</p>
<input onChange={onchangeInputs} type='text' name='name' placeholder='type here' value={data.name} required/>

</div>
    <div className='add-product-description flex-col' >
      <p>product Description</p>
<textarea onChange={onchangeInputs} value={data.description} name='description' rows='6' placeholder='write content here' required/>
        </div>
        <div className='add-category-price'>
<div className='add-category flex-col' >
 <p>prodcut category</p>
<select name='category' value={data.category} onChange={onchangeInputs}>
<option value="Salad">Salad</option>
<option value="Rolls">Rolls</option>
<option value="Deserts">Deserts</option>
<option value="Sandwich">Sandwich</option>
<option value="Cake">Cake</option>
<option value="pure Veg">pure Veg</option>
<option value="Pasta">Pasta</option>
<option value="Noodles">Noodles</option>
</select>
</div>
<div className='add-price flex-col'>
    <p>prodcut price</p>
    <input onChange={onchangeInputs} value={data.price} type='Number' 
    name='price' placeholder='$20' required/>

</div>
        </div>
            <button onClick={(e)=>handleClickAdd(e)} type='submit' className='add-btn'>ADD</button>
            </form>

        
    </div>
  )
}

export default Add