import React from 'react'
import { formatUGX, isPriceAvailable } from '../utils/currency';
import { useDispatch, useSelector } from 'react-redux'
import { addcart, addcartcount } from '../redux/action'
import styles from "./item.module.css"
import Reccom from './Reccom'
import Beverages from "./Beverages"
import { useNavigate } from 'react-router-dom'
import MenuImage from './MenuImage'
import { BsCart3, BsCartPlus } from 'react-icons/bs'

const SingleItem = ({_id,image,price,title,desc}) => {
    const hasPrice = isPriceAvailable(price);
const dispatch = useDispatch();
const count = useSelector((state) =>
  state.cart.find((item) => item.id === String(_id))?.qty || 0
);
const navigate= useNavigate()
const item = { id: String(_id), image, price, title, desc, qty: 1 };
const updateQuantity = (qty) => {
  if (qty === 1 && count === 0) {
    dispatch(addcart(item));
  } else {
    dispatch(addcartcount({ ...item, qty: count + qty }));
  }
};

  return (
    <div className={styles.singleupperbox} >

    <div className={styles.mainsinglebox} >
      <MenuImage image={image} title={title} alt={title} />
      <h2>{title}</h2>
      <p className={styles.singledesc} >{desc}</p>

      <h2>{formatUGX(price)}</h2>

        <div className={styles.cartbutton}>
          <h3>
            {!count ? (
              <button
                type="button"
                className={styles.addto}
                onClick={() => updateQuantity(1)}
              >
                {hasPrice ? "Add to cart" : "Price unavailable"}
                <BsCartPlus aria-hidden="true" />
              </button>
            ) : (
              <div>
                <button
                  className={styles.minus}
                  aria-label={`Remove one ${title}`}
                  onClick={() => updateQuantity(-1)}
                >
                  &#8211;
                </button>
                <span>{count}</span>
                <button
                  className={styles.plus}
                  disabled={!hasPrice}
                  aria-label={`Add one ${title}`}
                  onClick={() => updateQuantity(1)}
                >
                  &#43;
                </button>
              </div>
            )}
          </h3>
          <button
            type="button"
            className={styles.cartIconButton}
            aria-label="View cart"
            onClick={() => navigate("/cart")}
          >
            <BsCart3 aria-hidden="true" />
          </button>
        </div>
        <h1 className={styles.pepsi}>You can enjoy this delicious dish with </h1>
        <Beverages/>
    </div>
    <div>
      <Reccom/>
    </div>

    </div>
  )
}

export default SingleItem
