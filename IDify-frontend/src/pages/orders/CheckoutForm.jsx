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
      <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-2">
        <div className="bg-[#1a1d23] w-full max-w-4xl p-4 rounded-lg shadow-xl border border-gray-800 flex flex-col max-h-[95vh]">
          <h2 className="text-lg font-bold mb-2 border-b border-gray-800 pb-1.5">Payment Details</h2>

          <div className="overflow-y-auto pr-1 custom-scrollbar flex-1">
            {/* Split Screen Container optimized for laptop views */}
            <div className="flex flex-col lg:flex-row gap-4 mb-2">
              
              {/* Left Side: Space efficient guide image stack */}
              <div className="flex flex-col gap-2 flex-1 w-full">
                <div className="rounded border border-gray-700 bg-[#252932] h-32 flex items-center justify-center text-gray-400">
                  <span className="text-xs uppercase tracking-widest">Payment Guide Image 1</span>
                </div>
                <div className="rounded border border-gray-700 bg-[#252932] h-32 flex items-center justify-center text-gray-400">
                  <span className="text-xs uppercase tracking-widest">Payment Guide Image 2</span>
                </div>
              </div>

              {/* Right Side: Banking details and crypto blocks */}
              <div className="flex flex-col gap-2 flex-[1.2] w-full">
                
                {/* Bank Transfer Details Block */}
                <div className="bg-[#111111] border border-gray-800 rounded-lg p-3">
                  <h3 className="text-sm font-semibold mb-2 text-blue-400">Bank Transfer</h3>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between"><span className="text-gray-500">Sort Code</span><span className="font-mono">04-00-03</span></div>
                    <div className="flex justify-between"><span className="text-gray-500">Account No.</span><span className="font-mono">45224430</span></div>
                    <div className="flex justify-between"><span className="text-gray-500">Account Name</span><span>L O</span></div>
                    <div className="border-t border-gray-800 pt-1.5 mt-1.5 flex items-center justify-between">
                      <span className="text-gray-400 italic text-[11px]">Transfer Reference:</span>
                      <div className="inline-block px-2 py-0.5 rounded bg-white text-black font-bold text-xs">old clothes</div>
                    </div>
                  </div>
                </div>

                {/* Crypto Double Block Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="bg-[#111111] border border-orange-500/20 rounded-lg p-2.5">
                    <h3 className="text-xs font-semibold text-orange-400 mb-1">Bitcoin (BTC)</h3>
                    <div className="bg-[#0A0A0A] border border-gray-700 rounded p-1.5 break-all font-mono text-[10px] text-orange-200">
                      34g8K27LVigu4QxbrpXbDi65BtRDjwGavf
                    </div>
                  </div>

                  <div className="bg-[#111111] border border-blue-500/20 rounded-lg p-2.5">
                    <h3 className="text-xs font-semibold text-blue-300 mb-1">Litecoin (LTC)</h3>
                    <div className="bg-[#0A0A0A] border border-gray-700 rounded p-1.5 break-all font-mono text-[10px] text-blue-100">
                      MRmrf1BEiy2T4XLt8jvus4F4rkXa2wUJfA
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Form Reference Input & Submission Footer */}
          <div className="pt-2 border-t border-gray-800">
            <form onSubmit={handlePaymentSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-medium mb-1 text-gray-300">
                  Payment Reference Number <span className="text-red-500">*</span>
                </label>
                <input
                  required
                  type="text"
                  name="paymentRef"
                  placeholder="Enter transaction reference"
                  value={paymentRef}
                  onChange={(e) => setPaymentRef(e.target.value)}
                  className="w-full bg-[#252932] border border-gray-700 rounded-md p-2 text-sm outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              <div className="flex gap-2 text-sm">
                <button
                  type="submit"
                  disabled={submitting}
                  className={`flex-[2] py-2.5 rounded font-bold uppercase tracking-wide transition-all ${
                    submitting ? "bg-green-800 cursor-not-allowed opacity-50" : "bg-green-600 hover:bg-green-700"
                  }`}
                >
                  {submitting ? "Processing..." : "Confirm & Submit"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowPaymentModal(false)}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 py-2.5 rounded font-semibold"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }, [handlePaymentSubmit, paymentRef, showPaymentModal, submitting]);

  return (
    <div className="min-h-screen bg-[#0f1115] text-white py-8 px-4 flex justify-center">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-full max-w-7xl bg-[#1a1d23] rounded-lg shadow-2xl p-5 border border-gray-800"
      >
        <div className="grid grid-cols-1 gap-4">
          {/* Pronoun */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Pronoun: <span className="text-yellow-500 italic">*optional</span>
            </label>
            <select
              name="pronoun"
              value={formData.pronoun}
              onChange={handleChange}
              className="w-full bg-[#252932] border border-gray-700 rounded-md p-2 outline-none focus:border-blue-500"
            >
              <option value="MR">MR</option>
              <option value="MRS">MRS</option>
              <option value="MS">MS</option>
            </select>
          </div>

          {/* Names */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">First name: <span className="text-red-500">*</span></label>
              <input required type="text" name="firstName" onChange={handleChange} className="w-full bg-[#252932] border border-gray-700 rounded-md p-2 outline-none focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Middle name: <span className="text-yellow-500">*</span></label>
              <input type="text" name="middleName" onChange={handleChange} className="w-full bg-[#252932] border border-gray-700 rounded-md p-2 outline-none focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Last name: <span className="text-red-500">*</span></label>
              <input required type="text" name="lastName" onChange={handleChange} className="w-full bg-[#252932] border border-gray-700 rounded-md p-2 outline-none focus:border-blue-500" />
            </div>
          </div>

          {/* Address Fields */}
          <div>
            <label className="block text-sm font-medium mb-1">Address1: <span className="text-red-500">*</span></label>
            <input required type="text" name="addressOne" onChange={handleChange} className="w-full bg-[#252932] border border-gray-700 rounded-md p-2 outline-none focus:border-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Address2: <span className="text-yellow-500">*</span></label>
            <input type="text" name="addressTwo" onChange={handleChange} className="w-full bg-[#252932] border border-gray-700 rounded-md p-2 outline-none focus:border-blue-500" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">City: <span className="text-red-500">*</span></label>
              <input required type="text" name="city" onChange={handleChange} className="w-full bg-[#252932] border border-gray-700 rounded-md p-2 outline-none focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Postcode: <span className="text-red-500">*</span></label>
              <input required type="text" name="postalCode" onChange={handleChange} className="w-full bg-[#252932] border border-gray-700 rounded-md p-2 outline-none focus:border-blue-500" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Dob: <span className="text-red-500">*</span></label>
              <input required type="date" name="dateOfBirth" onChange={handleChange} className="w-full bg-[#252932] border border-gray-700 rounded-md p-2 outline-none focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Licence type: <span className="text-red-500">*</span></label>
              <select required name="license" value={formData.license} onChange={handleChange} className="text-gray-500 w-full bg-[#252932] border border-gray-700 rounded-md p-2 outline-none focus:border-blue-500">
                <option value="">select licence type...</option>
                <option value="drivers licence">Drivers Licence</option>
                <option value="provisional">Provisional</option>
              </select>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Photo: <span className="text-red-500">*</span></label>
              <input required type="file" name="photo" onChange={handleChange} className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-black hover:file:bg-gray-200" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Signature: <span className="text-yellow-500">*</span></label>
              <input type="file" name="signature" onChange={handleChange} className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-black hover:file:bg-gray-200" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Gender: <span className="text-red-500">*</span></label>
            <select name="gender" value={formData.gender} onChange={handleChange} className="w-full bg-[#252932] border border-gray-700 rounded-md p-2 outline-none focus:border-blue-500">
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="pt-2">
            <button
              type="button"
              disabled={loading || submitting}
              onClick={openPaymentModal}
              className={`w-full text-white font-semibold py-3 rounded-md transition duration-200 shadow-lg uppercase text-sm tracking-wider ${loading || submitting ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
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