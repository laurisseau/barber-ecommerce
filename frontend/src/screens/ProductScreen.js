import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { Store } from '../Store';
import Badge from 'react-bootstrap/Badge';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/esm/Button';
import { Helmet } from 'react-helmet-async';
import Container from 'react-bootstrap/esm/Container';
import { useQuery } from 'react-query';
import axios from 'axios';
import LoadingBox from '../components/LoadingBox';

export default function ProductScreen() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart } = state;
  const params = useParams();
  const { slug } = params;

  const { isLoading, data } = useQuery('product', async () => {
    return await axios.get(`/api/products/slug/${slug}`);
  });

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center mb-5 mt-5">
        <LoadingBox />
      </div>
    );
  }

  const addToCartHandler = async () => {
    const existItem = cart.cartItems.find((x) => x._id === data.data._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const prodId = await axios.get(`/api/products/${data.data._id}`);
    let prodIdData = prodId.data;
    if (prodIdData.countInStock < quantity) {
      window.alert('Sorry. product out of stock');
      return;
    }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...data.data, quantity },
    });
  };

  return (
    <Container className="mt-5 mb-5  ">
      {data ? (
        <Row>
          <Col lg={6} md={5}>
            <Helmet>
              <title>{data.data.name}</title>
            </Helmet>
            <div className="">
              <img
                className=""
                src={data.data.image}
                alt={data.data.name}
                style={{ height: '500px', width: '100%' }}
              ></img>
            </div>
          </Col>

          <Col>
            <div className="" style={{ maxWidth: '500px', minWidth: '300px' }}>
              <Helmet>
                <title>{data.name}</title>
              </Helmet>

              <div>
                <h1>{data.data.name}</h1>
              </div>

              <div className="d-flex border-bottom mb-4 pb-2 mt-4">
                <h2 style={{ fontWeight: '400' }}>
                  Price : ${data.data.price}
                </h2>
                {data.data.countInStock > 0 ? (
                  <Badge bg="success pt-2 ms-4 mt-2 mb-2">In Stock</Badge>
                ) : (
                  <Badge bg="danger pt-2 ms-4 mt-2 mb-2">Unavailable</Badge>
                )}
              </div>

              {data.data.countInStock > 0 && (
                <div>
                  <div className="d-grid">
                    <Button
                      variant="primary mb-3"
                      onClick={addToCartHandler}
                      style={{ width: '170px' }}
                    >
                      Add to Cart
                    </Button>
                  </div>
                </div>
              )}

              <div>
                <p className="p-2">{data.data.description}</p>
              </div>
            </div>
          </Col>
        </Row>
      ) : (
        <div></div>
      )}
    </Container>
  );
}
