import React, { useState,useContext } from 'react';
import './cartTable.css';
import { CartContext } from '../context/storeContext';

const CartTable = () => {
    const { items, cartData } = useContext(CartContext);
    const calculateTotalPrice = () => {
      let total = 0;
      items.forEach(item => {
          if (cartData[item._id] > 0) {
              total += item.price * cartData[item._id];
          }
      });
      return total;
  };
    return (
        <div className="cart-container">
            <table className="cart-table">
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                        <th>Remove</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(item => {
                        if (cartData[item._id] > 0) {
                            return (
                                <tr key={item._id}>
                                    <td>
                                        <img src={`http://localhost:3000/api/food/uploads/${item.image}`} alt={item.name} />
                                    </td>
                                    <td>{item.name}</td>
                                    <td>${item.price}</td>
                                    <td>{cartData[item._id]}</td>
                                    <td>${item.price*cartData[item._id]}</td>
                                    <td>
                                        <button className="remove-btn">*</button>
                                    </td>
                                </tr>
                            );
                        }
                        return null;
                    })}
                </tbody>
            </table>

            <div className="cart-summary">
                <div className="summary-item">
                    <span>Subtotal:</span>
                    <span>${calculateTotalPrice()}</span>
                </div>
                <div className="summary-item">
                    <span>Delivery Fee:</span>
                    <span>$5</span>
                </div>
                <div className="summary-item total">
                    <span>Total:</span>
                    <span>${calculateTotalPrice()+5}</span>
                </div>
            </div>
        </div>
    );
}

export default CartTable;
