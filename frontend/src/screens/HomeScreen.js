import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useQuery } from 'react-query';
import axios from 'axios';
import LoadingBox from '../components/LoadingBox';

export default function HomeScreen() {
  const { isLoading, data } = useQuery('categories', async () => {
    return await axios.get('/api/categories/');
  });

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center mb-5 mt-5">
        <LoadingBox />
      </div>
    );
  }

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 1, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
      slidesToSlide: 1, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 960, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  return (
    <>
      <header
        className="background-img"
        style={{
          height: '600px',
          backgroundSize: '100% 100%',
          color: 'white',
        }}
      >
        <Container
          className="d-flex align-items-center"
          style={{ maxWidth: '1140px', height: '100%' }}
          fluid
        >
          <div className="ms-3">
            <h1 style={{ fontSize: '60px', fontWeight: '700' }}>420 for All</h1>
            <h4 className="mt-4 mb-5">New Deals Every Day</h4>
            <Link to="/" className="header-btn">
              Shop Now
            </Link>
          </div>
        </Container>
      </header>

      <Container style={{ maxWidth: '1140px', height: '100%' }} fluid>
        <div className="mt-5 mb-3 d-flex align-items-center flex-wrap-reverse justify-content-lg-between  justify-content-md-center justify-content-sm-center">
          <div
            className="first-body-text mt-5 mb-5 m-3"
            style={{ height: '100%', width: '500px' }}
          >
            <h2 style={{ fontWeight: '700', fontSize: '40px' }}>
              Save on Khalifa Kush, Love’s Oven, Bhang and Trekkers
            </h2>
            <p>Limited Time Florida Deals</p>
            <h5 style={{ fontWeight: '450' }}>
              Puff like a Rock Star with KK at just $40. Get Baked with Big
              savings on Bhang and Love’s Oven Edibles. Explore a little further
              with $15 Trekkers.
            </h5>
            <button href="/" className="body-btn mt-4">
              Shop Now
            </button>
          </div>

          <img
            alt="hair product"
            className="responsive"
            style={{ borderRadius: '100%', height: '350px', width: '400px' }}
            src="https://images.unsplash.com/photo-1630082900894-edbd503588f7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
          ></img>
        </div>

        <div className="text-center mb-5 " style={{ height: '500px' }}>
          <h1 className="mb-5">Our Categories</h1>

          <Carousel
            swipeable={true}
            responsive={responsive}
            infinite={true}
            partialVisible={true}
          >
            {data ? (
              data.data.map((category) => (
                <div key={category._id}>
                  <a href={`/${category.slug}`}>
                    <img
                      alt="category"
                      src={category.image}
                      className="category-box "
                    ></img>
                    <div class="overlay">
                      <h2 class="projectedText">{category.slug}</h2>
                    </div>
                  </a>
                </div>
              ))
            ) : (
              <div></div>
            )}
          </Carousel>
        </div>
      </Container>
    </>
  );
}
