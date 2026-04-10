import React from 'react';

const Contact = () => {
  return (
    <div className="min-h-screen bg-[#202121] flex flex-col items-center justify-center p-4 text-white font-sans">
      <div className="w-full max-w-md">
        <h1 className="text-4xl font-bold mb-10 text-left">Log in</h1>
        
        <form className="space-y-6">
          {/* Username Field */}
          <div className="flex items-center justify-between gap-4">
            <label className="text-lg font-medium whitespace-nowrap">Username:</label>
            <input 
              type="text" 
              className="w-full max-w-[240px] bg-white text-black px-2 py-1 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password Field */}
          <div className="flex items-center justify-between gap-4">
            <label className="text-lg font-medium whitespace-nowrap">Password:</label>
            <input 
              type="password" 
              className="w-full max-w-[240px] bg-[#2a2d35] text-white px-2 py-1 rounded border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Login Button */}
          <button 
            type="submit" 
            className="w-full bg-[#0066ff] hover:bg-[#0052cc] text-white font-bold py-3 px-6 rounded-lg transition-colors mt-4 text-lg"
          >
            Log in
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;