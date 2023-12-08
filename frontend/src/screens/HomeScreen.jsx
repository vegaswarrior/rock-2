import { Row, Col, Container, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useGetProductsQuery } from '../slices/productsApiSlice';
// import { Link } from 'react-router-dom';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
// import ProductCarousel from '../components/ProductCarousel';
import Meta from '../components/Meta';
import RideWave from '../assets/wave.svg'

const HomeScreen = () => {
  const { pageNumber, keyword } = useParams();

  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber,
  });

  return (
    <>
      <Container className='hero-container'>
        <Row>
          <Col md={6}>
             <img src={RideWave} className="waveRider" alt="" />
          </Col>
          <Col md={6}>
             <h1 className='text-white'>Welcome to Rocken My Vibe</h1>
             <Button className="btn btn-large btn-primary">Shop Now</Button>
          </Col>
        </Row>
       </Container>



      {/* {!keyword ? (
   
        <ProductCarousel />
      ) : (
        <Link to='/' className='btn btn-light mb-4'>
          Go Back
        </Link>
      )} */}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <Meta />
          <h1>Latest Products</h1>
          <Row>
            {data.products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={data.pages}
            page={data.page}
            keyword={keyword ? keyword : ''}
          />
        </>
      )}
    </>
  );
};

export default HomeScreen;
