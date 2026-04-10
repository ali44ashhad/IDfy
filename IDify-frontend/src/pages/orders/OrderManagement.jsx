import React, { useState } from "react";
import CheckoutForm from "./CheckOutForm";

const OrderManagement = () => {
  const [orderData, setOrderData] = useState({
    email: "",
    tellegramId: "",
  });

  const [step, setStep] = useState("order"); // 'order' | 'checkout'

  const handleChange = (e) => {
    setOrderData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleGenerateOrder = () => {
    if (!orderData.email) {
      alert("Email is required");
      return;
    }
    setStep("checkout");
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white py-40 px-6 lg:px-24">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="bg-[#1e293b]/40 border border-white/5 rounded-lg py-10 mb-10 text-center shadow-2xl">
          <h1 className="text-3xl md:text-5xl font-light mb-2">
            Order Management
          </h1>
          <p className="text-gray-400 text-base md:text-lg">
            Create a new order
          </p>
        </div>

        {step === "order" ? (
          <div className="bg-[#1a1a1a] border border-white/5 rounded-md p-8 shadow-xl">
            <h2 className="text-xl font-bold mb-8 border-b border-white/5 pb-4">
              Create New Order
            </h2>

            <div className="space-y-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-300">Email Address</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Required"
                  value={orderData.email}
                  onChange={handleChange}
                  className="w-full bg-[#262626] border border-white/10 rounded-md py-3 px-4 text-sm focus:outline-none focus:border-blue-500 placeholder:text-gray-600"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-300">Telegram ID</label>
                <input
                  type="text"
                  name="tellegramId"
                  placeholder="Optional"
                  value={orderData.tellegramId}
                  onChange={handleChange}
                  className="w-full bg-[#262626] border border-white/10 rounded-md py-3 px-4 text-sm focus:outline-none focus:border-blue-500 placeholder:text-gray-600"
                />
              </div>

              <button
                onClick={handleGenerateOrder}
                className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-md uppercase tracking-widest text-sm shadow-lg"
              >
                Continue to Checkout
              </button>
            </div>
          </div>
        ) : (
          <CheckoutForm
            previousStepData={orderData}
          />
        )}
      </div>
    </div>
  );
};

export default OrderManagement;