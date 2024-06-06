import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';
import './FoodFormPage.css';

const FoodFormPage = ({ food }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    image: null,
  });

  const history = useHistory();
  const { id } = useParams();

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

    axios.post('/api/food/add', data)
      .then(() => {
        history.push('/');
      })
      .catch(error => {
        console.error('There was an error adding the food item!', error);
      });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    axios.put(`/api/food/${id}`, data)
      .then(() => {
        history.push('/');
      })
      .catch(error => {
        console.error('There was an error updating the food item!', error);
      });
  };

  return (
    <div className="food-form">
      <h1>{id ? 'Edit' : 'Add'} Food Item</h1>
      <form onSubmit={id ? handleUpdate : handleAdd}>
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
        <button type="submit" className="btn btn-primary">Save</button>
      </form>
    </div>
  );
};

export default FoodFormPage;
