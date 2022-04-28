import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import lottie from "lottie-web";
import orderPlaced from "./order-placed.json";

import { getPriceString } from "./util/getPriceString";

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

export default function ThankYou() {
  const query = useQuery();
  const orderId = query.get("orderId");

  const [orders, setOrders] = useState([]);

  let user = localStorage.getItem("minimalUser");
  if (user) user = JSON.parse(user);

  useEffect(() => {
    const getOrders = async () => {
      lottie.loadAnimation({
        container: document.querySelector("#logo"),
        animationData: orderPlaced,
        renderer: "svg", // "canvas", "html"
        loop: false, // boolean
        autoplay: true, // boolean
      });
      const { data } = await axios.get(
        `http://localhost:8080/orders/${user.id}`
      );
      setOrders(data);
      console.log(data);
    };

    if (user) getOrders();
  }, []);

  const handleDelete = async (order) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:8080/orders/${order.id}`
      );
      toast.success(`Order deleted!`);
      setOrders(data);
    } catch (error) {
      console.log(error);
      toast.error("Error deleting order. Try again later");
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-16 px-4 sm:py-12 sm:px-6 lg:max-w-7xl lg:px-8">
      {orderId && (
        <>
          <div className="flex flex-row items-center mb-2">
            <div id="logo" className="mr-2 w-20 h-20"></div>
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
              Thank you!
            </h1>
          </div>

          <div className="text-2xl font-thin tracking-tight text-gray-600">
            Your #
            {orderId.slice(orderId.length - 4, orderId.length).toUpperCase()}{" "}
            order has been placed
          </div>
        </>
      )}

      <h1 className="text-3xl mt-20 mb-2 font-extrabold tracking-tight text-gray-900">
        Your Orders
      </h1>

      <div className="lg:flex flex-col items-center justify-center w-full">
        {orders.map((order) => (
          <div
            className="lg:w-1/2 lg:mr-7 lg:mb-0 mt-7 mb-7 bg-white p-6 shadow rounded"
            key={order.id}
          >
            <div className="flex items-center">
              <img
                src={order.lineItems[0].product.images[0]}
                className="w-12 h-12 rounded-full flex flex-shrink-0"
              />
              <div className="flex items-start justify-between w-full">
                <div className="pl-3 w-full">
                  <p className="text-xl font-medium leading-5 text-gray-800">
                    <span className="text-gray-400">#{order.id}</span>
                  </p>
                  <p className="text-sm leading-normal pt-2 text-gray-500">
                    Amount: {getPriceString(order.totalCost)}
                  </p>
                </div>
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400 hover:text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    onClick={() => handleDelete(order)}
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
  );
}
