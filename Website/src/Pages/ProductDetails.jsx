import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, remFromCart } from "@/Redux/cartSlice";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const cartP = useSelector((state) => state.cart.cart);
  const [product, setProduct] = useState(null);

  const handleRemFromCart = () => {
    if (product) {
      dispatch(remFromCart(product));
      toast("Product removed from cart", {
        position: "bottom-left",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart(product));
      toast("Product added to cart", {
        position: "bottom-left",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  useEffect(() => {
    async function fetchProduct() {
      const response = await axios.get(`https://dummyjson.com/products/${id}`);
      setProduct(response.data);
    }
    fetchProduct();
  }, [id]);

  return (
    <div className="container mx-auto my-8 p-4">
      {product ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex justify-center">
            <img
              src={product.images[0]}
              alt={product.title}
              className="rounded-lg shadow-lg w-full md:w-4/5"
            />
          </div>
          <div>
            <h1 className="text-4xl font-bold mb-4">{product.title}</h1>
            <div className="mb-4">
              <span className="text-2xl font-semibold text-green-600">
                ${product.price}
              </span>
              <span className="text-xl text-gray-500 ml-4">
                {product.discountPercentage}% off
              </span>
            </div>
            <div className="flex items-center mb-4">
              <span className="text-gray-600">
                <span className="text-yellow-400">Rating :</span>
                {product.rating} / 5
              </span>
            </div>
            <p className="text-gray-700 mb-4">{product.description}</p>
            <div className="mb-4">
              <span
                className={`text-lg ${
                  product.stock > 0 ? "text-green-500" : "text-red-500"
                }`}
              >
                {product.stock > 0 ? "In Stock" : "Out of Stock"}
              </span>
            </div>
            {cartP.some((item) => item.id === product.id) ? (
              <button
                onClick={handleRemFromCart}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-md mb-4"
              >
                Remove From Cart
              </button>
            ) : (
              <button
                onClick={handleAddToCart}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md mb-4"
              >
                Add to Cart
              </button>
            )}

            <div className="bg-gray-100 p-4 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-2">Details</h2>
              <p className="text-gray-700">
                <strong>Category:</strong> {product.category}
              </p>
              <p className="text-gray-700">
                <strong>Brand:</strong> {product.brand}
              </p>
            </div>
          </div>
          <ToastContainer />
        </div>
      ) : (
        <div className="text-center text-2xl">Loading</div>
      )}
    </div>
  );
};

export default ProductDetail;
