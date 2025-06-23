import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import CartReviewSection from './CartReviewSection';
import ShippingFormSection from './ShippingFormSection';
import PaymentMethodSection from './PaymentMethodSection';
import OrderSummarySection from './OrderSummarySection';
import OrderConfirmationSection from './OrderConfirmationSection';

const steps = [
  'Cart Review',
  'Shipping',
  'Payment',
  'Summary',
  'Confirmation'
];

export default function Checkout() {
  const { items, clearCart } = useCart();

  const [step, setStep] = useState(0);
  const [shipping, setShipping] = useState({
    name: '', email: '', phone: '', address: '', city: '', state: '', pincode: '', country: 'India'
  });
  const [payment, setPayment] = useState('cod');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [errors, setErrors] = useState({});

  const handleShippingChange = (e) => setShipping({ ...shipping, [e.target.name]: e.target.value });
  const nextStep = () => {
    if (step === 1) {
      if (!validateShipping()) return;
    }
    setStep(s => s + 1);
  };
  const prevStep = () => setStep(s => s - 1);

  const validateShipping = () => {
    const newErrors = {};
    if (!shipping.name) newErrors.name = 'Name is required';
    if (!shipping.email || !/^[^@]+@[^@]+\.[^@]+$/.test(shipping.email)) newErrors.email = 'Valid email is required';
    if (!shipping.phone || !/^[0-9]{10}$/.test(shipping.phone)) newErrors.phone = 'Valid 10-digit phone is required';
    if (!shipping.address) newErrors.address = 'Address is required';
    if (!shipping.city) newErrors.city = 'City is required';
    if (!shipping.state) newErrors.state = 'State is required';
    if (!shipping.pincode || !/^[0-9]{6}$/.test(shipping.pincode)) newErrors.pincode = 'Valid 6-digit pincode is required';
    if (!shipping.country) newErrors.country = 'Country is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = () => {
    setOrderId('ORD' + Date.now());
    setOrderPlaced(true);
    clearCart();
    nextStep();
  };

  return (
    <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-lg p-6 mt-10 mb-10">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-700">Checkout</h1>
      {/* Stepper */}
      <div className="flex justify-between items-center mb-8">
        {steps.map((label, idx) => (
          <div
            key={label}
            className={`flex-1 text-center font-medium relative ${step === idx ? 'text-blue-700' : 'text-gray-400'}`}
          >
            <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center mb-1 ${step === idx ? 'bg-blue-700 text-white' : 'bg-gray-200 text-gray-500'}`}>{idx + 1}</div>
            <span className="text-xs sm:text-sm">{label}</span>
            {idx < steps.length - 1 && (
              <div className="absolute top-4 right-0 w-full h-0.5 bg-gray-200 z-0" style={{ left: '50%', width: '100%' }}></div>
            )}
          </div>
        ))}
      </div>
      <div className="bg-gray-50 rounded-xl p-5 mb-6 shadow-sm">
        {step === 0 && <CartReviewSection />}
        {step === 1 && <ShippingFormSection shipping={shipping} handleShippingChange={handleShippingChange} errors={errors} />}
        {step === 2 && <PaymentMethodSection payment={payment} setPayment={setPayment} />}
        {step === 3 && <OrderSummarySection shipping={shipping} payment={payment} />}
        {step === 4 && <div className="text-center text-green-700"><OrderConfirmationSection orderId={orderId} /></div>}
      </div>
      <div className="mt-4 flex justify-center gap-4">
        {step > 0 && step < 4 && (
          <button className="px-6 py-2 rounded-lg border border-blue-700 text-blue-700 bg-white font-semibold transition hover:bg-blue-50" onClick={prevStep}>Back</button>
        )}
        {step < 3 && (
          <button
            className="px-6 py-2 rounded-lg bg-blue-700 text-white font-semibold transition hover:bg-blue-800 disabled:bg-gray-300 disabled:text-gray-500"
            onClick={nextStep}
            disabled={
              (step === 0 && items.length === 0)
            }
          >
            Next
          </button>
        )}
        {step === 3 && (
          <button className="px-6 py-2 rounded-lg bg-blue-700 text-white font-semibold transition hover:bg-blue-800" onClick={handlePlaceOrder}>Place Order</button>
        )}
      </div>
    </div>
  );
}
