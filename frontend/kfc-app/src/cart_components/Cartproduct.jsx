import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { addcartcount } from '../redux/action'
import styles from './cart.module.css'

const Cartproduct = ({
  id,
  image,
  price,
  qty,
  title,
  desc,
  fetchData
}) => {

  const dispatch = useDispatch()
  const [count, setCount] = useState(qty)

  // Works with both "200" and "₹200"
  const acprice = Number(String(price).replace(/[^\d.]/g, ""))

  const handleRemove = () => {
    axios
      .delete(`http://localhost:8080/api/productcart/cart/${id}`)
      .then(() => {
        fetchData()
      })
      .catch((error) => {
        console.error("Error deleting cart item:", error)
      })
  }

  const handleMinus = () => {

    if (count <= 1) {
      return
    }

    const newQty = count - 1

    const el = {
      id,
      image,
      price,
      title,
      desc,
      qty: newQty
    }

    axios
      .put(`http://localhost:8080/api/productcart/cart/${id}`, el)
      .then(() => {
        setCount(newQty)
        dispatch(addcartcount(el))
      })
      .catch((error) => {
        console.error("Error updating quantity:", error)
      })
  }

  const handlePlus = () => {

    const newQty = count + 1

    const el = {
      id,
      image,
      price,
      title,
      desc,
      qty: newQty
    }

    axios
      .put(`http://localhost:8080/api/productcart/cart/${id}`, el)
      .then(() => {
        setCount(newQty)
        dispatch(addcartcount(el))
      })
      .catch((error) => {
        console.error("Error updating quantity:", error)
      })
  }

  return (
    <div className={styles.cartproductmain}>

      <div className={styles.cartproductleft}>

        <img
          src={image}
          alt="food"
        />

        <div>

          <h3>{title}</h3>

          <ul>
            <li>{desc}</li>
          </ul>

          <h3
            style={{ cursor: 'pointer' }}
            onClick={handleRemove}
          >
            Remove
          </h3>

        </div>

      </div>

      <div className={styles.cartproductright}>

        <button
          disabled={count <= 1}
          onClick={handleMinus}
        >
          &#8211;
        </button>

        <h4>{count}</h4>

        <button
          onClick={handlePlus}
        >
          &#43;
        </button>

        <h3>
          ₹{Math.round(acprice * count)}
        </h3>

      </div>

    </div>
  )
}

export default Cartproduct