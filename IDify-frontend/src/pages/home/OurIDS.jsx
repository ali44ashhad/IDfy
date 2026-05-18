import React from 'react';
import ukFrontImg from '../../assets/homePageAssets/provisional.mp4';
import ukBackImg from '../../assets/homePageAssets/ukdrivinglicense.mp4';

const OurIDs = () => {
  const idsData = [
    {
      title: "Provisional Driving License",
      src: ukFrontImg,
    },
    {
      title: "UK Driving License",
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
        <div className="w-[92%] lg:w-[85%] mx-auto flex flex-col md:flex-row gap-12 lg:gap-16 items-center md:items-start">
  {idsData.map((id, index) => (
    <div
      key={index}
      className="flex flex-col items-center group w-full md:w-1/2"
    >
      
      {/* Larger Responsive Video Block */}
      <div className="w-full max-w-[520px] overflow-hidden rounded-2xl bg-black border border-white/10 shadow-2xl transition-all duration-500 group-hover:scale-[1.02] group-hover:border-blue-500/40 mb-6">
        
        <video
          src={id.src}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-auto object-contain"
        />
      </div>

      {/* Text Details */}
      <h3 className="text-white text-xl sm:text-2xl md:text-3xl font-bold mb-3 tracking-tight text-center group-hover:text-blue-500 transition-colors">
        {id.title}
      </h3>

     
    </div>
  ))}
</div>
      </div>
    </section>
  );
};

export default OurIDs;