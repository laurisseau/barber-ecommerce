import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { Store } from '../Store';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Helmet } from 'react-helmet-async';

export default function ProductScreen(props) {
  const { product } = props;

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const addToCartHandler = async (item) => {
    const existItem = cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    //const { data } = await axios.get(`/api/products/${item._id}`);
    /*
      if (data.countInStock < quantity) {
        window.alert('Sorry. product out of stock');
        return;
      }
      ctxDispatch({
        type: 'CART_ADD_ITEM',
        payload: { ...item, quantity },
      });
      */
  };

  return (
    <div style={{}} className="mb-5 custom-card ">
      <Link to={`/product/${product.slug}`}>
        <img src={product.image} className="card-img " alt={product.name} />
      </Link>
      <div className="card-body p-2">
        <div>
          <Link to={`/product/${product.slug}`}>
            <Card.Title>{product.name}</Card.Title>
          </Link>
          <Card.Text>${product.price}</Card.Text>
        </div>
        {product.countInStock === 0 ? (
          <Button variant="light" disabled>
            Out of stock
          </Button>
        ) : (
          <Button onClick={() => addToCartHandler(product)}>
            {' '}
            Add to cart{' '}
          </Button>
        )}
      </div>
    </div>
  );
}
