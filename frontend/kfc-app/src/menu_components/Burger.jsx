
import { addburger } from '../redux/action';
import { getMenuItemsByType } from "../utils/menuCatalog"
import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styles from "./item.module.css"
import Item from './Item';
const Burger = () => {
    const dispatch = useDispatch();
    const burger= useSelector((state)=>state.burger);
    const fetchData = useCallback(async () => {
        const payload = await getMenuItemsByType("burger");
        dispatch(addburger(payload));
    }, [dispatch]);
    useEffect(() => {
        fetchData();
    }, [fetchData]);

  return (
  <div id="burger">
    <h1>BURGERS</h1>
   <div className={styles.itembox} >
    {burger.map((el)=>{
      return <Item {...el} key={el._id}  />
    })}
   </div>
  </div>
  )
}

export default Burger
