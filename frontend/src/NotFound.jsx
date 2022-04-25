import React from "react";

export default function NotFound() {
  return (
    <section className="bg-primary py-[120px] relative z-10">
      <div className="mx-auto max-w-[400px] text-center">
        <h2
          className="
                  font-bold
                  text-gray-600
                  mb-2
                  text-[50px]
                  sm:text-[80px]
                  md:text-[100px]
                  leading-none
                  "
        >
          404
        </h2>
        <h4 className="text-gray-600 font-semibold text-[22px] leading-tight mb-3">
          Oops! That page can’t be found
        </h4>
        <p className="text-lg text-gray-400 mb-8">
          The page you are looking for it maybe deleted
        </p>
        <a
          href="/"
          className="
                  text-base
                  font-semibold
                  text-gray-600
                  inline-block
                  text-center
                  border border-gray
                  rounded-lg
                  px-8
                  py-3
                  hover:bg-white hover:text-primary
                  transition
                  "
        >
          Go To Home
        </a>
      </div>
    </section>
  );
}
