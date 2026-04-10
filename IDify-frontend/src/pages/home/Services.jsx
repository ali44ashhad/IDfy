import React from 'react';
import { 
  Barcode, 
  Contact, 
  Plus, 
  Truck, 
  Sparkles, 
  Settings, 
  User, 
  Target, 
  Mail 
} from 'lucide-react';

const Services = () => {
  const services = [
    {
      title: "Scannable",
      desc: "All our IDs are completely scannable, showing the correct information to bouncers when placed under a scanner making them impossible to detect.",
      icon: <Barcode size={40} strokeWidth={2} />
    },
    {
      title: "Up To Date Designs",
      desc: "All our IDs are regularly updated and checked against the newest government released designs.",
      icon: <Contact size={40} strokeWidth={2} />
    },
    {
      title: "Spare Copy",
      desc: "Every ID comes with a free spare copy, just in case you misplace one.",
      icon: <Plus size={40} strokeWidth={2} />
    },
    {
      title: "Tracking",
      desc: "Accurate tracking provided on all shipping methods, including text updates if you submit a valid phone number.",
      icon: <Truck size={40} strokeWidth={2} />
    },
    {
      title: "Quality",
      desc: "IDs are made using a refined manufacturing process guaranteeing high quality and consistency, using real polycarbonate cards.",
      icon: <Sparkles size={40} strokeWidth={2} />
    },
    {
      title: "Reliability",
      desc: "Reliable ID Provider for over 5 years, we've proved ourselves in this industry over the last 5 years with ultra high quality products.",
      icon: <Settings size={40} strokeWidth={2} />
    },
    {
      title: "Hologram",
      desc: "Extremely high quality hologram and UV reflection using a photographic lens we've made in-house, you won't find a better one out there.",
      icon: <User size={40} strokeWidth={2} />
    },
    {
      title: "Accuracy",
      desc: "We generate a licence number following the DVLA's exact format, allowing these IDs to be scannable.",
      icon: <Target size={40} strokeWidth={2} />
    },
    {
      title: "Support",
      desc: "Fast and Reliable Support on multiple different messaging channels, including email, telegram and signal.",
      icon: <Mail size={40} strokeWidth={2} />
    }
  ];

  return (
    <section className="bg-[#121212] py-24 px-6">
      {/* Container set to 80% width on large screens */}
      <div className="w-full lg:w-[80%] mx-auto text-center">
        
        {/* Header with increased text sizes */}
        <div className="mb-20">
          <h2 className="text-white text-4xl md:text-5xl font-black uppercase tracking-[0.2em] mb-4">
            Our Services
          </h2>
          <p className="text-gray-400 italic text-lg md:text-xl">
            Why you should order with us
          </p>
        </div>

        {/* Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-20 gap-x-16">
          {services.map((service, index) => (
            <div key={index} className="flex flex-col items-center group">
              
              {/* Increased Icon Circle Size */}
              <div className="w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center text-white mb-8 shadow-2xl shadow-blue-600/20 transition-all duration-500 group-hover:scale-110 group-hover:bg-blue-500">
                {service.icon}
              </div>

              {/* Increased Text Content Sizes */}
              <h3 className="text-white text-2xl md:text-3xl font-bold mb-5 tracking-tight group-hover:text-blue-400 transition-colors">
                {service.title}
              </h3>
              <p className="text-gray-400 text-base md:text-lg leading-relaxed max-w-sm">
                {service.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;