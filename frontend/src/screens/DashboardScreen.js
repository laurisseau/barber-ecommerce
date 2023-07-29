import AdminNavbar from '../components/AdminNavbar.js';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import LineChart from '../components/LineChart.js';

export default function DashboardScreen() {
  return (
    <Row>
      <Col className="" md={3} sm={4} xs={3}>
        <div className="admin-navbar-wrapper">
          <AdminNavbar />
        </div>
      </Col>
      <Col md={9} sm={8} xs={9} className="">
        <Row className="mt-4 w-100 d-flex justify-content-center">
          <Col lg={4} md={11} className="">
            <div className="d-flex justify-content-center">
              <Card className="shadow p-2 mt-3 w-100 p-3 bg-gradient-cosmic text-white">
                <div className="font-weight-light">Total Orders</div>
                <div className="d-flex justify-content-between mt-2">
                  <h3 className="stat">865</h3>
                  <span className=" fs-3 material-symbols-outlined">
                    shopping_cart
                  </span>
                </div>
              </Card>
            </div>
          </Col>
          <Col className="" lg={4} md={11}>
            <div className="d-flex justify-content-center">
              <Card className="shadow p-2 mt-3 w-100 p-3 bg-gradient-burning text-white">
                <div className="font-weight-light">Total Income</div>
                <div className="d-flex justify-content-between mt-2">
                  <h3 className="stat">$52,945</h3>
                  <span className=" fs-3 material-symbols-outlined">
                    credit_card
                  </span>
                </div>
              </Card>
            </div>
          </Col>
          <Col className="" lg={4} md={11}>
            <div className="d-flex justify-content-center">
              <Card className="shadow p-2 mt-3 w-100 p-3 bg-gradient-Ohhappiness text-white">
                <div className="font-weight-light">Total Users</div>
                <div className="d-flex justify-content-between mt-2">
                  <h3 className="stat">24.5K</h3>
                  <span className=" fs-3 material-symbols-outlined">
                    person
                  </span>
                </div>
              </Card>
            </div>
          </Col>
        </Row>

        <LineChart />
        
      </Col>
    </Row>
  );
}
