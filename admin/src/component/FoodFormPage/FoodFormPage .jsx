import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FoodFormPage.css'
const FoodFormPage = ({ food }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    image: null,
  });



  useEffect(() => {
    if (food) {
      const { name, price, description, category, image } = food;
      setFormData({ name, price, description, category, image });
    }
  }, [food]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    axios.post('http://localhost:3000/api/food/add', data)
      .then(() => {
        alert("added succesfully");
      })
      .catch(error => {
        console.error('There was an error adding the food item!', error);
      });
  };

  const handleUpdate = () => {
   
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    axios.put(`http://localhost:3000/api/food/${food._id}`, data)
      .then(() => {
     
      })
      .catch(error => {
        console.error('There was an error updating the food item!', error);
      });
  };
const handleClick=(e)=>{
    if(food===undefined){
        handleAdd(e);
        setFormData({
            name: '',
            price: '',
            description: '',
            category: '',
            image: null,
          })
    }else{
        handleUpdate();
    }
}
  return (
    <div className="food-form">
      <h1>{food ? 'Edit' : 'Add'} Food Item</h1>
      <form onSubmit={food ? handleUpdate : handleAdd}>
        <div className="form-group">
          <label>Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Price</label>
          <input type="number" name="price" value={formData.price} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Category</label>
          <input type="text" name="category" value={formData.category} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Image</label>
          <input type="file" name="image" onChange={handleChange} />
        </div>
        <button type="submit"  onClick={(e)=>handleClick(e)} className="btn btn-primary" >Save</button>
      </form>
    </div>
  );
};

export default FoodFormPage;
