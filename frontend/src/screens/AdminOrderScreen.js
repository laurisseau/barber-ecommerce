import AdminNavbar from '../components/AdminNavbar.js';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import TableComp from '../components/TableComp.js';
import { useQuery } from 'react-query';
import axios from 'axios';
import LoadingBox from '../components/LoadingBox';
import { OptionModal } from '../components/OptionModal.js';
import Badge from 'react-bootstrap/Badge';
import { useQueryClient, useMutation } from 'react-query';

export default function AdminOrderScreen() {
  const tableRows = [
    'Order_Id',
    'Quantity',
    'Product_Name',
    'Customer_Name',
    'Status',
  ];

  const queryClient = useQueryClient();

  const updateItemDeliverey = async (text, data) => {
    if (text === 'Delivered') {
      try {
        await axios.put('/api/orders/updateDeliverey', {
          id: data._id,
          orderItemName: data.orderItems[0].name,
          status: text,
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        await axios.put('/api/orders/updateDeliverey', {
          id: data._id,
          orderItemName: data.orderItems[0].name,
          status: text,
        });
      } catch (err) {
        console.log(err);
      }
    }
  };

  const updateItemToNotDeliveredMutation = useMutation(
    (data) => updateItemDeliverey('Undelivered', data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('orders');
      },
    }
  );

  const updateItemToDeliveredMutation = useMutation(
    (data) => updateItemDeliverey('Delivered', data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('orders');
      },
    }
  );

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
            Customer_Name: [
              <div key={i}>
                <p className="mb-1">{orderData.shippingAddress.fullName}</p>
                <p className="text-muted mb-0">
                  {orderData.shippingAddress.address}
                </p>
              </div>,
            ],
            Order_Id: orderData._id,
            Quantity: orderData.orderItems[i].quantity,
            Status: [
              <Badge
                bg="success"
                key={i}
                onClick={() => {
                  OptionModal(
                    updateItemToNotDeliveredMutation,
                    orderData,
                    'Are you sure you want to undeliver this item ?',
                    'This customer now knows that their item is undelivered.',
                    'This customer still knows that their item is not delivered.'
                  );
                }}
                className="p-2 pointer"
                pill
              >
                Delivered
              </Badge>,
            ],
          });
        } else {
          filterArr.push({
            Product_Name: orderData.orderItems[i].name,
            Customer_Name: [
              <div key={i}>
                <p className=" mb-1">{orderData.shippingAddress.fullName}</p>
                <p className="text-muted mb-0">
                  {orderData.shippingAddress.address}
                </p>
              </div>,
            ],
            Order_Id: orderData._id,
            Quantity: orderData.orderItems[i].quantity,
            Status: [
              <Badge
                bg="danger"
                key={i}
                onClick={() => {
                  OptionModal(
                    updateItemToDeliveredMutation,
                    orderData,
                    'Are you sure you want to deliver this item ?',
                    'This customer now knows that their item is delivered.',
                    'This customer still knows that their item is delivered.'
                  );
                }}
                className="p-2 pointer"
                pill
              >
                Undelivered
              </Badge>,
            ],
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
          <TableComp title={`All Orders`} tableRows={tableRows} search={true} />
        )}
      </Col>
    </Row>
  );
}
