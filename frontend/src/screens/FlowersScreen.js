//import axios from 'axios';
import { useEffect, useReducer, useState } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios'
import { Helmet } from 'react-helmet-async';
import ProductComp from '../components/ProductsComp';
import Container from 'react-bootstrap/Container';
//import LoadingBox from '../components/LoadingBox';
//import MessageBox from './MessageBox';

export default function FlowersScreen() {

 const {isLoading, data} = useQuery('category-products', ()=>{
  return axios.get('/api/products/')
 })

 
if(isLoading){
  return<h2>loading...</h2>
}

  return (
    <div>
      <Container className=''>
        <div className="product-flex mt-5 mb-5 ">
          {data?.data.map((product) => (
            <div className='product-box' key={product._id}>
              <ProductComp product={product}></ProductComp>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
/*



*/