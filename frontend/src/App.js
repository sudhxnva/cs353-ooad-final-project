import { Routes, Route } from "react-router-dom";
import About from "./About";
import HomePage from "./HomePage";
import ProductPage from "./Product";
import NavBar from "./NavBar";

export default function App() {
  return (
    <>
      <NavBar>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products/:id" element={<ProductPage />} />
          <Route path="about" element={<About />} />
        </Routes>
      </NavBar>
    </>
  );
}
