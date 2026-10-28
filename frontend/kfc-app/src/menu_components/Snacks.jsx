
import { addsnacks } from '../redux/action';
import { getMenuItemsByType } from "../utils/menuCatalog"
import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styles from "./item.module.css"
import Item from './Item';
const Snacks = () => {
    const dispatch = useDispatch();
    const snacks= useSelector((state)=>state.snacks);
    const fetchData = useCallback(async () => {
        const payload = await getMenuItemsByType("snacks");
        dispatch(addsnacks(payload));
    }, [dispatch]);
    useEffect(() => {
        fetchData();
    }, [fetchData]);

  return (
  <div id="snacks">
    <h1>SNACKS</h1>
   <div className={styles.itembox} >
    {snacks.map((el)=>{
      return <Item {...el} key={el._id}  />
    })}
   </div>
  </div>
  )
}

export default Snacks
