import AdminNavbar from '../components/AdminNavbar.js';
import Rating from '../components/Rating.js';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useQuery } from 'react-query';
import axios from 'axios';
import LoadingBox from '../components/LoadingBox';
import Card from 'react-bootstrap/Card';
import { useState } from 'react';
import Button from 'react-bootstrap/esm/Button.js';
import { Link } from 'react-router-dom';

export default function AdminProductScreen() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const rowsPerPage = 8;

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

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  // how data is filterd to search
  const filterData = (data) => {
    return data.filter((tableData) =>
      Object.values(tableData).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };

  const totalPages = Math.ceil(
    filterData(productData.data).length / rowsPerPage
  );
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentData = filterData(productData.data).slice(startIndex, endIndex);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPaginationControls = () => {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={
            currentPage === i
              ? 'text-center active pagination-btn pagination-btn-active'
              : 'pagination-btn '
          }
        >
          {i}
        </button>
      );
    }

    return (
      <div className="d-flex justify-content-center align-items-center">
        <button
          className="pagination-btn "
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          <span className="pt-2 material-symbols-outlined">arrow_back_ios</span>
        </button>
        {pageNumbers}
        <button
          className="pagination-btn"
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          <span className="pt-2 ps-2 material-symbols-outlined">
            arrow_forward_ios
          </span>
        </button>
      </div>
    );
  };

  return (
    <Row>
      <Col className="" md={3} sm={4} xs={3}>
        <div className="admin-navbar-wrapper">
          <AdminNavbar />
        </div>
      </Col>
      <Col md={9} sm={8} xs={9} className="pt-4">
        <div className="d-flex justify-content-between  product-utils-responsitivity pe-3">
          <div className="product-add-btn-responsitivity">
            <Link to="/dashboard/products/add">
              <Button className="ps-5 pe-5 product-add-btn-responsitivity">
                <span className="text-white material-symbols-outlined d-flex justify-content-center">
                  add_box
                </span>
              </Button>
            </Link>
          </div>
          <div className="product-add-search-responsitivity ">
            <div
              className="input-group rounded d-flex"
              style={{ width: '100%' }}
            >
              <input
                type="search"
                className="form-control "
                placeholder="Search"
                aria-label="Search"
                aria-describedby="search-addon"
                value={searchTerm}
                onChange={handleSearch}
              />
              <span className="input-group-text border-0" id="search-addon">
                <i className="fas fa-search"></i>
              </span>
            </div>
          </div>
        </div>
        <div className="d-flex  flex-wrap product-responsitivity pe-3  ">
          {productData && productData.data ? (
            currentData.map((data, index) => (
              <Card className="shadow mt-4  mb-3 " style={{ width: '223px' }}>
                <Link to="/dashboard/products">
                  <img
                    src={data.image}
                    className=""
                    alt="img"
                    style={{ height: '223px' }}
                  />
                </Link>
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
                  <Button variant="danger" className="w-100 mt-2">
                    Remove
                  </Button>
                </div>
              </Card>
            ))
          ) : (
            <div></div>
          )}
        </div>
        <div>{renderPaginationControls()}</div>
      </Col>
    </Row>
  );
}
