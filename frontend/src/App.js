import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Cart from "./Cart";
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
          <Route path="cart" element={<Cart />} />
        </Routes>
      </NavBar>
    </>
  );
}
