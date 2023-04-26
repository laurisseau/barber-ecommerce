import { useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import { Store } from '../Store';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import MessageBox from '../components/MessageBox';
import Card from 'react-bootstrap/Card';
import { Link, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/esm/Container';
import axios from 'axios';

export default function CartScreen() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const updateCartHandler = async (item, quantity) => {
    const prodId = await axios.get(`/api/products/${item._id}`);
    let prodIdData = prodId.data;

    if (prodIdData.countInStock < quantity) {
      window.alert('Sorry. product out of stock');
      return;
    }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity },
    });
  };

  const removeItemHandler = async (item) => {
    ctxDispatch({
      type: 'CART_REMOVE_ITEM',
      payload: item,
    });
  };

  const checkoutHandler = () => {
    //navigate('/signin?redirect=/shipping');
    navigate('/shipping');
  };

  return (
    <Container>
      <Helmet>
        <title>Shopping Cart</title>
      </Helmet>
      <h1 className="mt-5">Shopping Cart</h1>
      <Row className="mb-5 mt-4">
        <Col md={8}>
          {cartItems.length === 0 ? (
            <MessageBox>
              Cart is empty. <Link to="/">Go Shopping</Link>
            </MessageBox>
          ) : (
            <ListGroup className='mb-5'>
              {cartItems.map((item) => (
                <ListGroup.Item key={item._id} className='d-flex '>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="img-fluid rounded me-3 "
                    style={{ height: '100px' }}
                  ></img>{' '}
                  <Row className="align-items-center w-100">
                    <Col
                      md={4}
                      
                      xs={9}
                      className="d-flex align-items-center "
                    >
                      <Link to={`product/${item.slug}`}>{item.name}</Link>
                    </Col>
                    <Col md={2}  xs={3}>${item.price}</Col>
                    <Col md={4}  xs={9}className='d-flex align-items-center'>
                      <button
                      className='add-and-min-btn'
                        disabled={item.quantity === 1}
                        onClick={() =>
                          updateCartHandler(item, item.quantity - 1)
                        }
                      >
                        <i className="fas fa-minus-circle" ></i>
                      </button>{' '}
                      <span>{item.quantity}</span>{' '}
                      <button
                        className='add-and-min-btn'
                        disabled={item.quantity === item.countInStock}
                        onClick={() =>
                          updateCartHandler(item, item.quantity + 1)
                        }
                      >
                        <i className="fas fa-plus-circle" ></i>
                      </button>{' '}
                    </Col>
                    
                    <Col md={2}  xs={3}>
                      <button
                        className='add-and-min-btn'
                        onClick={() => removeItemHandler(item)}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4} >
          <Card className="p-3">
            <div className="mb-3">
              <h3>
                Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)} items)
                : ${cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
              </h3>
            </div>

            <div>
              <Button
                className="w-100"
                type="button"
                variant="primary"
                onClick={checkoutHandler}
                disabled={cartItems.length === 0}
              >
                Proceed to Checkout
              </Button>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
