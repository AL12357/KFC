import React from 'react'
import styles from "./item.module.css"
import { useDispatch, useSelector } from 'react-redux';
import { addcart, addcartcount } from '../redux/action';
import { useNavigate } from 'react-router-dom';
import MenuImage from './MenuImage';
import { formatUGX, isPriceAvailable } from '../utils/currency';
import { BsCart3, BsCartPlus } from 'react-icons/bs';

const Item = ({_id,image,price,title,desc}) => {
    const hasPrice = isPriceAvailable(price);
    const navigate= useNavigate();
    const dispatch = useDispatch();
    const count = useSelector((state) =>
      state.cart.find((item) => item.id === String(_id))?.qty || 0
    );
    const item = { id: String(_id), image, price, title, desc, qty: 1 };

    const updateQuantity = (qty) => {
      if (qty === 1 && count === 0) {
        dispatch(addcart(item));
      } else {
        dispatch(addcartcount({ ...item, qty: count + qty }));
      }
    };

  return (
    <div className={styles.innerbox} >
      <MenuImage onClick={()=>{
        navigate(`/menu/${_id}`)
      }} image={image} title={title} alt={title} />
      <div>
        <h3 className={styles.title} >{title}</h3>
        <h3>{formatUGX(price)}</h3>
        <p className={styles.desc} >{desc}</p>
        <div className={styles.cartbutton}

        >
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
      </div>
    </div>
  )
}

export default Item
