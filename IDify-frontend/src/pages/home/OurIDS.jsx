import React from 'react';
import ukFrontImg from '../../assets/homePageAssets/ids-1.jpg';
import ukBackImg from '../../assets/homePageAssets/ids-2.jpg';

const OurIDs = () => {
  const idsData = [
    {
      title: "UK Front",
      desc: "Front of UK 2022 ID",
      src: ukFrontImg,
    },
    {
      title: "UK Back",
      desc: "Back Of The UK 2022 Fake ID",
      src: ukBackImg,
    },
  ];

  return (
    <section id="ids-section" className="bg-[#1a1a1a] py-16 px-6">
      {/* Container further reduced to 60% for a more compact look */}
      <div className="w-full lg:w-[60%] mx-auto text-center">
        
        {/* Header Section */}
        <div className="mb-12">
          <h2 className="text-white text-3xl md:text-4xl font-black uppercase tracking-[0.2em] mb-3">
            Our IDs
          </h2>
          <div className="h-0.5 w-12 bg-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-500 italic text-base md:text-lg">
            See our most up to date designs.
          </p>
        </div>

        {/* IDs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          {idsData.map((id, index) => (
            <div key={index} className="flex flex-col items-center group">
              
              {/* Significantly Reduced Image Block Size */}
              <div className="w-full max-w-[320px] aspect-[1.58/1] overflow-hidden rounded-xl bg-black border border-white/10 shadow-xl transition-all duration-500 group-hover:scale-105 group-hover:border-blue-500/40 mb-6">
                <img 
                  src={id.src}
                  alt={id.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Text Details adjusted for smaller scale */}
              <h3 className="text-white text-xl md:text-2xl font-bold mb-2 tracking-tight group-hover:text-blue-500 transition-colors">
                {id.title}
              </h3>
              <p className="text-gray-500 text-sm italic font-light">
                {id.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurIDs;