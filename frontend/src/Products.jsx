import axios from "axios";
import { useEffect, useState } from "react";
import NotFound from "./NotFound";

// const products = [
//   {
//     id: "626636b6646cb4690f25dc72",
//     title: "Basic Tee 6-Pack",
//     price: "₹1,920",
//     images: [
//       "https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg",
//     ],
//   },
//   {
//     id: 1,
//     title: "Earthen Bottle",
//     price: "₹1,499",
//     images: [
//       "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg",
//     ],
//   },
//   {
//     id: 2,
//     title: "Nomad Tumbler",
//     price: "₹899",
//     images: [
//       "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg",
//     ],
//   },
//   {
//     id: 3,
//     title: "Focus Paper Refill",
//     price: "₹469",
//     images: [
//       "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg",
//     ],
//   },
//   {
//     id: 4,
//     title: "Machined Mechanical Pencil",
//     price: "₹249",
//     images: [
//       "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg",
//     ],
//   },
//   {
//     id: 5,
//     title: "Focus Card Tray",
//     price: "₹699",
//     images: [
//       "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-05.jpg",
//     ],
//   },
//   {
//     id: 6,
//     title: "Focus Multi-Pack",
//     price: "₹999",
//     images: [
//       "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-06.jpg",
//     ],
//   },
//   {
//     id: 7,
//     title: "Brass Scissors",
//     price: "₹799",
//     images: [
//       "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-07.jpg",
//     ],
//   },
//   {
//     id: 8,
//     title: "Focus Carry Pouch",
//     price: "₹1299",
//     images: [
//       "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-08.jpg",
//     ],
//   },
// ];

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const run = async () => {
      setLoading(true);
      const { data } = await axios.get("http://localhost:8080/products");
      setProducts(data);
      setLoading(false);
    };
    run();
  }, []);

  if (loading) return null;
  if (!products) return <NotFound />;

  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-12 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-4xl mb-10 font-extrabold tracking-tight text-gray-900">
          Products
        </h1>

        <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <a
              key={product.id}
              href={`products/${product.id}`}
              className="group"
            >
              <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                <img
                  src={product.images[0]}
                  alt="product"
                  className="w-full h-full object-center object-cover group-hover:opacity-75"
                />
              </div>
              <h3 className="mt-4 text-sm text-gray-700">{product.title}</h3>
              <p className="mt-1 text-lg font-medium text-gray-900">
                {product.price}
              </p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
