import { useState, useEffect } from "react";
import TextField from "./TextField";
import { getPriceString } from "./util/getPriceString";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { toast } from "react-toastify";

export default function Checkout() {
  const [address, setAddress] = useState("");
  const [total, setTotal] = useState(0.0);
  const [cartId, setCartId] = useState();

  const navigate = useNavigate();

  let user = localStorage.getItem("minimalUser");
  if (user) user = JSON.parse(user);

  const getCart = async () => {
    const { data } = await axios.get(`http://localhost:8080/cart/${user.id}`);
    setCartId(data.id);
    setTotal(data.totalCost);
  };

  useEffect(() => {
    if (user) getCart();
  }, []);

  const placeOrder = async () => {
    const date = new Date();
    date.setDate(date.getDate() + 2);

    try {
      const { data } = await axios.post(
        `http://localhost:8080/orders/${cartId}`,
        {
          address,
          deliveryDate: date.toISOString(),
        }
      );
      console.log(data);
      navigate(`/thankyou?orderId=${data.id}`);
    } catch (error) {
      console.log(error);
      toast.error("Error placing an order. Try again later");
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-16 px-4 sm:py-12 sm:px-6 lg:max-w-7xl lg:px-8">
      <h1 className="text-4xl mb-10 font-extrabold tracking-tight text-gray-900">
        Checkout
      </h1>

      <div className="mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Address
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                Use an address where you can receive mail.
              </p>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form>
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        First name
                      </label>
                      <TextField
                        type="text"
                        name="first-name"
                        id="first-name"
                        autoComplete="given-name"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="last-name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Last name
                      </label>
                      <TextField
                        type="text"
                        name="last-name"
                        id="last-name"
                        autoComplete="family-name"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-4">
                      <label
                        htmlFor="email-address"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email address
                      </label>
                      <TextField
                        type="text"
                        name="email-address"
                        id="email-address"
                        autoComplete="email"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Country
                      </label>
                      <select
                        id="country"
                        name="country"
                        autoComplete="country-name"
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                      >
                        <option>India</option>
                      </select>
                    </div>

                    <div className="col-span-6">
                      <label
                        htmlFor="street-address"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Street address
                      </label>
                      <TextField
                        type="text"
                        name="street-address"
                        id="street-address"
                        autoComplete="street-address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="mt-10 flex justify-end flex-col items-end">
        <div className="text-xl mt-2 font-light tracking-tight text-gray-500">
          Sub-Total:{" "}
          <span className="font-normal text-gray-900">
            {getPriceString(total)}
          </span>
        </div>
        <div className="text-xl mt-2 font-light tracking-tight text-gray-500">
          Taxes:{" "}
          <span className="font-normal text-gray-900">
            {getPriceString(total * 0.18)}
          </span>
        </div>
        <div className="text-xl mt-2 font-normal tracking-tight text-gray-500">
          Total:{" "}
          <span className="font-bold text-gray-900">
            {getPriceString(total * 1.18)}
          </span>
        </div>

        <button
          onClick={placeOrder}
          className="flex items-center justify-center rounded-md border border-transparent bg-gray-600 mt-10 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-gray-700"
        >
          Place Order
        </button>
      </div>
    </div>
  );
}
