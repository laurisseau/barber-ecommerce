import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from '../components/PaymentForm';
import Container from 'react-bootstrap/Container';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Store } from '../Store';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/esm/Button';
import { useQuery } from 'react-query';
import LoadingBox from '../components/LoadingBox';

export default function PaymentScreen() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const params = useParams();
  const { id: orderId } = params;
  const navigate = useNavigate();

  const publishableKey =
    'pk_test_51MN3hSJ51ecO3u1a177GPQMJUXXB2H0QUeLspccPLF0Ugqd2et6UtAq4TT3p6bV8JuQM1pD6Z6wjO8DP7tb97qiK00LxevrQNr';

  const stripePromise = loadStripe(publishableKey);

  const [clientSecret, setClientSecret] = useState('');
  const [visible, setVisible] = useState('visible');

  const [itemsPrice, setItemsPrice] = useState('');
  const [shippingPrice, setShippingPrice] = useState('');
  const [taxPrice, setTaxPrice] = useState('');
  const [totalPrice, setTotalPrice] = useState('');
  const [fullname, setFullname] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const [orderItems, setOrderItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data } = await axios.get(
          `/api/orders/${orderId}`,

          { headers: { Authorization: `Bearer ${userInfo.token}` } }
        );

        if (data) {
          setIsLoading(false);
          setItemsPrice(data.itemsPrice);
          setShippingPrice(data.shippingPrice);
          setTaxPrice(data.taxPrice);
          setTotalPrice(data.totalPrice);
          setFullname(data.shippingAddress.fullName);
          setAddress(data.shippingAddress.address);
          setCity(data.shippingAddress.city);
          setPostalCode(data.shippingAddress.postalCode);
          setCountry(data.shippingAddress.country);
          setOrderItems(data.orderItems);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchOrder();
  }, [orderId, userInfo.token]);

  if (!userInfo) {
    return navigate('/login');
  }

  const submitHandler = async (orderPrice) => {
    try {
      const { data } = await axios.post('/api/payment/create-payment-intent', {
        totalPrice,
      });

      setClientSecret(data.clientSecret);
      setVisible('none');
    } catch (error) {
      console.log(error);
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
              <Col>${itemsPrice.toFixed(2)}</Col>
            </Row>

            <Row>
              <Col>Shipping</Col>
              <Col>${shippingPrice.toFixed(2)}</Col>
            </Row>

            <Row>
              <Col>Tax</Col>
              <Col>${taxPrice.toFixed(2)}</Col>
            </Row>

            <Row>
              <Col>
                <strong>Order Total</strong>
              </Col>
              <Col>
                <strong>${totalPrice.toFixed(2)}</strong>
              </Col>
            </Row>

            <div className="d-grid mt-3">
              <Button
                type="button"
                onClick={submitHandler}
                //disabled={cart.cartItems.length === 0}
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
              <Col>${itemsPrice.toFixed(2)}</Col>
            </Row>

            <Row>
              <Col>Shipping</Col>
              <Col>${shippingPrice.toFixed(2)}</Col>
            </Row>

            <Row>
              <Col>Tax</Col>
              <Col>${taxPrice.toFixed(2)}</Col>
            </Row>

            <Row>
              <Col>
                <strong>Order Total</strong>
              </Col>
              <Col>
                <strong>${totalPrice.toFixed(2)}</strong>
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
      {!isLoading ? (
        <Row>
          <Col md={8}>
            <Card className="mb-3 p-3">
              <Card.Title>Shipping</Card.Title>
              <Card.Text>
                <strong>Name:</strong> {fullname}
                <br />
                <strong>Address:</strong> {address}, {city}, {postalCode},{' '}
                {country}
              </Card.Text>
              <Link to="/shipping">Edit</Link>
            </Card>

            <Card className="mb-3 p-3">
              <div>
                <Card.Title>Items</Card.Title>
                <div>
                  {orderItems.map((item) => (
                    <div className="border-bottom mb-2 pb-2" key={item._id}>
                      <Row className="align-items-center">
                        <Col
                          md={3}
                          xs={4}
                          className="d-flex align-items-center "
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="img-fluid rounded me-3 "
                            style={{ height: '100px' }}
                          ></img>{' '}
                        </Col>
                        <Col md={3} xs={4}>
                          <Link to={`/product/${item.slug}`}>{item.name}</Link>
                        </Col>
                        <Col md={3} xs={2}>
                          <span>{item.quantity}</span>
                        </Col>
                        <Col md={3} xs={2}>
                          ${item.price}
                        </Col>
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
      ) : (
        <div className="d-flex justify-content-center mb-5 mt-5">
          <LoadingBox />
        </div>
      )}
    </Container>
  );
}
