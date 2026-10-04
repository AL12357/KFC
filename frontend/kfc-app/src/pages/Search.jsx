import axios from 'axios';
import React from 'react'
import { useEffect,useState } from 'react';
import { useLocation } from 'react-router-dom';
import Bottom from '../cart_components/Bottom';
import Item from '../menu_components/Item';
import styles from "./Menu.module.css";


const Search = () => {
const [search,setSearch]= useState([]);
const [error,setError]=useState("");
const location=useLocation();
const val=location.state?.search ?? localStorage.getItem("search") ?? "";

useEffect(() => {
    const controller = new AbortController();
    setError("");

    axios.get("http://localhost:8080/api/searchapi/item/", {
        params: { search: val },
        signal: controller.signal,
    })
    .then(({data}) => {
        setSearch(data);
    })
    .catch((requestError) => {
        if (!axios.isCancel(requestError)) {
            setError("Unable to load search results. Please try again.");
        }
    });

    return () => controller.abort();
}, [val]);


  return (
    <div className={styles.fsearchbox} >
        <h1>{search.length} RESULTS</h1>
        <h2>We found {search.length} "{val}"</h2>
        <div className={styles.innersearch} >
          {error ? <p role="alert">{error}</p> : search.length?
          search.map((el,index)=>{
          return <Item key={index} {...el}/>
          }):<h1>Sorry No Result found</h1>}
        </div>
        <Bottom/>
    </div>
  )
}

export default Search