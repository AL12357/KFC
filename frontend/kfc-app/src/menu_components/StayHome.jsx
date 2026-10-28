
import { addstayhome } from '../redux/action';
import { getMenuItemsByType } from "../utils/menuCatalog"
import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styles from "./item.module.css"
import Item from './Item';
const StayHome = () => {
  const stayhome= useSelector((state)=>state.stayhome);
  const dispatch= useDispatch();
    const fetchData = useCallback(async () => {
        const payload = await getMenuItemsByType("stayhome");
        dispatch(addstayhome(payload));
    }, [dispatch]);
    useEffect(() => {
        fetchData();
    }, [fetchData]);

  return (
  <div id="stayhome">
    <h1>STAY HOME SPECIALS</h1>
   <div className={styles.itembox} >
    {stayhome.map((el)=>{
      return <Item {...el} key={el._id}  />
    })}
   </div>
  </div>
  )
}

export default StayHome
