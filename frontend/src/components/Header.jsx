import { Navbar, Nav, Container, NavDropdown, Badge } from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import SearchBox from './SearchBox';
// import logo from '../assets/RockenMyVibeLogo.svg';
import { resetCart } from '../slices/cartSlice';

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      // NOTE: here we need to reset cart state for when a user logs out so the next
      // user doesn't inherit the previous users cart and shipping
      dispatch(resetCart());
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header>
      <Navbar className='navbar-1' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          {/* <LinkContainer to='/'>
            <Navbar.Brand>
              <img src={logo} className='rocken-logo' alt='ProShop' />
              <span className="nav-text">Rocken My Vibe</span>
            </Navbar.Brand>
          </LinkContainer> */}
          <LinkContainer to='/'>
            <Navbar.Brand>
              
              <span className="nav-text text-white">Home</span>
            </Navbar.Brand>
          </LinkContainer>
          <LinkContainer to='/'>
            <Navbar.Brand>
              
              <span className="nav-text text-white">Our Story</span>
            </Navbar.Brand>
          </LinkContainer>
          <LinkContainer to='/'>
            <Navbar.Brand>
              <span className="nav-text text-white">Shop</span>
            </Navbar.Brand>
          </LinkContainer>
          <LinkContainer to='/'>
            <Navbar.Brand>
              <span className="nav-text text-white">Contact</span>
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              <SearchBox />
              <LinkContainer to='/cart'>
                <Nav.Link>
                  <FaShoppingCart /> <span className="nav-text">Cart</span>
                  {cartItems.length > 0 && (
                    <Badge pill bg='success' style={{ marginLeft: '5px' }}>
                      {cartItems.reduce((a, c) => a + c.qty, 0)}
                    </Badge>
                  )}
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <>
                  <NavDropdown className="nav-text" title={userInfo.name} id='username'>
                    <LinkContainer to='/profile'>
                      <NavDropdown.Item><span className="nav-text">Profile</span></NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>
                    <span className="nav-text">Logout</span>
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <LinkContainer className="nav-text" to='/login'>
                  <Nav.Link>
                    <FaUser /> <span className="nav-text">Sign In</span>
                  </Nav.Link>
                </LinkContainer>
              )}

              {/* Admin Links */}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown  title='Admin' id='adminmenu'>
                  <LinkContainer to='/admin/productlist'>
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/orderlist'>
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/userlist'>
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
