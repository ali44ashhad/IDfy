import React, { useState } from 'react';

export default function Payment() {
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/create-subscription`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  };

  return (
    <div className=" flex items-center justify-center min-h-[350px] bg-slate-50 p-4">
      <div className="mt-40 w-full max-w-sm bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
        
        {/* Title & Price */}
        <div className="text-center mb-6">
          <h3 className="text-lg font-semibold text-slate-800">Premium Plan</h3>
          <div className="mt-2 flex items-baseline justify-center gap-1">
            <span className="text-4xl font-bold text-slate-900">$5</span>
            <span className="text-slate-500 text-sm">/ month</span>
          </div>
          <p className="text-sm text-slate-500 mt-2">Get full access to all features.</p>
        </div>

        {/* Short Features List */}
        <ul className="space-y-2 text-sm text-slate-600 mb-6 border-t border-b border-slate-100 py-4">
          <li className="flex items-center gap-2">✓ Full feature access</li>
          <li className="flex items-center gap-2">✓ 24/7 Email support</li>
          <li className="flex items-center gap-2">✓ Cancel anytime</li>
        </ul>

        {/* Button */}
        <button
          onClick={handleSubscribe}
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors disabled:opacity-50"
        >
          {loading ? 'Loading...' : 'Subscribe'}
        </button>
        
      </div>
    </div>
  );
}