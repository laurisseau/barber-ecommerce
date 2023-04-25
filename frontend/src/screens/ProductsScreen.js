import { useQuery } from 'react-query';
import axios from 'axios'
import { Helmet } from 'react-helmet-async';
import ProductComp from '../components/ProductsComp';
import Container from 'react-bootstrap/Container';
import LoadingBox from '../components/LoadingBox';
import { useParams } from 'react-router-dom';

export default function ProdutcsScreen() {

  const params = useParams();
  const { slug } = params;

 const {isLoading, data} = useQuery('category-products', async()=>{
  return await axios.get(`/api/categories/${slug}`)
 })
 
 if (isLoading) {
  return (
    <div className="d-flex justify-content-center mb-5 mt-5">
      <LoadingBox />
    </div>
  );
}

  return (
    <div>
      <Container className=''>
      <Helmet>
        <title>Products</title>
      </Helmet>
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