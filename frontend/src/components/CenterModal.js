import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function CenterModal(props) {
  const navigate = useNavigate();
  const [slug, setSlug] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [image, setImage] = useState('');

  const submitHandler = async (e) => {
    //e.preventDefault();

    try {
      //setIsCreating(true);
      const formData = new FormData();

      formData.append('name', categoryName);
      formData.append('slug', slug);
      formData.append('image', image);

      const data = await axios.post(
        '/api/categories/createCategory',
        formData
        //, {
        // headers: { Authorization: `Bearer ${employeeInfo.token}` },
        //}
      );

      if (data) {
        navigate('/dashboard/categories');
      }
    } catch (err) {
      //toast.error(getError(err));
      console.log(err);
      //setIsCreating(false);
    }
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add Category
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row>
            <Col lg={6} md={6} sm={12}>
              <Form.Group className="mb-3" controlId="product-name">
                <Form.Label>Category Name</Form.Label>
                <Form.Control
                  type="product-name"
                  placeholder="Example: Mens Shoes "
                  onChange={(e) => setCategoryName(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>

            <Col lg={6} md={6} sm={12}>
              <Form.Group className="mb-3" controlId="slug">
                <Form.Label>Slug</Form.Label>
                <Form.Control
                  type="slug"
                  placeholder="Example: Mens-Shoes"
                  onKeyPress={(e) =>
                    e.key === ' ' ? e.preventDefault() : e.key
                  }
                  onChange={(e) => setSlug(e.target.value)}
                  required
                />
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
        </Form>
        <div className="mt-2 d-flex align-item-center justify-content-between">
          <Button type="submit" onClick={submitHandler}>
            Add Product
          </Button>
          <Button onClick={props.onHide}>Close</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
