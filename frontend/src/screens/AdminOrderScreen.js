import AdminNavbar from '../components/AdminNavbar.js';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import TableComp from '../components/TableComp.js';
import { useQuery } from 'react-query';
import axios from 'axios';
import LoadingBox from '../components/LoadingBox';

export default function AdminOrderScreen() {
  const tableRows = [
    'Order_Id',
    'Quantity',
    'Product_Name',
    'Customer_Name',
    'Status',
  ];

  const { isLoading: isLoadingOrders, data: ordersData } = useQuery(
    'orders',
    async () => {
      return await axios.get('/api/orders/');
    }
  );

  if (isLoadingOrders) {
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
      const orderData = data[j];
      for (let i = 0; i <= orderData.orderItems.length - 1; i++) {
        if (orderData.orderItems[i].isDelivered) {
          filterArr.push({
            Product_Name: orderData.orderItems[i].name,
            Customer_Name: orderData.shippingAddress.fullName,
            Customer_Email: orderData.shippingAddress.address,
            Order_Id: orderData._id,
            Quantity: orderData.orderItems[i].quantity,
            Status: 'Delivered',
          });
        } else {
          filterArr.push({
            Product_Name: orderData.orderItems[i].name,
            Customer_Name: orderData.shippingAddress.fullName,
            Customer_Email: orderData.shippingAddress.address,
            Order_Id: orderData._id,
            Quantity: orderData.orderItems[i].quantity,
            Status: 'Undelivered',
          });
        }
      }
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
        {ordersData ? (
          <TableComp
            title={`All Orders`}
            tableRows={tableRows}
            data={filteredData(ordersData.data)}
            rowsPerPage={5}
            search={true}
          />
        ) : (
          <TableComp
            title={`All Orders`}
            tableRows={tableRows}
            search={true}
          />
        )}
      </Col>
    </Row>
  );
}
