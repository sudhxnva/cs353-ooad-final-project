import { Link } from "react-router-dom";

export default function StartPage() {
  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
            CS353 OOAD with Java
          </h2>
          <p className="mt-4 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Spring MVC Project
          </p>
          <p className="mt-2 max-w-2xl text-m text-gray-500 lg:mx-auto">
            Sudhanva M | PES2UG19CS410 | Section G
          </p>
        </div>
      </div>
      <div className="mt-20 flex items-center justify-center">
        <div
          className="inline-flex shadow-md hover:shadow-lg focus:shadow-lg"
          role="group"
        >
          <Link
            to="/employees"
            className="rounded-l inline-block px-7 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm leading-snug uppercase hover:bg-indigo-700 focus:bg-indigo-700 focus:outline-none focus:ring-0 active:bg-indigo-800 transition duration-150 ease-in-out"
          >
            View Employees
          </Link>
          {/* <button
            type="button"
            className="inline-block px-7 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm leading-snug uppercase hover:bg-indigo-700 focus:bg-indigo-700 focus:outline-none focus:ring-0 active:bg-indigo-800 transition duration-150 ease-in-out"
          >
            Add Employee
          </button> */}
          <Link
            to="/add"
            className="rounded-r inline-block px-7 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm leading-snug uppercase hover:bg-indigo-700 focus:bg-indigo-700 focus:outline-none focus:ring-0 active:bg-indigo-800 transition duration-150 ease-in-out"
          >
            Add Employee
          </Link>
        </div>
      </div>
    </div>
  );
}
