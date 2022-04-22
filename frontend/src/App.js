import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import HomePage from "./HomePage";

export default function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </>
  );
}
