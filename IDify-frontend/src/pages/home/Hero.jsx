import React from 'react';
import { Link } from 'react-router-dom';
import heroImg from '../../assets/homePageAssets/hero-image.jpg'
import Services from './Services'
import OurIDS from './OurIDS'

const Hero = () => {

    const handleScroll = (e) => {
        // If the target is on the same page, we find the element and scroll
        const element = document.getElementById('ids-section');
        if (element) {
          e.preventDefault();
          element.scrollIntoView({ behavior: 'smooth' });
        }
      };

  return (
   <>
   <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden py-12">
  {/* Background Image Container */}
  <div className="absolute inset-0 z-0">
    <img 
      src={heroImg}
      alt="Nightclub atmosphere" 
      className="w-full h-full object-cover object-center"
    />
    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-purple-900/40 to-black/60 mix-blend-multiply" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/20 via-transparent to-transparent" />
  </div>

  {/* Content */}
  <div className="relative z-10 text-center px-6 max-w-4xl">
    <h1 className="text-4xl xs:text-5xl md:text-7xl font-semibold text-white mb-4 md:mb-6 drop-shadow-lg tracking-tight">
      High Quality Fake IDs
    </h1>
    
    <p className="text-base md:text-xl text-white/90 font-medium mb-8 md:mb-10 drop-shadow-md max-w-2xl mx-auto">
      Unleash the power of worry-free fun at clubs and bars
    </p>

    {/* Buttons Container: Grid for mobile, Flex for desktop */}
    <div className="grid grid-cols-1 xs:grid-cols-2 sm:flex sm:flex-row gap-2 md:gap-4 justify-center items-center px-4">
  <Link 
    to="/#ids-section" 
    onClick={handleScroll}
    /* Changed px-4 to px-2 for mobile, and w-full to mx-auto w-4/5 for a slimmer look */
    className="w-4/5 mx-auto xs:w-full sm:w-auto px-2 py-2 sm:px-6 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white font-thin rounded-md transition-all duration-200 text-[10px] sm:text-sm uppercase tracking-wider text-center"
  >
    See Our IDs
  </Link>
  
  <Link 
    to="/pricing" 
    className="w-4/5 mx-auto xs:w-full sm:w-auto px-2 py-2 sm:px-6 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white font-thin rounded-md transition-all duration-200 text-[10px] sm:text-sm uppercase tracking-wider text-center"
  >
    Our Prices
  </Link>
  
  <Link 
    to="/orders" 
    /* Spans 2 cols on xs, but stays slim (w-4/5) on the absolute smallest screens */
    className="w-4/5 mx-auto xs:w-full xs:col-span-2 sm:col-span-1 sm:w-auto px-2 py-2 sm:px-6 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white font-thin rounded-md transition-all duration-200 text-[10px] sm:text-sm uppercase tracking-wider text-center"
  >
    Order Now
  </Link>
</div>
  </div>
</section>

    <Services/>

    <OurIDS/>
   </>
  );
};

export default Hero;