
import { addbiryani } from '../redux/action';
import { getMenuItemsByType } from "../utils/menuCatalog"
import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styles from "./item.module.css"
import Item from './Item';

const Biryani = () => {
    const dispatch = useDispatch();
    const biryani = useSelector((state)=>state.biryani)
    const fetchData = useCallback(async () => {
        const payload = await getMenuItemsByType("biryani");
        dispatch(addbiryani(payload));
    }, [dispatch]);
    useEffect(() => {
        fetchData();
    }, [fetchData]);


  return (
  <div id="biryani">
    <h1>BIRYANI BUCKETS</h1>
   <div className={styles.itembox} >
    {biryani.map((el)=>{
      return <Item {...el} key={el._id}  />
    })}
   </div>
  </div>
  )
}

export default Biryani
