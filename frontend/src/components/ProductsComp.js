import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { Store } from '../Store';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
//import axios from 'axios';

export default function ProductScreen(props) {
  //  console.log(product.slug)
  /*
    const products = [
      {
        name: 'Puffco Hot Knife - Black',
        slug: 'puffco-hot-knife-black',
        image: "https://shop.trulieve.com/media/catalog/product/cache/cecb1a5ae73afe0e11b93309dfcfeb11/m/i/microsoftteams-image_47_.png",
        category: "vape",
        description: "its a good vape",
        price: "$20.00",
        countInStock: "3"
      },
      {
        name: 'TruClear Concentrate Syringe CDT 1G - MMS',
        slug: 'finp-truclearsyringe850mg-co2-mimosa',
        image: "https://shop.trulieve.com/media/catalog/product/cache/cecb1a5ae73afe0e11b93309dfcfeb11/t/r/truclear_sativa_1_1_2_1_2.png",
        category: "Concentrates",
        description: "its a good concentrate",
        price: "$70.00",
        countInStock: "1"
      },
      {
        name: 'TruFlower 3.5G - MBU',
        slug: 'tru-flower-3-5g-magicbus-h-fl',
        image: "https://shop.trulieve.com/media/catalog/product/cache/cecb1a5ae73afe0e11b93309dfcfeb11/2/0/2023_04_12_trulieve_strains_website_8_magic-bus.png",
        category: "Flowers",
        description: "its a good flower",
        price: "$50.00",
        countInStock: "2"
      },
      {
        name: 'Dad Grass - THC PREROLL',
        slug: 'epic-vapor-dad-grass-thc-preroll',
        image: "https://images.unsplash.com/photo-1626034833021-a9c99c0e0b04?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80",
        category: "Pre-roll",
        description: "its a good pre-roll",
        price: "$80.00",
        countInStock: "2"
      },
    ];
*/

  const { product } = props;

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const addToCartHandler = async (item) => {
    const existItem = cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    //const { data } = await axios.get(`/api/products/${item._id}`);
    /*
      if (data.countInStock < quantity) {
        window.alert('Sorry. product out of stock');
        return;
      }
      ctxDispatch({
        type: 'CART_ADD_ITEM',
        payload: { ...item, quantity },
      });
      */
  };

  return (
    <div style={{}} className="mb-5 custom-card ">
      <Link to={`/product/${product.slug}`}>
        <img src={product.image} className="card-img " alt={product.name} />
      </Link>
      <div className="card-body p-2">
        <div>
          <Link to={`/product/${product.slug}`}>
            <Card.Title>{product.name}</Card.Title>
          </Link>
          <Card.Text>${product.price}</Card.Text>
        </div>
        {product.countInStock === 0 ? (
          <Button variant="light" disabled>
            Out of stock
          </Button>
        ) : (
          <Button onClick={() => addToCartHandler(product)}>
            {' '}
            Add to cart{' '}
          </Button>
        )}
      </div>
    </div>
  );
}
