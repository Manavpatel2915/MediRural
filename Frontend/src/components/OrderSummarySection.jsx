import React from 'react';
import { useCart } from '../context/CartContext';

export default function OrderSummarySection({ shipping, payment }) {
  const { getCartTotal } = useCart();

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-blue-700">Order Summary</h2>
      <div className="space-y-2 mb-4">
        <div><span className="font-semibold">Name:</span> {shipping.name}</div>
        <div><span className="font-semibold">Address:</span> {shipping.address}, {shipping.city}, {shipping.state}, {shipping.pincode}, {shipping.country}</div>
        <div><span className="font-semibold">Phone:</span> {shipping.phone}</div>
        <div><span className="font-semibold">Email:</span> {shipping.email}</div>
        <div><span className="font-semibold">Payment:</span> {payment.toUpperCase()}</div>
      </div>
      <div className="flex justify-between items-center border-t pt-3 mt-3">
        <span className="font-semibold text-lg">Total:</span>
        <span className="font-bold text-blue-700 text-lg">₹{getCartTotal()}</span>
      </div>
    </div>
  );
} 