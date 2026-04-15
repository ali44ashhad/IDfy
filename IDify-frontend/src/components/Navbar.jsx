import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import { Menu, X } from 'lucide-react';


const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-[100] font-sans">
      {/* Upper Red Banner */}
      <div 
        className={`bg-[#f8d7da] text-[#721c24] text-xs md:text-sm px-4 text-center font-medium overflow-hidden transition-all duration-500 ease-in-out ${
          isScrolled ? 'max-h-0 py-0' : 'max-h-[60px] py-4'
        }`}
      >
        ⚠️ Important: Create an order to speak to us!
      </div>

      {/* Main Navigation Bar */}
      <nav className="relative z-[110] bg-[#212529] text-gray-300 py-4 px-6 md:px-12 flex justify-between items-center border-b border-white/5">
        <div className="flex items-center gap-10">
          <Link to="/" className="text-2xl font-bold text-white tracking-tighter">
            IDify
          </Link>
          
          <ul className="hidden lg:flex gap-8 text-[13px] font-semibold tracking-wider">
            <li><Link to="/" className="hover:text-blue-500 transition">Home</Link></li>
            <li><Link to="/orders" className="hover:text-blue-500 transition">Orders</Link></li>
            <li><Link to="/pricing" className="hover:text-blue-500 transition">Pricing</Link></li>
            <li><Link to="/shipping" className="hover:text-blue-500 transition">Shipping</Link></li>
            <li><Link to="/faq" className="hover:text-blue-500 transition">FAQ</Link></li>
            <li><Link to="/pay" className="hover:text-blue-500 transition">How To Pay</Link></li>
          </ul>
        </div>
{/* 
        <div className="flex items-center gap-6">
          <Link to="/login" className="hidden lg:block text-sm font-bold hover:text-white transition">Login</Link>
          <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden text-white p-2">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div> */}
      </nav>

      {/* Mobile Menu - "Push Down" style */}
      <div 
        className={`absolute left-0 w-full bg-[#1a1d23] border-b border-white/10 transition-all duration-500 ease-in-out z-[105] overflow-hidden ${
          isOpen ? 'max-h-[500px] opacity-100 visible' : 'max-h-0 opacity-0 invisible'
        }`}
      >
        <ul className="flex flex-col p-8 gap-5 text-sm font-bold uppercase tracking-widest text-white">
          <li onClick={() => setIsOpen(false)}><Link to="/">Home</Link></li>
          <li onClick={() => setIsOpen(false)}><Link to="/orders">Orders</Link></li>
          <li onClick={() => setIsOpen(false)}><Link to="/pricing">Pricing</Link></li>
          <li onClick={() => setIsOpen(false)}><Link to="/shipping">Shipping</Link></li>
          <li onClick={() => setIsOpen(false)}><Link to="/faq">FAQ</Link></li>
          <li onClick={() => setIsOpen(false)}><Link to="/pay">How To Pay</Link></li>
          <li onClick={() => setIsOpen(false)} className="pt-4 border-t border-white/10 text-blue-500">
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;