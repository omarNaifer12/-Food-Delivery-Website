import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './FoodListPage.css';

const FoodListPage = () => {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/food/all')
      .then(response => {
        setFoods(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the food items!', error);
      });
  }, []);

  const deleteFood = (id) => {
    axios.delete(`http://localhost:3000/api/food/${id}`)
      .then(response => {
        setFoods(foods.filter(food => food._id !== id));
      })
      .catch(error => {
        console.error('There was an error deleting the food item!', error);
      });
  };

  return (
    <div className="food-list">
      <h1>Food Items</h1>
      <Link to="/add" className="btn btn-primary">Add Food</Link>
      <table className="table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Description</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {foods.map(food => (
            <tr key={food._id}>
              <td>
                <img src={`http://localhost:3000/api/food/uploads/${food.image}`} alt={food.name} className="food-image" />
              </td>
              <td>{food.name}</td>
              <td>{food.price}</td>
              <td>{food.description}</td>
              <td>{food.category}</td>
              <td>
                <Link to={`/edit/${food._id}`} className="btn btn-warning">Edit</Link>
                <button onClick={() => deleteFood(food._id)} className="btn btn-danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FoodListPage;