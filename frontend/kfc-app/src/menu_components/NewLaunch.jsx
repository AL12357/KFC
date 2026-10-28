
import { addlaunch } from '../redux/action';
import { getMenuItemsByType } from "../utils/menuCatalog"
import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styles from "./item.module.css"
import Item from './Item';

const NewLaunch = () => {
    const dispatch = useDispatch();
    const launch= useSelector((state)=>state.launch);
    const fetchData = useCallback(async () => {
        const payload = await getMenuItemsByType("launch");
        dispatch(addlaunch(payload));
    }, [dispatch]);
    useEffect(() => {
        fetchData();
    }, [fetchData]);

  return (
    <div id="launch" >
      <h1>NEW LAUNCH</h1>
     <div className={styles.itembox} >
      {launch.map((el)=>{
        return <Item {...el} key={el._id}  />
      })}
     </div>
    </div>
  )
}

export default NewLaunch
