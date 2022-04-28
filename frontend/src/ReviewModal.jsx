/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useState } from "react";
import axios from "axios";

export default function ReviewModal({
  open = false,
  setOpen,
  user,
  productId,
  setProduct,
}) {
  const cancelButtonRef = useRef(null);

  const [reviewBody, setReviewBody] = useState("");
  const [rating, setRating] = useState(1);

  const postReview = async () => {
    try {
      const { data } = await axios.post(
        `http://localhost:8080/products/${productId}/review`,
        {
          reviewBody,
          rating,
          username: user.username,
          userId: user.id,
        }
      );
      setProduct(data);
      setOpen(false);
    } catch (error) {
      alert("Error posting review. Try again later");
    }
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h1 className="text-3xl mb-5 font-bold tracking-tight text-gray-900">
                      Add Review
                    </h1>
                    <form>
                      <div className="mt-5">
                        <div className="mt-5">
                          <label
                            htmlFor="rating"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Rating
                          </label>
                          <select
                            id="rating"
                            name="rating"
                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={String(rating)}
                            onChange={(e) => setRating(Number(e.target.value))}
                          >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                          </select>
                        </div>
                        <div className="mt-5">
                          <label
                            htmlFor="review"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Review
                          </label>
                          <div className="mt-1">
                            <textarea
                              id="review"
                              name="review"
                              rows={3}
                              className="p-3 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                              placeholder="Great Product!"
                              value={reviewBody}
                              onChange={(e) => setReviewBody(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-50 pt-10 sm:flex sm:flex-row-reverse">
                        <button
                          type="button"
                          className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gray-600 text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:ml-3 sm:w-auto sm:text-sm"
                          onClick={postReview}
                        >
                          Post Review
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
