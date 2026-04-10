import React, { useState, useEffect } from 'react';
 
const PricingPage = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  

  return (
    <div className="bg-[#202121]/50 text-white font-sans">      

      {/* Pricing Table Section */}
      <section className="py-40 px-4 md:px-20 lg:px-30 bg-[#121212]">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-3xl font-semibold mb-4">Prices for the IDs</h2>
          <p className="text-gray-400 text-lg">All prices are per person, each id comes with a free spare copy.</p>
        </div>
        
        <div className="overflow-x-auto max-w-7xl mx-auto">
          <table className="w-full text-center border-collapse bg-[#1a1a1a]/50">
            <thead>
              <tr className="bg-[#212529] text-sm md:text-base uppercase tracking-wider">
                <th className="py-3 px-4">Licence Type</th>
                <th className="py-3 px-4">1 Person</th>
                <th className="py-3 px-4">2-3 People</th>
                <th className="py-3 px-4">4-9 People</th>
                <th className="py-3 px-4">10-19 People</th>
                <th className="py-3 px-4">20-29 People</th>
                <th className="py-3 px-4">30+ People</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-white/5 bg-[#323539]">
                <td className="py-3 px-4 font-medium">UK Driving Licence 2024 - Polycarbonate</td>
                <td>£120</td><td>£110</td><td>£80</td><td>£70</td><td>£65</td><td>£60</td>
              </tr>
              <tr className="border-b border-white/5 bg-[#212529]">
                <td className="py-3 px-4">
                  <div className="line-through text-gray-500">UK Driving Licence 2024</div>
                  <div className="text-red-500 text-xs mt-1">Not available right now</div>
                </td>
                <td className="text-gray-500">£100</td><td className="text-gray-500">£90</td><td className="text-gray-500">£70</td><td className="text-gray-500">£55</td><td className="text-gray-500">£50</td><td className="text-gray-500">£45</td>
              </tr>
              <tr className="bg-[#323539]">
                <td className="py-3 px-4 font-medium">UK Provisional Licence 2024</td>
                <td>£80</td><td>£70</td><td>£50</td><td>£40</td><td>£40</td><td>£35</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default PricingPage;