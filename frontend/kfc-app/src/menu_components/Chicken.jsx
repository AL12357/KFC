import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addchicken } from '../redux/action';
import { getMenuItemsByType } from "../utils/menuCatalog"
import Item from './Item';
import styles from "./item.module.css"
const Chicken = () => {
    const dispatch = useDispatch();
    const chicken= useSelector((state)=>state.chicken);
    const fetchData = useCallback(async () => {
        const payload = await getMenuItemsByType("chicken");
        dispatch(addchicken(payload));
    }, [dispatch]);
    useEffect(() => {
        fetchData();
    }, [fetchData]);

  return (
    <div id="chicken" >
      <h1>CHICKEN BUCKETS</h1>
     <div className={styles.itembox} >
      {chicken.map((el)=>{
        return <Item {...el} key={el._id}  />
      })}
     </div>
    </div>

  )
}

export default Chicken
