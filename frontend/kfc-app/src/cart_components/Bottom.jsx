import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Item from "../menu_components/Item";
import styles from "./cart.module.css";
import { getRecommendedMenuItems } from "../utils/menuCatalog";
const Bottom = () => {
  let [recom, setrecom] = useState([]);
  useEffect(() => {
    let active = true;
    getRecommendedMenuItems().then((items) => {
      if (active) setrecom(items);
    });

    return () => {
      active = false;
    };
  }, []);

  return (
    <>
      <h2>Top Recommended Meals</h2>
      <div className={styles.toprecom}>
        {recom.map((el, index) => {
          return <Item key={index} {...el} />;
        })}
      </div>
    </>
  );
};

export default Bottom;
