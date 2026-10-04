import axios from 'axios';
import { apiUrl } from '../utils/api';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom'
import SingleItem from '../menu_components/SingleItem';


const SingleProduct = () => {
    const {id}= useParams();
    const [single,setSingle]= useState(null);
    const [error,setError]= useState("");

    useEffect(() => {
      const controller = new AbortController();
      setSingle(null);
      setError("");

      axios.get(apiUrl(`/api/product/menu/${id}`), {
        signal: controller.signal,
      })
        .then(({data}) => {
          setSingle(data);
        })
        .catch((requestError) => {
          if (!axios.isCancel(requestError)) {
            setError("Unable to load this menu item. Please try again.");
          }
        });

      return () => controller.abort();
    }, [id]);
    
  return (
    <div style={{marginTop:"70px",marginBottom:"70px"}} >
       {error ? <p role="alert">{error}</p> : single ? <SingleItem {...single}/> : <p>Loading menu item...</p>}
    </div>
  )
}

export default SingleProduct