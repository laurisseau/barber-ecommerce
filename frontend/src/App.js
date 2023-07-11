import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from 'react-query';
import HomeScreen from './screens/HomeScreen';
import ProductsScreen from './screens/ProductsScreen';
import NavBarComp from './components/NavbarComp';
import Container from 'react-bootstrap/Container';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import SignupScreen from './screens/SignupScreen';
import ShippingAddressScreen from './screens/shippingAddressScreen';
import PaymentScreen from './screens/PaymentScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import OrderScreen from './screens/OrderScreen'
import OTPScreen from './screens/OTPScreen';
import ProfileScreen from './screens/ProfileScreen';
import UpdateEmailScreen from './screens/UpdateEmailScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import ResetPasswordScreen from './screens/ResetPasswordScreen';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <NavBarComp />

        <main>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/:slug" element={<ProductsScreen />} />
            <Route path="/product/:slug" element={<ProductScreen />} />
            <Route path="/shipping" element={<ShippingAddressScreen />} />
            <Route path="/cart" element={<CartScreen />} />
            <Route path="/payment" element={<PaymentScreen />} />
            <Route path="/orderhistory" element={<OrderHistoryScreen />} />
            <Route path="/order/:id" element={<OrderScreen />} />
            <Route path="/signin" element={<SigninScreen />} />
            <Route path="/signup" element={<SignupScreen />} />
            <Route path="signup/otp/:jwt" element={<OTPScreen />} />
            <Route path="/updateemail/:encodedEmail" element={<UpdateEmailScreen/>}/>
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/forgotpassword" element={<ForgotPasswordScreen />} />
            <Route path="/resetPassword/:token" element={<ResetPasswordScreen/>}/>
          </Routes>
        </main>

        <footer
          className="mt-5"
          style={{
            backgroundColor: '#252525',
            height: '170px',
            color: 'white',
          }}
        >
          <Container
            className="d-flex justify-content-md-between align-items-center flex-wrap justify-content-center"
            style={{ height: '100%' }}
          >
            <div>
              <h1 style={{ fontSize: '18px' }}>© 2023 Lawn Service</h1>
              <p>Icon by www.wishforge.games on freeicons.io</p>
              <a
                style={{ color: 'white' }}
                href="https://www.instagram.com/yardi_kitchen/"
              >
                <i
                  className="fa-brands fa-instagram"
                  style={{ fontSize: '30px' }}
                ></i>
              </a>
            </div>

            <div>
              <h1 style={{ fontSize: '18px' }}>
                WEB DESIGN BY LAURISSEAU JOSEPH
              </h1>
            </div>
          </Container>
        </footer>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
