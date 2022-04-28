import { Routes, Route } from "react-router-dom";
import About from "./About";
import HomePage from "./HomePage";
import ProductPage from "./Product";
import NavBar from "./NavBar";
import Checkout from "./Checkout";
import ThankYou from "./ThankYou";

export default function App() {
  return (
    <>
      <NavBar>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products/:id" element={<ProductPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/thankyou" element={<ThankYou />} />
        </Routes>
      </NavBar>
    </>
  );
}
