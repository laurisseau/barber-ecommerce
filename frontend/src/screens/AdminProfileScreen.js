import AdminNavbar from '../components/AdminNavbar.js';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import { Store } from '../Store';
import { useContext, useReducer, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { toast } from 'react-toastify';
import { getError } from '../utils';
import { useNavigate } from 'react-router-dom';

const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_REQUEST':
      return { ...state, loadingUpdate: true };
    case 'UPDATE_SUCCESS':
      return { ...state, loadingUpdate: false };
    case 'UPDATE_FAIL':
      return { ...state, loadingUpdate: false };

    default:
      return state;
  }
};

export default function AdminProfileScreen(props) {
  const navigate = useNavigate();
  const { state } = useContext(Store);
  const { userInfo } = state;
  const awsUsername = userInfo.sub;
  const accessToken = userInfo.accessToken;
  const [username, setUsername] = useState(userInfo.preferred_username);
  const [email, setEmail] = useState(userInfo.email);
  const [{ loadingUpdate }, dispatch] = useReducer(reducer, {
    loadingUpdate: false,
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        '/api/users/profile',
        {
          awsUsername,
          accessToken,
          username,
          email,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({
        type: 'UPDATE_SUCCESS',
      });

      const existingUserInfo = JSON.parse(localStorage.getItem('userInfo'));

      existingUserInfo.preferred_username = data.username;

      localStorage.setItem('userInfo', JSON.stringify(existingUserInfo));

      if (userInfo.email !== email && data) {
        const encodedSlug = btoa(data.email);
        navigate(`/updateemail/${encodedSlug}`);
      }

      toast.success('User updated successfully');
      window.location.reload();
    } catch (err) {
      dispatch({
        type: 'FETCH_FAIL',
      });
      toast.error(getError(err));
      //console.log(err);
    }
  };

  return (
    <Row>
      <Col className="" md={3} sm={4} xs={3}>
        <div className="admin-navbar-wrapper">
          <AdminNavbar />
        </div>
      </Col>
      <Col md={9} sm={8} xs={9} className="">
        <div>
          <div className="container small-container">
            <Helmet>
              <title>User Profile</title>
            </Helmet>
            <h1 className="my-3">User Profile</h1>
            <form onSubmit={submitHandler}>
              <Form.Group className="mb-3" controlId="preferred_username">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>

              {loadingUpdate ? (
                <div className="mb-3" disabled>
                  <Button type="submit">Update...</Button>
                </div>
              ) : (
                <div className="mb-3">
                  <Button type="submit">Update</Button>
                </div>
              )}
            </form>
          </div>
        </div>
      </Col>
    </Row>
  );
}
