export default function EmployeeList() {
  return (
    <div className="py-8 w-full">
      <div className="lg:flex flex-col items-center justify-center w-full">
        <div className="lg:w-4/12 lg:mr-7 lg:mb-0 mt-7 mb-7 bg-white p-6 shadow rounded">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gray-300 rounded-full flex flex-shrink-0" />
            <div className="flex items-start justify-between w-full">
              <div className="pl-3 w-full">
                <p className="text-xl font-medium leading-5 text-gray-800">
                  John Doe
                </p>
                <p className="text-sm leading-normal pt-2 text-gray-500">
                  General Manager
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
