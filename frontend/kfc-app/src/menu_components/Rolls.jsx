
import { addrolls } from '../redux/action';
import { getMenuItemsByType } from "../utils/menuCatalog"
import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styles from "./item.module.css"
import Item from './Item';

const Rolls = () => {
    const dispatch = useDispatch();
    const rolls= useSelector((state)=>state.rolls)
    const fetchData = useCallback(async () => {
        const payload = await getMenuItemsByType("rolls");
        dispatch(addrolls(payload));
    }, [dispatch]);
    useEffect(() => {
        fetchData();
    }, [fetchData]);
  return (
    <div id="rolls">
      <h1>CHICKEN ROLLS</h1>
     <div className={styles.itembox} >
      {rolls.map((el)=>{
        return <Item {...el} key={el._id}  />
      })}
     </div>
    </div>
  )
}

export default Rolls
