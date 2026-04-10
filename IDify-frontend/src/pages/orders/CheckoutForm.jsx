import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";

const CheckoutForm = ({
  previousStepData,
  onChangeData,
  onCheckout, // kept for backward compatibility (optional)
  loading = false, // kept for backward compatibility (optional)
} = {}) => {

  const [formData, setFormData] = useState({
    pronoun: 'MR',
    firstName: '',
    middleName: '',
    lastName: '',
    addressOne: '',
    addressTwo: '',
    city: '',
    postalCode: '',
    dateOfBirth: '',
    license: '',
    photo: null,
    signature: null,
    gender: 'Male',
  });

  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentRef, setPaymentRef] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  useEffect(() => {
    if (typeof onChangeData === "function") onChangeData(formData);
  }, [formData, onChangeData]);

  const openPaymentModal = () => {
    if (!previousStepData?.email) {
      alert("Email is required");
      return;
    }

    // HTML required validations won't run because we don't submit the form element.
    // Do a small manual validation for the required fields we need before payment.
    const requiredFields = [
      "firstName",
      "lastName",
      "addressOne",
      "city",
      "postalCode",
      "dateOfBirth",
      "license",
      "gender",
    ];

    for (const key of requiredFields) {
      if (!String(formData?.[key] ?? "").trim()) {
        alert("Please fill all required fields");
        return;
      }
    }

    if (!formData?.photo) {
      alert("Photo is required");
      return;
    }

    setShowPaymentModal(true);
    if (typeof onCheckout === "function") onCheckout(); // optional legacy hook
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();

    if (!paymentRef?.trim()) {
      alert("Payment Reference Number is required");
      return;
    }

    const combinedData = {
      ...(previousStepData || {}),
      ...(formData || {}),
      paymentRef: paymentRef.trim(),
    };

    const finalData = new FormData();
    Object.entries(combinedData).forEach(([key, value]) => {
      if (value === null || value === undefined) return;
      finalData.append(key, value);
    });

    setSubmitting(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/user/create-user`,
        finalData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Success:", response.data);
      alert("Order submitted successfully");
      setShowPaymentModal(false);
    } catch (error) {
      console.log("ERROR there:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Failed to submit order");
    } finally {
      setSubmitting(false);
    }
  };

  const paymentModal = useMemo(() => {
    if (!showPaymentModal) return null;

    return (
      <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
        <div className="bg-[#1a1d23] w-full max-w-xl p-6 rounded-lg shadow-xl border border-gray-800">
          <h2 className="text-lg font-semibold mb-4">Payment</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
            <div className="rounded-md border border-gray-700 bg-[#252932] h-40 flex items-center justify-center text-gray-300">
              Image 1
            </div>
            <div className="rounded-md border border-gray-700 bg-[#252932] h-40 flex items-center justify-center text-gray-300">
              Image 2
            </div>
          </div>

          <form onSubmit={handlePaymentSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Payment Reference Number <span className="text-red-500 italic">*required</span>
              </label>
              <input
                required
                type="text"
                name="paymentRef"
                placeholder="Enter reference number"
                value={paymentRef}
                onChange={(e) => setPaymentRef(e.target.value)}
                className="w-full bg-[#252932] border border-gray-700 rounded-md p-2.5 outline-none focus:border-blue-500"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={submitting}
                className={`flex-1 py-2 rounded-md font-semibold ${
                  submitting
                    ? "bg-green-800 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700"
                }`}
              >
                {submitting ? "Submitting..." : "Submit"}
              </button>

              <button
                type="button"
                onClick={() => setShowPaymentModal(false)}
                className="flex-1 bg-gray-600 hover:bg-gray-700 py-2 rounded-md font-semibold"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }, [handlePaymentSubmit, paymentRef, showPaymentModal, submitting]);

  return (
<div className="min-h-screen bg-[#0f1115] text-white p-25 px-4 flex justify-center">
          <form 
        onSubmit={(e) => e.preventDefault()}
        className="pt-20 w-full max-w-7xl bg-[#1a1d23] rounded-lg shadow-2xl p-4 border border-gray-800"
      >
        <div className="grid grid-cols-1 gap-6">
          
          {/* Pronoun */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Pronoun: <span className="text-yellow-500 italic">*optional</span>
            </label>
            <select
              name="pronoun"
              value={formData.pronoun}
              onChange={handleChange}
              className="w-full bg-[#252932] border border-gray-700 rounded-md p-2.5 outline-none focus:border-blue-500"
            >
              <option value="MR">MR</option>
              <option value="MRS">MRS</option>
              <option value="MS">MS</option>
            </select>
          </div>

          {/* Names */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                First name: <span className="text-red-500 italic">*required</span>
              </label>
              <input
                required
                type="text"
                name="firstName"
                onChange={handleChange}
                className="w-full bg-[#252932] border border-gray-700 rounded-md p-2.5 outline-none focus:border-blue-500"
              />
              
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Middle name: <span className="text-yellow-500 italic">*optional</span>
              </label>
              <input
                
                type="text"
                name="middleName"
                onChange={handleChange}
                className="w-full bg-[#252932] border border-gray-700 rounded-md p-2.5 outline-none focus:border-blue-500"
              />
              
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Last name: <span className="text-red-500 italic">*required</span>
              </label>
              <input
                required
                type="text"
                name="lastName"
                onChange={handleChange}
                className="w-full bg-[#252932] border border-gray-700 rounded-md p-2.5 outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Address Fields */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Address1: <span className="text-red-500 italic">*required</span>
            </label>
            <input
              required
              type="text"
              name="addressOne"
              onChange={handleChange}
              className="w-full bg-[#252932] border border-gray-700 rounded-md p-2.5 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Address2: <span className="text-yellow-500 italic">*optional</span>
            </label>
            <input
              type="text"
              name="addressTwo"
              onChange={handleChange}
              className="w-full bg-[#252932] border border-gray-700 rounded-md p-2.5 outline-none focus:border-blue-500"
            />
          </div>

          {/* City & Postcode */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                City: <span className="text-red-500 italic">*required</span>
              </label>
              <input
                required
                type="text"
                name="city"
                onChange={handleChange}
                className="w-full bg-[#252932] border border-gray-700 rounded-md p-2.5 outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Postcode: <span className="text-red-500 italic">*required</span>
              </label>
              <input
                required
                type="text"
                name="postalCode"
                onChange={handleChange}
                className="w-full bg-[#252932] border border-gray-700 rounded-md p-2.5 outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* DOB & Licence */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Dob: <span className="text-red-500 italic">*required</span>
              </label>
              <input
                required
                type="date"
                name="dateOfBirth"
                onChange={handleChange}
                className="w-full bg-[#252932] border border-gray-700 rounded-md p-2.5 outline-none focus:border-blue-500 appearance-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Licence type: <span className="text-red-500 italic">*required</span>
              </label>
              <select
                required
                name="license"
                value={formData.license}
                onChange={handleChange}
                className="w-full bg-[#252932] border border-gray-700 rounded-md p-2.5 outline-none focus:border-blue-500"
              >
                <option value="">--------</option>
                <option value="full">Full</option>
                <option value="provisional">Provisional</option>
              </select>
            </div>
          </div>

          {/* File Uploads */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Photo: <span className="text-red-500 italic">*required</span>
              </label>
              <input
                required
                type="file"
                name="photo"
                onChange={handleChange}
                className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-black hover:file:bg-gray-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Signature: <span className="text-yellow-500 italic">*optional</span>
              </label>
              <input
                type="file"
                name="signature"
                onChange={handleChange}
                className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-black hover:file:bg-gray-200"
              />
            </div>
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Gender: <span className="text-red-500 italic">*required</span>
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full bg-[#252932] border border-gray-700 rounded-md p-2.5 outline-none focus:border-blue-500"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
              <button
      type="button"
      disabled={loading || submitting}
      onClick={openPaymentModal}
      className={`w-full text-white font-semibold py-3 rounded-md transition duration-200 shadow-lg uppercase text-sm tracking-wider 
        ${loading || submitting ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}
      `}
    >
      {loading || submitting ? "Processing..." : "Checkout"}
    </button>
          </div>
        </div>
      </form>

      {paymentModal}
    </div>





  );
};

export default CheckoutForm;