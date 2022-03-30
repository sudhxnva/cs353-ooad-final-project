import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      const res = await fetch("http://localhost:8080/employees");
      const json = await res.json();
      setEmployees(json);
    };
    getData();
  }, []);

  const handleUpdate = (employee) => {
    navigate("/add", { state: employee });
  };

  return (
    <div className="py-8 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Employees
          </h2>
          <div className="lg:flex flex-col items-center justify-center w-full">
            {employees.map((e) => (
              <div className="lg:w-4/12 lg:mr-7 lg:mb-0 mt-7 mb-7 bg-white p-6 shadow rounded">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-300 rounded-full flex flex-shrink-0" />
                  <div className="flex items-start justify-between w-full">
                    <div className="pl-3 w-full">
                      <p className="text-xl font-medium leading-5 text-gray-800">
                        <span className="text-gray-400">#{e.id}</span> {e.name}
                      </p>
                      <p className="text-sm leading-normal pt-2 text-gray-500">
                        {e.role}
                      </p>
                    </div>
                    <div className="mr-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                        onClick={() => {
                          handleUpdate(e);
                        }}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                        />
                      </svg>
                    </div>
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-400 hover:text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
