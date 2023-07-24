import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useEffect } from 'react';

export default function CenterModal(props) {
  const {
    categoryid,
    categoryimage,
    categoryname,
    categoryslug,
    editcategory,
    createcategory,
    deletecategory,
    ...modalProps
  } = props;

  const [slug, setSlug] = useState(categoryslug || '');
  const [categoryName, setCategoryName] = useState(categoryname || '');
  const [image, setImage] = useState(categoryimage || '');
  const [id, setId] = useState(categoryid || '');

  useEffect(() => {
    setSlug(categoryslug || '');
    setCategoryName(categoryname || '');
    setImage(categoryimage || '');
    setId(categoryid || '');
  }, [categoryslug, categoryname, categoryimage, categoryid]);

  return (
    <Modal
      {...modalProps}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.tabletitle}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row>
            <Col lg={6} md={6} sm={12}>
              <Form.Group className="mb-3" controlId="category-name">
                <Form.Label>Category Name</Form.Label>
                <Form.Control
                  type="category-name"
                  placeholder="Example: Mens Shoes"
                  value={categoryName}
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
                  value={slug}
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
                  required={'' ? false : true}
                />
              </Form.Group>
            </Col>
          </Row>
        </Form>
        <div className="mt-2 d-flex align-item-center justify-content-between">
          {props.action === 'update' ? (
            <div>
              <Button
                type="submit"
                onClick={() =>
                  props.editcategory(categoryName, slug, image, id)
                }
              >
                {props.modalbutton}
              </Button>
              <Button
                variant="danger"
                className="ms-4"
                type="submit"
                onClick={() => props.deletecategory(id)}
              >
                Delete
              </Button>
            </div>
          ) : (
            <Button
              type="submit"
              onClick={() => props.createcategory(categoryName, slug, image)}
            >
              {props.modalbutton}
            </Button>
          )}
          <Button onClick={props.onHide}>Close</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
