import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import NavBarComp from "./components/NavbarComp";

function App() {
  return (
    <BrowserRouter>
      <NavBarComp />

      <main>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
