import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, remFromCart } from "@/Redux/cartSlice";
import { useCallback } from "react";
import { axiosInstance } from "@/services/api/api";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const cartP = useSelector((state) => state.cart.cart);
  const [product, setProduct] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const productImages = product ? [
    product.image,
    product.image,
    product.image,
    product.image
  ] : [];

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

  const fetchProductById = useCallback(async () => {
    try {
      const res = await axiosInstance.get(`/products/${id}`);
      setProduct(res.data.data);
      console.log(res.data.data);
      console.log("Product fetching has been done successfully");
    } catch (error) {
      console.log("Error has occurred while Product Fetching", error);
    }
  }, [id]);

  useEffect(() => {
    fetchProductById();
  }, [fetchProductById]);

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % productImages.length);
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + productImages.length) % productImages.length);
  };

  return (
    <div className="container mx-auto my-8 p-4">
      {product ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Gallery Section */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative group">
              <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
                <img
                  src={productImages[selectedImageIndex]}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              
              {/* Navigation Arrows */}
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              >
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
              
              {/* Image Counter */}
              <div className="absolute bottom-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-sm">
                {selectedImageIndex + 1} / {productImages.length}
              </div>
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-3">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  onMouseEnter={() => setSelectedImageIndex(index)}
                  className={`aspect-square overflow-hidden rounded-lg border-2 transition-all duration-200 ${
                    selectedImageIndex === index
                      ? "border-blue-500 ring-2 ring-blue-200"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Information Section */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>
              <div className="flex items-center gap-2 mb-4">
                <span className="inline-block px-3 py-1 text-sm font-medium text-blue-600 bg-blue-50 rounded-full">
                  {product.category}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-baseline gap-4">
                <span className="text-3xl font-bold text-green-600">
                  Rs.{product.price}
                </span>
                {product.discountPercentage && (
                  <span className="text-lg text-gray-500 line-through">
                    Rs.{Math.round(product.price * (1 + product.discountPercentage / 100))}
                  </span>
                )}
                {product.discountPercentage && (
                  <span className="text-sm font-medium text-red-500 bg-red-50 px-2 py-1 rounded">
                    {product.discountPercentage}% OFF
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center">
                  {Array.from({ length: 5 }, (_, index) => (
                    <span
                      key={index}
                      className={`text-lg ${
                        index < Math.floor(product.rating)
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <span className="text-gray-600">
                  {product.rating} / 5
                </span>
              </div>

              <p className="text-gray-700 leading-relaxed">
                {product.description}
              </p>

              <div className="flex items-center gap-2">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                    product.quantity > 0
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {product.status ? "In Stock" : "Out of Stock"}
                </span>
                {product.quantity > 0 && (
                  <span className="text-sm text-gray-600">
                    {product.quantity} available
                  </span>
                )}
              </div>
            </div>

            <div className="flex gap-4">
              {cartP.some((item) => item.id === product.id) ? (
                <button
                  onClick={handleRemFromCart}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 shadow-md"
                >
                  Remove From Cart
                </button>
              ) : (
                <button
                  onClick={handleAddToCart}
                  disabled={!product.status}
                  className={`flex-1 px-6 py-3 rounded-lg font-medium transition-colors duration-200 shadow-md ${
                    product.status
                      ? "bg-blue-500 hover:bg-blue-600 text-white"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  {product.status ? "Add to Cart" : "Out of Stock"}
                </button>
              )}
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">
                Product Details
              </h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Category:</span>
                  <span className="text-gray-900">{product.category}</span>
                </div>
                {product.brand && (
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Brand:</span>
                    <span className="text-gray-900">{product.brand}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Product ID:</span>
                  <span className="text-gray-900">{product.id}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-xl text-gray-600">Loading product...</p>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default ProductDetail;