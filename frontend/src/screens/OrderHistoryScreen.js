import React, { useContext } from 'react';
import { useQuery } from 'react-query';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LoadingBox from '../components/LoadingBox';
import { toast } from 'react-toastify';
import Table from 'react-bootstrap/Table';
import { Store } from '../Store';
import { getError } from '../utils';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/esm/Container';

export default function OrderHistoryScreen() {
  const { state } = useContext(Store);
  const { userInfo } = state;
  const navigate = useNavigate();

  const { isLoading, data } = useQuery('order-history', async () => {
    try {
      return await axios.get(
        `/api/orders/mine`,

        { headers: { Authorization: `Bearer ${userInfo.token}` } }
      );
    } catch (err) {
      toast.error(getError(err));
      // console.log(err);
    }
  });

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center mb-5 mt-5">
        <LoadingBox />
      </div>
    );
  }

  return (
    <Container>
      <Helmet>
        <title>Order History</title>
      </Helmet>

      <h1 className="mt-4">Order History</h1>

      <Table className="table mb-0 mt-3" responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>DATE</th>
            <th>TOTAL</th>
            <th>PAID</th>
            <th>DELIVERED</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.data &&
            data.data.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>${order.totalPrice.toFixed(2)}</td>
                <td>{order.isPaid ? order.paidAt.substring(0, 10) : 'No'}</td>
                <td>
                  {order.isDelivered
                    ? order.deliveredAt.substring(0, 10)
                    : 'No'}
                </td>
                <td>
                  <Button
                    type="button"
                    variant="light"
                    onClick={() => {
                      navigate(`/order/${order._id}`);
                    }}
                  >
                    Details
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </Container>
  );
}
