import { Routes, Route } from "react-router-dom";
import AddEmployee from "./AddEmployee";
import EmployeeList from "./EmployeeList";
import StartPage from "./StartPage";
import { ToastContainer } from "react-toastify";

export default function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="employees" element={<EmployeeList />} />
        <Route path="add" element={<AddEmployee />} />
      </Routes>
    </>
  );
}
