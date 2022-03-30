import { useEffect, useState } from "react";

export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const res = await fetch("http://localhost:8080/employees");
      const json = await res.json();
      setEmployees(json);
    };
    getData();
  }, []);

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
