import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/esm/Button';
import axios from 'axios';
import AdminNavbar from '../components/AdminNavbar.js';
import Form from 'react-bootstrap/Form';

export default function AdminProductDetailScreen() {
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;

  const [seeProduct, setSeeProduct] = useState({
    slug: '',
    name: '',
    brand: '',
    price: '',
    countInStock: '',
    image: '',
    description: '',
    category: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`/api/products/${id}`);
        //console.log(data);
        setSeeProduct({
          slug: data.slug,
          name: data.name,
          brand: data.brand,
          price: data.price,
          countInStock: data.countInStock,
          image: data.image,
          description: data.description,
          category: data.category,
        });
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [id]);

  //console.log(seeProduct)

  const [category, setCategory] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get('/api/categories/');
        setCategory(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const handlePrice = (event) => {
    const newValue = event.target.value;
    // Remove any non-numeric characters except for dot (.)
    const sanitizedValue = newValue.replace(/[^0-9.]/g, '');
    setSeeProduct({
      slug: seeProduct.slug,
      name: seeProduct.name,
      brand: seeProduct.brand,
      price: sanitizedValue,
      countInStock: seeProduct.countInStock,
      image: seeProduct.image,
      description: seeProduct.description,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      formData.append('name', seeProduct.name);
      formData.append('slug', seeProduct.slug);
      formData.append('brand', seeProduct.brand);
      formData.append('category', seeProduct.category);
      formData.append('description', seeProduct.description);
      formData.append('price', seeProduct.price);
      formData.append('countInStock', seeProduct.countInStock);
      formData.append('image', seeProduct.image);

      const { data } = await axios.put(
        `/api/products/updateProduct/${id}`,
        formData
      );

      if (data) {
        navigate('/dashboard/products');
      }
    } catch (err) {
      console.log(err);
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
          <h1>Edit Product</h1>
          <Row>
            <Col lg={6} md={6} sm={12}>
              <Form.Group className="mb-3" controlId="product-name">
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  type="product-name"
                  value={seeProduct.name}
                  onChange={(e) =>
                    setSeeProduct({
                      slug: seeProduct.slug,
                      name: e.target.value,
                      brand: seeProduct.brand,
                      price: seeProduct.price,
                      countInStock: seeProduct.countInStock,
                      image: seeProduct.image,
                      description: seeProduct.description,
                    })
                  }
                  required
                />
              </Form.Group>
            </Col>

            <Col lg={6} md={6} sm={12}>
              <Form.Group className="mb-3" controlId="slug">
                <Form.Label>Slug</Form.Label>
                <Form.Control
                  type="slug"
                  value={seeProduct.slug}
                  onKeyPress={(e) =>
                    e.key === ' ' ? e.preventDefault() : e.key
                  }
                  onChange={(e) =>
                    setSeeProduct({
                      slug: e.target.value,
                      name: seeProduct.name,
                      brand: seeProduct.brand,
                      price: seeProduct.price,
                      countInStock: seeProduct.countInStock,
                      image: seeProduct.image,
                      description: seeProduct.description,
                    })
                  }
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
                  value={seeProduct.brand}
                  onChange={(e) =>
                    setSeeProduct({
                      slug: seeProduct.slug,
                      name: seeProduct.name,
                      brand: e.target.value,
                      price: seeProduct.price,
                      countInStock: seeProduct.countInStock,
                      image: seeProduct.image,
                      description: seeProduct.description,
                    })
                  }
                  required
                />
              </Form.Group>
            </Col>
            <Col lg={6} md={6} sm={12}>
              <Form.Group className="mb-3" controlId="price">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="price"
                  value={seeProduct.price}
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
                  value={seeProduct.countInStock}
                  onChange={(e) =>
                    setSeeProduct({
                      slug: seeProduct.slug,
                      name: seeProduct.name,
                      brand: seeProduct.brand,
                      price: seeProduct.price,
                      countInStock: e.target.value,
                      image: seeProduct.image,
                      description: seeProduct.description,
                      category: seeProduct.category,
                    })
                  }
                  required
                />
              </Form.Group>
            </Col>
            <Col lg={4} md={4} sm={12}>
              <Form.Group controlId="select" className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  onChange={(e) =>
                    setSeeProduct({
                      slug: seeProduct.slug,
                      name: seeProduct.name,
                      brand: seeProduct.brand,
                      price: seeProduct.price,
                      countInStock: seeProduct.countInStock,
                      image: seeProduct.image,
                      description: seeProduct.description,
                      category: e.target.value,
                    })
                  }
                  value={seeProduct.category}
                  required
                >
                  {category ? (
                    category.map((option, index) => (
                      <option key={index} value={option.slug}>
                        {option.slug}
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
                    setSeeProduct({
                      slug: seeProduct.slug,
                      name: seeProduct.name,
                      brand: seeProduct.brand,
                      price: seeProduct.price,
                      countInStock: seeProduct.countInStock,
                      image: e.target.files[0],
                      description: seeProduct.description,
                      category: seeProduct.category,
                    });
                  }}
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
                  value={seeProduct.description}
                  onChange={(e) =>
                    setSeeProduct({
                      slug: seeProduct.slug,
                      name: seeProduct.name,
                      brand: seeProduct.brand,
                      price: seeProduct.price,
                      countInStock: seeProduct.countInStock,
                      image: seeProduct.image,
                      description: e.target.value,
                      category: seeProduct.category,
                    })
                  }
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Button className="mb-4" type="submit">
            Edit Product
          </Button>
        </Form>
      </Col>
    </Row>
  );
}
