import { useNavigate, useParams } from 'react-router-dom';
import { useContext } from 'react';
import { Store } from '../Store';
import Badge from 'react-bootstrap/Badge';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/esm/Button';
import { Helmet } from 'react-helmet-async';
import Container from 'react-bootstrap/esm/Container';

export default function ProductScreen() {
  const navigate = useNavigate();
  const params = useParams();
  const { slug } = params;

  console.log(slug)
  /*
    const [{ loading, error, product }, dispatch] = useReducer(reducer, {
      loading: true,
      error: '',
      product: [],
    });

    //const [products, setProducts] = useState([]);
    
    useEffect(() => {
      const fetchData = async () => {
        dispatch({ type: 'FETCH_REQUEST' });
        try {
          const result = await axios.get(`/api/products/slug/${slug}`);
          dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
        } catch (err) {
          dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
        }
        //setProducts(result.data);
      };
      fetchData();
    }, [slug]);
    */

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart } = state;
  /*
    const addToCartHandler = async () => {
      const existItem = cart.cartItems.find((x) => x._id === product._id);
      const quantity = existItem ? existItem.quantity + 1 : 1;
      //const { data } = await axios.get(`/api/products/${product._id}`);
      if (data.countInStock < quantity) {
        window.alert('Sorry. product out of stock');
        return;
      }
      ctxDispatch({
        type: 'CART_ADD_ITEM',
        payload: { ...product, quantity },
      });
      navigate('/cart');
    };
*/

  const product = {
    name: 'Puffco Hot Knife - Black',
    slug: 'puffco-hot-knife-black',
    image:
      'https://shop.trulieve.com/media/catalog/product/cache/cecb1a5ae73afe0e11b93309dfcfeb11/m/i/microsoftteams-image_47_.png',
    category: 'vape',
    description:
      'Cultivar is a premium line of craft cannabis and is the result of meticulously pheno-hunting ideal potencies, terpene profiles, and aesthetics. With Cultivar, we put the utmost focus to our flower with a unique process deisgned to produce the highest quality. A low, slow dry ensures maximum cannabinoid and terpene preservation and gentle hand-trimming helps retain them. Our cultivators devote personal, hands-on care to each individual plant. At every point in the lifecycle, there is an essential and direct human element ensuring Cultivar exceeds the highest possible standards.',
    price: '20.00',
    countInStock: '3',
  };

  return (
    <Container className="mt-5 mb-5  ">
      <Row>
        <Col lg={6} md={5}>
          <div className="">
            <img
              className=""
              src={product.image}
              alt={product.name}
              style={{ height: '500px', width: '100%' }}
            ></img>
          </div>
        </Col>

        <Col>
          <div className="" style={{ maxWidth: '500px', minWidth: '300px' }}>
            <Helmet>
              <title>{product.name}</title>
            </Helmet>

            <div>
              <h1>{product.name}</h1>
            </div>

            <div className="d-flex border-bottom mb-4 pb-2 mt-4">
              <h2 style={{ fontWeight: '400' }}>Price : ${product.price}</h2>
              {product.countInStock > 0 ? (
                <Badge bg="success pt-2 ms-4 mt-2 mb-2">In Stock</Badge>
              ) : (
                <Badge bg="danger pt-2 ms-4 mt-2 mb-2">Unavailable</Badge>
              )}
            </div>

            {product.countInStock > 0 && (
              <div>
                <div className="d-grid">
                  <Button variant="primary mb-3" style={{width:"170px"}}>Add to Cart</Button>
                </div>
              </div>
            )}

            <div>
              <p className='p-2'>{product.description}</p>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
