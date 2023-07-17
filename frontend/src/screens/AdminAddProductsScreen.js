import AdminNavbar from '../components/AdminNavbar.js';
import { useNavigate } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/esm/Button.js';
import { useQuery } from 'react-query';

export default function AdminAddProductsScreen() {
  const navigate = useNavigate();

  const { data: categoryData } = useQuery('categoryData', async () => {
    return await axios.get('/api/categories/');
  });

  const [category, setCategory] = useState('');

  useEffect(() => {
    if (categoryData && categoryData.data && categoryData.data.length > 0) {
      setCategory(categoryData.data[0].name);
    }
  }, [categoryData]);

  const [slug, setSlug] = useState('');
  const [productName, setProductName] = useState('');
  const [brand, setBrand] = useState('');
  const [price, setPrice] = useState('');
  const [countInStock, setCountInStock] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  const handlePrice = (event) => {
    const newValue = event.target.value;
    // Remove any non-numeric characters except for dot (.)
    const sanitizedValue = newValue.replace(/[^0-9.]/g, '');
    setPrice(sanitizedValue);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      //setIsCreating(true);
      const formData = new FormData();

      formData.append('name', productName);
      formData.append('slug', slug);
      formData.append('brand', brand);
      formData.append('category', category);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('countInStock', countInStock);
      formData.append('image', image);

      const data = await axios.post(
        '/api/products/createProduct',
        formData
        //, {
        // headers: { Authorization: `Bearer ${employeeInfo.token}` },
        //}
      );

      if (data) {
        navigate('/dashboard/products');
      }
    } catch (err) {
      //toast.error(getError(err));
      console.log(err);
      //setIsCreating(false);
    }
  };

  return (
    <Row>
      <Col className="" md={3} sm={4} xs={3}>
        <div className="admin-navbar-wrapper">
          <AdminNavbar />
        </div>
      </Col>
      <Col md={9} sm={8} xs={9} className="pt-4 ">
        <Form className="pe-3" onSubmit={submitHandler}>
          <h1>Add Product</h1>
          <Row>
            <Col lg={6} md={6} sm={12}>
              <Form.Group className="mb-3" controlId="product-name">
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  type="product-name"
                  placeholder="Example: Nike Air Force 1 '07 "
                  onChange={(e) => setProductName(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>

            <Col lg={6} md={6} sm={12}>
              <Form.Group className="mb-3" controlId="slug">
                <Form.Label>Slug</Form.Label>
                <Form.Control
                  type="slug"
                  placeholder="Example: air-force-1-07"
                  onKeyPress={(e) =>
                    e.key === ' ' ? e.preventDefault() : e.key
                  }
                  onChange={(e) => setSlug(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col lg={6} md={6} sm={12}>
              <Form.Group className="mb-3" controlId="brand">
                <Form.Label>Brand</Form.Label>
                <Form.Control
                  type="brand"
                  placeholder="Example: Nike"
                  onChange={(e) => setBrand(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
            <Col lg={6} md={6} sm={12}>
              <Form.Group className="mb-3" controlId="price">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="price"
                  placeholder="Example: 100.00"
                  onChange={handlePrice}
                  onKeyPress={(e) =>
                    /[^0-9.]/.test(e.key) ? e.preventDefault() : e.key
                  }
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col lg={4} md={4} sm={12}>
              <Form.Group className="mb-3" controlId="countInStock">
                <Form.Label>Count In Stock</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Example: 12"
                  onChange={(e) => setCountInStock(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
            <Col lg={4} md={4} sm={12}>
              <Form.Group controlId="select" className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  onChange={(e) => setCategory(e.target.value)}
                  value={category}
                  required
                >
                  {categoryData && categoryData.data ? (
                    categoryData.data.map((option, index) => (
                      <option key={index} value={option.name}>
                        {option.name}
                      </option>
                    ))
                  ) : (
                    <option value="None" defaultValue="None">
                      None
                    </option>
                  )}
                </Form.Select>
              </Form.Group>
            </Col>

            <Col lg={4} md={4} sm={12}>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type="file"
                  onChange={(e) => {
                    setImage(e.target.files[0]);
                  }}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Button className="mb-4" type="submit">
            Add Product
          </Button>
        </Form>
      </Col>
    </Row>
  );
}
