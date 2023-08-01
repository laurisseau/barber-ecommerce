import AdminNavbar from '../components/AdminNavbar.js';
import TableComp from '../components/TableComp.js';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useQuery } from 'react-query';
import axios from 'axios';
import { Store } from '../Store';
import LoadingBox from '../components/LoadingBox';
import { useContext } from 'react';

export default function AdminCustomerScreen(props) {
  const { state } = useContext(Store);
  const { userInfo } = state;
  const tableRows = ['sub', 'preferred_username', 'email', 'role'];

  const { isLoading: isLoadingCustomers, data: customersData } = useQuery(
    'customers',
    async () => {
      return await axios.get('/api/users/allusers', {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
    }
  );

  if (isLoadingCustomers) {
    return (
      <div className="d-flex justify-content-center mb-5 mt-5">
        <LoadingBox />
      </div>
    );
  }

  const filteredData = (data) => {
    const filterArr = [];

    if (data.length === 0) {
      return data;
    }

    for (let j = 0; j <= data.length - 1; j++) {
      const customerData = data[j];

      filterArr.push({
        sub: customerData['sub'],
        preferred_username: customerData['preferred_username'],
        email: customerData['email'],
        role: customerData['role'],
      });
    }

    return filterArr;
  };

  return (
    <Row>
      <Col className="" md={3} sm={4} xs={3}>
        <div className="admin-navbar-wrapper">
          <AdminNavbar />
        </div>
      </Col>
      <Col md={9} sm={8} xs={9} className="">
        {customersData ? (
          <TableComp
            title={`All Customers`}
            tableRows={tableRows}
            data={filteredData(customersData.data)}
            rowsPerPage={5}
            search={true}
          />
        ) : (
          <TableComp
            title={`All Customers`}
            tableRows={tableRows}
            search={true}
          />
        )}
      </Col>
    </Row>
  );
}
