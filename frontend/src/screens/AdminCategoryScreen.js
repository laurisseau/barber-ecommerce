import AdminNavbar from '../components/AdminNavbar.js';
import TableComp from '../components/TableComp.js';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useQuery } from 'react-query';
import axios from 'axios';
import LoadingBox from '../components/LoadingBox';

export default function AdminCategoryScreen() {
    const tableRows = ['_id', 'image', 'name', 'slug', 'edit'];
  
    const { isLoading: isLoadingCategoryData, data: categoryData } = useQuery(
      'categoryData',
      async () => {
        return await axios.get('/api/categories/');
      }
    );

    //console.log(productData)
  
    if (isLoadingCategoryData) {
      return (
        <div className="d-flex justify-content-center mb-5 mt-5">
          <LoadingBox />
        </div>
      );
    }
  
    const filteredData = (data) => {
      const filterArr = [];
  
      if (data.length === 0) {
        return data ;
      }
  
      for (let j = 0; j <= data.length - 1; j++) {
        const categoryData = data[j];
  
        filterArr.push({
          _id: categoryData._id,
          image: categoryData.image,
          name: categoryData.name,
          slug: categoryData.slug,
          edit: 'Remove'
        });
    
      }
  
      return filterArr;
    };
  // add add bar
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
              data={filteredData(categoryData.data)}
              rowsPerPage={5}
              search={true}
            />
          ) : (
            <TableComp
              title={`All Categories`}
              tableRows={tableRows}
              search={true}
            />
          )}
        </Col>
      </Row>
    );
  }