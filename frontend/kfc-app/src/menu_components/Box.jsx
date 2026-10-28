
import { addbox } from '../redux/action';
import { getMenuItemsByType } from "../utils/menuCatalog"
import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styles from "./item.module.css"
import Item from './Item';

const Box = () => {
    const dispatch = useDispatch();
    const box=useSelector((state)=>state.box);
    const fetchData = useCallback(async () => {
        const payload = await getMenuItemsByType("boxmeals");
        dispatch(addbox(payload));
    }, [dispatch]);
    useEffect(() => {
        fetchData();
    }, [fetchData]);


  return (
  <div id="box" >
    <h1>BOX MEALS</h1>
   <div className={styles.itembox} >
    {box.map((el)=>{
      return <Item {...el} key={el._id}  />
    })}
   </div>
  </div>
  )
}

export default Box
