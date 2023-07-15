import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from 'react-query';
import { useContext } from 'react';
import HomeScreen from './screens/HomeScreen';
import ProductsScreen from './screens/ProductsScreen';
import NavBarComp from './components/NavbarComp';
import FooterComp from './components/FooterComp';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import SignupScreen from './screens/SignupScreen';
import ShippingAddressScreen from './screens/shippingAddressScreen';
import PaymentScreen from './screens/PaymentScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import OrderScreen from './screens/OrderScreen';
import OTPScreen from './screens/OTPScreen';
import ProfileScreen from './screens/ProfileScreen';
import UpdateEmailScreen from './screens/UpdateEmailScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import ResetPasswordScreen from './screens/ResetPasswordScreen';
import { Store } from './Store';
import DashboardScreen from './screens/DashboardScreen';
import AdminOrderScreen from './screens/AdminOrderScreen';
import AdminCustomerScreen from './screens/AdminCustomerScreen';
import AdminProductScreen from './screens/AdminProductScreen';
import AdminCategoryScreen from './screens/AdminCategoryScreen';

const queryClient = new QueryClient();

function App() {
  const { state } = useContext(Store);
  const { userInfo } = state;

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ToastContainer position="bottom-center" autoClose={1000} />
        {userInfo && userInfo['custom:role'] === 'admin' ? (
          <div>
            <main>
              <Routes>
                <Route path="/dashboard" element={<DashboardScreen />} />
                <Route path="/dashboard/orders" element={<AdminOrderScreen />} />
                <Route path="/dashboard/products" element={<AdminProductScreen />} />
                <Route path="/dashboard/categories" element={<AdminCategoryScreen />} />
                <Route path="/dashboard/customers" element={<AdminCustomerScreen/>}/>
              </Routes>
            </main>
          </div>
        ) : (
          <div>
            <NavBarComp />
            <main className='min-vh-100'>
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
                <Route
                  path="/updateemail/:encodedEmail"
                  element={<UpdateEmailScreen />}
                />
                <Route path="/profile" element={<ProfileScreen />} />
                <Route
                  path="/forgotpassword"
                  element={<ForgotPasswordScreen />}
                />
                <Route
                  path="/resetPassword/:token"
                  element={<ResetPasswordScreen />}
                />
              </Routes>
            </main>
            <FooterComp />
          </div>
        )}
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
