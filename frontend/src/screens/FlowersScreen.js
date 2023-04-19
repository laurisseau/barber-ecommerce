//import axios from 'axios';
import { useEffect, useReducer, useState } from 'react';

import { Helmet } from 'react-helmet-async';
import ProductComp from '../components/ProductsComp';
import Container from 'react-bootstrap/Container';
//import LoadingBox from '../components/LoadingBox';
//import MessageBox from './MessageBox';

export default function FlowersScreen() {
  //const [products, setProducts] = useState([]);

  const products = [
    {
      name: 'Puffco Hot Knife - Black',
      slug: 'puffco-hot-knife-black',
      image:
        'https://shop.trulieve.com/media/catalog/product/cache/cecb1a5ae73afe0e11b93309dfcfeb11/m/i/microsoftteams-image_47_.png',
      category: 'vape',
      description: 'its a good vape',
      price: '20.00',
      countInStock: '3',
    },
    {
      name: 'TruClear Concentrate Syringe CDT 1G - MMS',
      slug: 'finp-truclearsyringe850mg-co2-mimosa',
      image:
        'https://shop.trulieve.com/media/catalog/product/cache/cecb1a5ae73afe0e11b93309dfcfeb11/t/r/truclear_sativa_1_1_2_1_2.png',
      category: 'Concentrates',
      description: 'its a good concentrate',
      price: '70.00',
      countInStock: '1',
    },
    {
      name: 'TruFlower 3.5G - MBU',
      slug: 'tru-flower-3-5g-magicbus-h-fl',
      image:
        'https://shop.trulieve.com/media/catalog/product/cache/cecb1a5ae73afe0e11b93309dfcfeb11/2/0/2023_04_12_trulieve_strains_website_8_magic-bus.png',
      category: 'Flowers',
      description: 'its a good flower',
      price: '50.00',
      countInStock: '2',
    },
    {
      name: 'Dad Grass - THC PREROLL',
      slug: 'epic-vapor-dad-grass-thc-preroll',
      image:
        'https://images.unsplash.com/photo-1626034833021-a9c99c0e0b04?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80',
      category: 'Pre-roll',
      description: 'its a good pre-roll',
      price: '80.00',
      countInStock: '2',
    },
  ];

  return (
    <div>
      <Container className=''>
        <div className="product-flex mt-5 mb-5 ">
          {products.map((product) => (
            <div className='product-box'>
              <ProductComp product={product}></ProductComp>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
