import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {QueryClientProvider, QueryClient} from 'react-query'
import HomeScreen from "./screens/HomeScreen";
import ProductsScreen from "./screens/ProductsScreen";
import NavBarComp from "./components/NavbarComp";
import Container from "react-bootstrap/Container";
import ProductScreen from "./screens/ProductScreen"
import CartScreen from "./screens/CartScreen";
import SigninScreen from "./screens/SigninScreen";
import SignupScreen from "./screens/SignupScreen";
import ShippingAddressScreen from "./screens/shippingAddressScreen"
import PaymentScreen from "./screens/PaymentScreen";


const queryClient = new QueryClient()

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
          <Route path="/payment" elements={<PaymentScreen/>} />
          <Route path='/cart' element={<CartScreen/>}/>
          <Route path='/signin' element={<SigninScreen/>}/>
          <Route path='/signup' element={<SignupScreen/>}/>
        </Routes>
      </main>

      <footer
        style={{ backgroundColor: "#252525", height: "170px", color: "white" }}
      >
        <Container
          className="d-flex justify-content-md-between align-items-center flex-wrap justify-content-center"
          style={{ height: "100%" }}
        >
          <div>
            <h1 style={{ fontSize: "18px" }}>© 2023 Lawn Service</h1>
            <p>Icon by www.wishforge.games on freeicons.io</p>
            <a
              style={{ color: "white" }}
              href="https://www.instagram.com/yardi_kitchen/"
            >
              <i
                className="fa-brands fa-instagram"
                style={{ fontSize: "30px" }}
              ></i>
            </a>
          </div>

          <div>
            <h1 style={{ fontSize: "18px" }}>
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
