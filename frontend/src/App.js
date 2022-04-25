import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import About from "./About";
import HomePage from "./HomePage";
import ProductPage from "./Product";
import NavBar from "./NavBar";

export default function App() {
  return (
    <>
      <NavBar>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products/:id" element={<ProductPage />} />
          <Route path="about" element={<About />} />
        </Routes>
      </NavBar>
    </>
  );
}
