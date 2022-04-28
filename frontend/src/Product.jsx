import { StarIcon } from "@heroicons/react/solid";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

import NotFound from "./NotFound";
import { getPriceString } from "./util/getPriceString";
import ReviewModal from "./ReviewModal";

const reviews = { href: "#", average: 4, totalCount: 117 };

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Product() {
  const [product, setProduct] = useState();
  const [loading, setLoading] = useState(false);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);

  const { id } = useParams();

  let user = localStorage.getItem("minimalUser");
  if (user) user = JSON.parse(user);

  const addToCart = async () => {
    try {
      await axios.post("http://localhost:8080/cart", {
        userId: user.id,
        lineItem: {
          quantity: 1,
          product,
        },
      });
      toast.success("Product added to cart");
    } catch (error) {
      console.log(error);
      toast.error("Unable to add product to cart, try again later");
    }
  };

  useEffect(() => {
    const run = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `http://localhost:8080/products/${id}`
        );
        setLoading(false);
        setProduct(data);
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
    };

    run();
  }, [id]);

  if (loading) return null;
  if (!product) return <NotFound />;

  return (
    <div className="bg-white">
      <div className="pt-6">
        <nav aria-label="Breadcrumb">
          <ol className="max-w-2xl mx-auto px-4 flex items-center space-x-2 sm:px-6 lg:max-w-7xl lg:px-8">
            <li>
              <div className="flex items-center">
                <a href="/" className="mr-2 text-sm font-medium text-gray-900">
                  Home
                </a>
                <svg
                  width={16}
                  height={20}
                  viewBox="0 0 16 20"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  className="w-4 h-5 text-gray-300"
                >
                  <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                </svg>
              </div>
            </li>
            <li className="text-sm">
              <a
                href={`products/${id}`}
                aria-current="page"
                className="font-medium text-gray-500 hover:text-gray-600"
              >
                {product.title}
              </a>
            </li>
          </ol>
        </nav>

        {/* Image gallery */}
        <div className="mt-6 max-w-2xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-3 lg:gap-x-8">
          <div className="hidden aspect-w-3 aspect-h-4 rounded-lg overflow-hidden lg:block">
            <img
              src={product.images[0]}
              alt="product"
              className="w-full h-full object-center object-cover"
            />
          </div>
          <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
            <div className="aspect-w-3 aspect-h-2 rounded-lg overflow-hidden">
              <img
                src={product.images[1]}
                alt="product"
                className="w-full h-full object-center object-cover"
              />
            </div>
            <div className="aspect-w-3 aspect-h-2 rounded-lg overflow-hidden">
              <img
                src={product.images[2]}
                alt="product"
                className="w-full h-full object-center object-cover"
              />
            </div>
          </div>
          <div className="aspect-w-4 aspect-h-5 sm:rounded-lg sm:overflow-hidden lg:aspect-w-3 lg:aspect-h-4">
            <img
              src={product.images[3]}
              alt="product"
              className="w-full h-full object-center object-cover"
            />
          </div>
        </div>

        {/* Product info */}
        <div className="max-w-2xl mx-auto pt-10 pb-16 px-4 sm:px-6 lg:max-w-7xl lg:pt-16 lg:pb-24 lg:px-8 lg:grid lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
              {product.title}
            </h1>
          </div>

          {/* Options */}
          <div className="mt-4 lg:mt-0 lg:row-span-3">
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl text-gray-900">
              {getPriceString(product.price)}
            </p>

            {/* Reviews */}
            <div className="mt-6">
              <h3 className="sr-only">Reviews</h3>
              <div className="flex items-center">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      className={classNames(
                        reviews.average > rating
                          ? "text-gray-900"
                          : "text-gray-200",
                        "h-5 w-5 flex-shrink-0"
                      )}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <p className="sr-only">{reviews.average} out of 5 stars</p>
                <a
                  href={reviews.href}
                  className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                >
                  {reviews.totalCount} reviews
                </a>
              </div>
            </div>

            <form className="mt-10">
              <button
                type="button"
                className="mt-10 w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400"
                onClick={() => addToCart()}
                disabled={!user}
              >
                {!user ? "Sign in to proceed" : "Add to bag"}
              </button>
            </form>
          </div>

          <div className="py-10 lg:pt-6 lg:pb-16 lg:col-start-1 lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            {/* Description and details */}
            <div>
              <h3 className="sr-only">Description</h3>

              <div className="space-y-6">
                <p className="text-base text-gray-900">{product.description}</p>
              </div>
            </div>

            <h3 className="text-2xl font-bold tracking-tight mt-10 text-gray-900">
              Reviews
            </h3>
            <div className="lg:flex flex-col justify-center w-full">
              {product.reviews.map((review, index) => (
                <div
                  className="lg:w-1/2 lg:mr-7 lg:mb-0 mt-7 mb-7 bg-white p-6 shadow rounded"
                  key={`${review.userId}-${index}`}
                >
                  <div className="flex items-center">
                    <div className="flex items-start justify-between w-full">
                      <div className="pl-3 w-full">
                        <div className="flex items-center">
                          {[0, 1, 2, 3, 4].map((rating) => (
                            <StarIcon
                              key={rating}
                              className={classNames(
                                reviews.average > rating
                                  ? "text-gray-900"
                                  : "text-gray-200",
                                "h-5 w-5 flex-shrink-0"
                              )}
                              aria-hidden="true"
                            />
                          ))}
                        </div>

                        <p className="text-sm leading-normal font-medium pt-2 text-gray-900 mb-2">
                          {review.userId ? review.username : "Anonymous"}
                        </p>
                        <p className="text-sm leading-normal  text-gray-500">
                          {review.reviewBody}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <div>
                <button
                  type="button"
                  className="mt-10 w-1/2 bg-gray-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:bg-gray-400"
                  onClick={() => setReviewModalOpen(true)}
                  disabled={!user}
                >
                  Add Review
                </button>
              </div>
              <ReviewModal
                open={reviewModalOpen}
                setOpen={setReviewModalOpen}
                user={user}
                productId={product.id}
                setProduct={setProduct}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
