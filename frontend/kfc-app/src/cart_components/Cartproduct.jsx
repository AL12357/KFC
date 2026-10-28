import React from 'react'
import { useDispatch } from 'react-redux'
import { addcartcount, deleteCart } from '../redux/action'
import styles from './cart.module.css'
import MenuImage from '../menu_components/MenuImage'
import { formatUGX, parsePrice } from '../utils/currency'

const Cartproduct = ({
  id,
  image,
  price,
  qty,
  title,
  desc,
}) => {

  const dispatch = useDispatch()
  const count = Number(qty) || 0

  const acprice = parsePrice(price)

  const handleRemove = () => {
    dispatch(deleteCart(id))
  }

  const handleMinus = () => {

    if (count <= 1) {
      return
    }

    const newQty = count - 1

    dispatch(addcartcount({ id, image, price, title, desc, qty: newQty }))
  }

  const handlePlus = () => {

    const newQty = count + 1

    dispatch(addcartcount({ id, image, price, title, desc, qty: newQty }))
  }

  return (
    <div className={styles.cartproductmain}>

      <div className={styles.cartproductleft}>

        <MenuImage image={image} title={title} alt={title} />

        <div>

          <h3>{title}</h3>

          <ul>
            <li>{desc}</li>
          </ul>

          <button
            type="button"
            className={styles.removeButton}
            onClick={handleRemove}
          >
            Remove
          </button>

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
          {acprice === null ? 'Price unavailable' : formatUGX(acprice * count)}
        </h3>

      </div>

    </div>
  )
}

export default Cartproduct
