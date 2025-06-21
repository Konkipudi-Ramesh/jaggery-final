import React from "react";
import { useCart } from "../context/CartContext";
import { Trash2 } from "lucide-react";

export default function Cart() {
  const { cart, removeFromCart } = useCart();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600 text-xl">
        No items in cart
      </div>
    );
  }

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = Math.floor(totalPrice * 0.1);
  const coupon = 10;
  const platformFee = 3;
  const delivery = 0;
  const finalAmount = totalPrice - discount - coupon + platformFee + delivery;

  return (
    <div className="min-h-screen bg-gray-50 p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Cart Items */}
      <div className="md:col-span-2 bg-white p-4 shadow rounded-xl">
        <h1 className="text-2xl font-bold mb-4 text-yellow-800">Your Cart</h1>
        {cart.map((item, index) => (
          <div key={index} className="flex justify-between items-center gap-4 border-b py-4">
            <div className="flex gap-4">
              <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-lg" />
              <div>
                <h2 className="text-xl font-semibold">{item.name}</h2>
                <p className="text-gray-500 text-sm">{item.description}</p>
                <p className="text-yellow-700 font-bold text-lg">₹{item.price}</p>
                <p className="text-sm text-gray-700">Quantity: {item.quantity}</p>
              </div>
            </div>
            <button onClick={() => removeFromCart(item)} className="text-red-500 hover:text-red-700">
              <Trash2 />
            </button>
          </div>
        ))}
        <button className="mt-6 bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600 transition">
          PLACE ORDER
        </button>
      </div>

      {/* Price Summary */}
      <div className="bg-white p-6 shadow rounded-xl">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">PRICE DETAILS</h2>
        <div className="space-y-2 text-sm text-gray-700">
          <div className="flex justify-between"><span>Price ({cart.length} items)</span><span>₹{totalPrice}</span></div>
          <div className="flex justify-between"><span>Discount</span><span className="text-green-600">− ₹{discount}</span></div>
          <div className="flex justify-between"><span>Coupons for you</span><span className="text-green-600">− ₹{coupon}</span></div>
          <div className="flex justify-between"><span>Platform Fee</span><span>₹{platformFee}</span></div>
          <div className="flex justify-between"><span>Delivery Charges</span><span className="line-through text-gray-400">₹40</span> <span className="text-green-600">Free</span></div>
          <hr />
          <div className="flex justify-between font-bold text-lg"><span>Total Amount</span><span>₹{finalAmount}</span></div>
          <p className="text-green-700 text-sm mt-2">You will save ₹{discount + coupon} on this order</p>
        </div>

        {/* Payment Options */}
        <div className="mt-6">
          <h3 className="text-sm font-semibold mb-2">Select Payment Option</h3>
          <select className="w-full border px-3 py-2 rounded">
            <option>UPI</option>
            <option>Cash on Delivery (COD)</option>
            <option>Debit/Credit Card</option>
          </select>
        </div>
      </div>
    </div>
  );
}
