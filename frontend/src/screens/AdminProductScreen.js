import AdminNavbar from '../components/AdminNavbar.js';
import Rating from '../components/Rating.js';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useQuery } from 'react-query';
import axios from 'axios';
import LoadingBox from '../components/LoadingBox';
import Card from 'react-bootstrap/Card';


export default function AdminProductScreen(props) {
  const { isLoading: isLoadingproductData, data: productData } = useQuery(
    'productData',
    async () => {
      return await axios.get('/api/products/');
    }
  );


  if (isLoadingproductData) {
    return (
      <div className="d-flex justify-content-center mb-5 mt-5">
        <LoadingBox />
      </div>
    );
  }

  return (
    <Row>
      <Col className="" md={3} sm={4} xs={3}>
        <div className="admin-navbar-wrapper">
          <AdminNavbar />
        </div>
      </Col>
      <Col md={9} sm={8} xs={9} className="">
        <div className="d-flex justify-content-between flex-wrap pe-3 ">
          {productData && productData.data ? (
            productData.data.map((data, index) => (
              <Card
                className="shadow mt-4 pb-3"
                style={{ width: '223px', height: '350px' }}
              >
                <img
                  src={data.image}
                  className=""
                  alt="img"
                  style={{ height: '223px' }}
                />
                <div className="p-2">
                  <div>
                    <h5>{data.name}</h5>
                  </div>
                  <div className="d-flex justify-content-between ">
                    <div>
                      <span className="fs-5 ">134</span>{' '}
                      <span className="fw-light fs-6">Sales</span>{' '}
                    </div>
                    <span className="fs-5 ">${data.price}</span>
                  </div>

                  <div className="">
                    <Rating rating={3} numReviews={12} />
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <div></div>
          )}
        </div>
      </Col>
    </Row>
  );
}
