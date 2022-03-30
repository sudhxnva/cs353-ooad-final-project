import { Routes, Route } from "react-router-dom";
import EmployeeList from "./EmployeeList";
import StartPage from "./StartPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<StartPage />} />
      <Route path="employees" element={<EmployeeList />} />
    </Routes>
  );
}
