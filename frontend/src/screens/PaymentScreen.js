import { useState, useContext } from 'react';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from '../components/PaymentForm';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Store } from '../Store';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/esm/Button';
import { toast } from 'react-toastify';
import { getError } from '../utils'; 

export default function PaymentScreen() {
  const { state } = useContext(Store);
  const { cart } = state;
  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;

  cart.itemsPrice = round2(
    cart.cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
  );

  cart.shippingPrice = cart.itemsPrice > 100 ? round2(0) : round2(10);
  cart.taxPrice = round2(0.15 * cart.itemsPrice);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

  const publishableKey =
    'pk_test_51MN3hSJ51ecO3u1a177GPQMJUXXB2H0QUeLspccPLF0Ugqd2et6UtAq4TT3p6bV8JuQM1pD6Z6wjO8DP7tb97qiK00LxevrQNr';

  const stripePromise = loadStripe(publishableKey);

  const [clientSecret, setClientSecret] = useState('');
  const amount = cart.totalPrice.toFixed(2)
  const [visible, setVisible] = useState('visible');

  const submitHandler = async () => {
    try {

      const { data } = await axios.post('/api/payment/create-payment-intent',{
        amount
      });

      setClientSecret(data.clientSecret);
      setVisible('none');
    } catch (err) {
      toast.error(getError(err));
     // console.log(error);
    }
  };

  function PressedPayment(props) {
    if (props.clientSecret === '') {
      return (
        <div>
          {' '}
          <Card className="p-3 mb-5">
            <Card.Title> Order Summary</Card.Title>

            <Row>
              <Col>Items</Col>
              <Col>${cart.itemsPrice.toFixed(2)}</Col>
            </Row>

            <Row>
              <Col>Shipping</Col>
              <Col>${cart.shippingPrice.toFixed(2)}</Col>
            </Row>

            <Row>
              <Col>Tax</Col>
              <Col>${cart.taxPrice.toFixed(2)}</Col>
            </Row>

            <Row>
              <Col>
                <strong>Order Total</strong>
              </Col>
              <Col>
                <strong>${amount}</strong>
              </Col>
            </Row>

            <div className="d-grid mt-3">
              <Button
                type="button"
                onClick={submitHandler}
                disabled={cart.cartItems.length === 0}
                className={visible}
              >
                Place Order
              </Button>
            </div>
          </Card>
        </div>
      );
    } else {
      return (
        <div>
          <Card className="p-3 mb-5">
            <Card.Title> Order Summary</Card.Title>

            <Row>
              <Col>Items</Col>
              <Col>${cart.itemsPrice.toFixed(2)}</Col>
            </Row>

            <Row>
              <Col>Shipping</Col>
              <Col>${cart.shippingPrice.toFixed(2)}</Col>
            </Row>

            <Row>
              <Col>Tax</Col>
              <Col>${cart.taxPrice.toFixed(2)}</Col>
            </Row>

            <Row className='mb-3'>
              <Col>
                <strong>Order Total</strong>
              </Col>
              <Col>
                <strong>${amount}</strong>
              </Col>
            </Row>
            <Elements
              options={{ clientSecret: clientSecret }}
              stripe={stripePromise}
            >
              <PaymentForm />
            </Elements>
          </Card>
        </div>
      );
    }
  }

  return (
    <Container className="">
      <Helmet>
        <title>Preview Order</title>
      </Helmet>
      <h1 className="mb-3">Preview Order</h1>
      <Row>
        <Col md={8}>
          <Card className="mb-3 p-3">
            <Card.Title>Shipping</Card.Title>
            <Card.Text>
              <strong>Name:</strong>
              {cart.shippingAddress.fullname}
              <br />
              <strong>Address:</strong>
              {cart.shippingAddress.address}, {cart.shippingAddress.city},
              {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
            </Card.Text>
            <Link to="/shipping">Edit</Link>
          </Card>

          <Card className="mb-3 p-3">
            <div>
              <Card.Title>Items</Card.Title>
              <div>
                {cart.cartItems.map((item) => (
                  <div className="border-bottom mb-2 pb-2" key={item._id}>
                    <Row className="align-items-center">
                      <Col md={3} xs={4} className="d-flex align-items-center ">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="img-fluid rounded me-3 "
                          style={{ height: '100px' }}
                        ></img>{' '}
                        
                      </Col>
                      <Col md={3} xs={4}><Link to={`/product/${item.slug}`}>{item.name}</Link></Col>
                      <Col md={3} xs={2}>
                        <span>{item.quantity}</span>
                      </Col>
                      <Col md={3} xs={2}>${item.price}</Col>
                    </Row>
                  </div>
                ))}
              </div>
              <Link to="/cart">Edit</Link>
            </div>
          </Card>
        </Col>
        <Col md={4}>

        <PressedPayment clientSecret={clientSecret} />
        </Col>
      </Row>
    </Container>
  );
}


