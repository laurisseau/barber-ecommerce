import Container from 'react-bootstrap/Container';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useQuery } from 'react-query';
import axios from 'axios';
import LoadingBox from '../components/LoadingBox';
import { Link as ScrollLink, Element } from 'react-scroll';

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
            <h1 style={{ fontSize: '60px', fontWeight: '700' }}>
              Simply dummy text
            </h1>
            <h4 className="mt-4 mb-5">New Deals Every Day</h4>
            <ScrollLink
              to="section1"
              smooth={true}
              className="header-btn pointer"
            >
              Shop Now
            </ScrollLink>
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
              Lorem Ipsum has been the industry's standard dummy text
            </h2>
            <p>Limited Time Florida Deals</p>
            <h5 style={{ fontWeight: '450' }} className="mb-4">
              fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
              proident, sunt in culpa qui officia deserunt mollit anim id est
              laborum.
            </h5>
            <ScrollLink
              to="section1"
              smooth={true}
              className="body-btn pointer"
            >
              Shop Now
            </ScrollLink>
          </div>

          <img
            alt="hair product"
            className="responsive"
            style={{ borderRadius: '100%', height: '350px', width: '360px' }}
            src="https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
          ></img>
        </div>

        <Element name="section1">
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
                        className="category-box shadow"
                      ></img>
                      <div className="overlay">
                        <h2 className="projectedText">{category.slug}</h2>
                      </div>
                    </a>
                  </div>
                ))
              ) : (
                <div></div>
              )}
            </Carousel>
          </div>
        </Element>
      </Container>
    </>
  );
}
