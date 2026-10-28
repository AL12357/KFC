import React from 'react'
import { useSelector } from 'react-redux'
import Cartproduct from './Cartproduct';
import { Link } from 'react-router-dom';


const Leftside = () => {
    const cart= useSelector((state)=>state.cart);

  return (
    <div>
        {cart.length ? cart.map((item) => (
          <Cartproduct key={item.id} {...item} />
        )) : (
          <div className="empty_cart">
            <h2>Your cart is empty</h2>
            <p>Add something finger lickin' good to get started.</p>
            <Link to="/menu">Browse the menu</Link>
          </div>
        )}
    </div>
  )
}

export default Leftside
