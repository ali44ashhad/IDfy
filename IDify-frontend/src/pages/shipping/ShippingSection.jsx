import React from 'react';

const ShippingSection = () => {
  const shippingData = [
    { name: "Normal", price: "£20", speed: "14 - 20 days" }
  ];

  return (
    <div className="mb-0">
     <div className="bg-[#202121] text-white py-40 font-sans flex flex-col items-center mb-0">
     <div className="w-full max-w-7xl">
        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-semibold mb-4">Shipping Options</h1>
          <p className="text-gray-300 text-sm md:text-base">
            We can ship to anywhere in the world, please contact me for estimates on timings to other countries
          </p>
        </div>
    
        {/* Shipping Table */}
        <div className="overflow-x-auto rounded-sm">
          <table className="w-full text-center border-collapse">
            <thead>
              <tr className="bg-[#212529] text-white border-b border-gray-800">
                <th className="py-2 px-6 font-bold text-lg">Shipping Name</th>
                <th className="py-2 px-6 font-bold text-lg">Price</th>
                <th className="py-2 px-6 font-bold text-lg">Speed (for UK)</th>
              </tr>
            </thead>
            <tbody>
              {shippingData.map((item, index) => (
                <tr key={index} className="bg-[#323539] hover:bg-[#252932] transition-colors">
                  <td className="py-2 px-6 text-gray-300">{item.name}</td>
                  <td className="py-2 px-6 text-gray-300">{item.price}</td>
                  <td className="py-2 px-6 text-gray-300">{item.speed}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
        </div>
    </div>
  );
};

export default ShippingSection;