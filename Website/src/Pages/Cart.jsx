import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { remFromCart } from "@/Redux/cartSlice";
import LottieAnimation from "@/components/Lotte/LotteAnimation";

const Cart = () => {
  const dispatch = useDispatch();
  const [amount, setTotalAmount] = useState(0);
  const cart = useSelector((state) => state.cart.cart);

  useEffect(() => {
    if (Array.isArray(cart)) {
      setTotalAmount(cart.reduce((acc, curr) => acc + curr.price, 0));
    }
  }, [cart]);

  const handleRemove = (item) => {
    dispatch(remFromCart(item));
  };

  return (
    <div className="container bg-white p-10 text-black text-sm">
      <h1 className="text-2xl font-bold mb-6">Cart</h1>
      {cart.length > 0 ? (
        <div className="flex flex-col gap-4">
          {cart.map((item) => (
            <div className="flex justify-between items-center border-b pb-2" key={item.id}>
              <div className="flex gap-4 items-center">
                <img src={item.thumbnail} alt={item.title} className="rounded-lg h-24 w-32" />
                <div className="flex flex-col">
                  <h1 className="text-lg font-bold">{item.title}</h1>
                  <p className="text-gray-600 py-2">Price: ${item.price}</p>
                  <div className="flex items-center">

                    <button onClick={() => handleRemove(item)} className="text-white ml-4 border border-orange-500 rounded-xl p-1 bg-red-500 hover:animate-pulse">
                      Remove
                    </button>
                  </div>
                </div>
              </div>
              <p className="font-semibold">${item.price}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center"><LottieAnimation />
        <span className="text-2xl italic text-rose-500">Cart Is Empty</span>
        </div>
      )}
      <div className="flex justify-between items-center mt-8">
        <h1 className="text-lg font-bold">Total</h1>
        <p className="font-semibold">${amount}</p>
      </div>
    </div>
  );
};

export default Cart;
