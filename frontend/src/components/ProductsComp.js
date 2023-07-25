import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { Store } from '../Store';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Rating from './Rating.js';

export default function ProductScreen(props) {
  const { product } = props;

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const addToCartHandler = async (item) => {
    const existItem = cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${item._id}`);

    if (data.countInStock < quantity) {
      window.alert('Sorry. product out of stock');
      return;
    }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity },
    });
  };

  return (
    <div style={{}} className="mb-5 custom-card ">
      <Link to={`/product/${product.slug}`}>
        <img src={product.image} className="card-img  " alt={product.name} />
      </Link>
      <div className="card-body pe-2 ps-2">
        <div className="">
          <Link to={`/product/${product.slug}`}>
            <Card.Title className="mb-2 mt-1">{product.name}</Card.Title>
          </Link>
          <Card.Text className="m-0 fs-5 mb-1 ">${product.price}</Card.Text>
          <Rating rating={3} numReviews={12} />
          <div className='mt-2'>
            {product.countInStock === 0 ? (
              <Button className='' variant="light" disabled>
                Out of stock
              </Button>
            ) : (
              <Button className='' onClick={() => addToCartHandler(product)}>
                {' '}
                Add to cart{' '}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
