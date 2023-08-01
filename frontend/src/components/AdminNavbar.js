import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import { Store } from '../Store';
import { useContext } from 'react';

export default function AdminNavbar() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMetod');
    window.location.href = '/signin';
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="bg-dark min-vh-100 d-flex justify-content-between flex-column ">
          <div>
            <a
              href="/"
              className="text-decoration-none text-white d-flex align-items-center ms-3 mt-2"
            >
              <span className="ms-1 fs-4 d-none d-sm-inline">Brand</span>
            </a>

            <hr className="text-secondary d-none d-sm-block" />
            <ul className="nav nav-pills flex-column mt-3 mt-sm-0">
              <li className="nav-item text-white fs-4 my-1 py-2 py-sm-0">
                <Link
                  to="/dashboard"
                  className="nav-link text-white fs-5 d-flex"
                >
                  <span className="fs-4 material-symbols-outlined d-flex align-items-center">
                    speed
                  </span>
                  <span className="ms-3 d-none d-sm-inline">Dasboard</span>
                </Link>
              </li>

              <li className="nav-item text-white fs-4 my-1 py-2 py-sm-0">
                <Link
                  to="/dashboard/orders"
                  className="nav-link text-white fs-5 d-flex"
                >
                  <span className="fs-4 material-symbols-outlined d-flex align-items-center">
                    table
                  </span>
                  <span className="ms-3 d-none d-sm-inline">Orders</span>
                </Link>
              </li>

              <li className="nav-item text-white fs-4 my-1 py-2 py-sm-0">
                <Link
                  to="/dashboard/categories"
                  className="nav-link text-white fs-5 d-flex"
                >
                  <span className="fs-4 material-symbols-outlined d-flex align-items-center">
                    grid_view
                  </span>
                  <span className="ms-3 d-none d-sm-inline">Categories</span>
                </Link>
              </li>

              <li className="nav-item text-white fs-4 my-1 py-2 py-sm-0">
                <Link
                  to="/dashboard/products"
                  className="nav-link text-white fs-5 d-flex"
                >
                  <span className="fs-4 material-symbols-outlined d-flex align-items-center">
                    stacked_inbox
                  </span>
                  <span className="ms-3 d-none d-sm-inline">Products</span>
                </Link>
              </li>

              <li className="nav-item text-white fs-4 my-1 py-2 py-sm-0">
                <Link
                  to="/dashboard/customers"
                  className="nav-link text-white fs-5 d-flex"
                >
                  <span className="fs-4 material-symbols-outlined d-flex align-items-center">
                    group
                  </span>
                  <span className="ms-3 d-none d-sm-inline">Customers</span>
                </Link>
              </li>
            </ul>
          </div>

          <NavDropdown
            title={
              <div style={{ display: 'inline-block' }}>
                <div className="d-flex align-items-center ">
                  <span className="material-symbols-outlined fs-4 me-2">
                    account_circle
                  </span>
                  <span className="d-none d-sm-inline">
                    {userInfo.preferred_username}
                  </span>
                </div>
              </div>
            }
            id="basic-nav-dropdown"
            className="dropup text-decoration-none text-white p-3 fs-5"
          >
            <NavDropdown.Item href="/dashboard/profile">Profile</NavDropdown.Item>
            <NavDropdown.Item onClick={signoutHandler}>
              Signout
            </NavDropdown.Item>
          </NavDropdown>
        </div>
      </div>
    </div>
  );
}
