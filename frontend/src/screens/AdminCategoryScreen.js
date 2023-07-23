import AdminNavbar from '../components/AdminNavbar.js';
import TableComp from '../components/TableComp.js';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useQuery } from 'react-query';
import axios from 'axios';
import LoadingBox from '../components/LoadingBox';
import Badge from 'react-bootstrap/Badge';
import { useState, useEffect } from 'react';
import CenterModal from '../components/CenterModal.js';
import { toast } from 'react-toastify';
import { getError } from '../utils';
//import { useQueryClient, useMutation } from 'react-query';

export default function AdminCategoryScreen() {
  const tableRows = ['_id', 'image', 'name', 'slug', 'edit'];
  const [modalShow, setModalShow] = useState(false);
  const [id, setId] = useState('');
  const [slug, setSlug] = useState('');
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [categoryDataId, setCategoryDataId] = useState(null);
  const [categoryData, setCategoryData] = useState({});

  const GetData = async (id) => {
    try {
      const { data } = await axios.get(`/api/categories/category/${id}`);
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await GetData(id);
      setCategoryDataId(data);
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    if (categoryDataId) {
      setSlug(categoryDataId.slug || '');
    }
    if (categoryDataId) {
      setName(categoryDataId.name || '');
    }
    if (categoryDataId) {
      setImage(categoryDataId.image || '');
    }
  }, [categoryDataId]);

  const { isLoading: isLoadingCategoryData } = useQuery(
    'categoryData',
    async () => {
      const response = await axios.get('/api/categories/');
      setCategoryData(response.data);
    }
  );

  if (isLoadingCategoryData) {
    return (
      <div className="d-flex justify-content-center mb-5 mt-5">
        <LoadingBox />
      </div>
    );
  }

  const editCategory = async (categoryName, slug, image, id) => {
    try {
      const formData = new FormData();

      formData.append('name', categoryName);
      formData.append('slug', slug);
      formData.append('image', image);

      const { data } = await axios.put(
        `/api/categories/updateCategory/${id}`,
        formData
        //, {
        // headers: { Authorization: `Bearer ${employeeInfo.token}` },
        //}
      );

      setModalShow(false);

      const updatedData = categoryData.map((oldData) =>
        oldData._id === data._id ? data : oldData
      );

      setCategoryData(updatedData);
    } catch (err) {
      toast.error(getError(err));
      console.log(err);
    }
  };

  const createCategory = async (categoryName, slug, image) => {
    try {
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

      console.log(data);
    } catch (err) {
      toast.error(getError(err));
      console.log(err);
    }
  };

  const filteredData = (data) => {
    const filterArr = [];

    if (data.length === 0) {
      return data;
    }

    for (let j = 0; j <= data.length - 1; j++) {
      const categoryData = data[j];

      filterArr.push({
        _id: categoryData._id,
        image: [
          <img
            key={j}
            src={categoryData.image}
            alt=""
            style={{ width: '45px', height: '45px' }}
            className="rounded-circle"
          />,
        ],
        name: categoryData.name,
        slug: categoryData.slug,
        edit: [
          <div key={j}>
            <Badge
              bg="primary"
              onClick={() => {
                setModalShow(true);
                setId(categoryData._id);
              }}
              className="p-2 pointer"
            >
              Edit
            </Badge>
          </div>,
        ],
      });
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
        {categoryData ? (
          <TableComp
            title={`All Categories`}
            tableRows={tableRows}
            data={filteredData(categoryData)}
            rowsPerPage={5}
            search={true}
            addBar={'true'}
            tableTitle={'Add Category'}
            modalButton={'Add Category'}
            createcategory={createCategory}
            action={'create'}
          />
        ) : (
          <TableComp
            title={`All Categories`}
            tableRows={tableRows}
            search={true}
            addBar={'true'}
            tableTitle={'Add Category'}
            modalButton={'Add Category'}
            action={'create'}
          />
        )}
      </Col>
      <CenterModal
        categoryimage={image}
        categoryname={name}
        categoryslug={slug}
        categoryid={id}
        show={modalShow}
        tabletitle={'Edit Category'}
        modalbutton={'Edit Category'}
        onHide={() => setModalShow(false)}
        editcategory={editCategory}
        action={'update'}
      />
    </Row>
  );
}
