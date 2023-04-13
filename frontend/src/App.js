import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import NavBarComp from "./components/NavbarComp";
import Container from "react-bootstrap/Container";

function App() {
  return (
    <BrowserRouter>
      <NavBarComp />

      <main>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
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
  );
}

export default App;
