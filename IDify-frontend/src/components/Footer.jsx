import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-[#0a0a0a] text-gray-400 py-18 px-6 md:px-16 lg:px-24">
            {/* 80% width container to match the rest of your site's sections */}
            <div className="w-full lg:w-[80%] mx-auto">

                {/* Top Separator Line */}
                <div className="border-t border-white/10 mb-8 w-full"></div>

                {/* Footer Content Wrapper */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-[13px] tracking-wide">

                    {/* Left: Copyright */}
                    <div className="order-2 md:order-1 font-medium">
                        MaximumFids © {new Date().getFullYear()}. All rights reserved.
                    </div>

                    {/* Center: Contact Info */}
                    <div className="order-1 md:order-2 text-center uppercase font-bold text-gray-300">
                        Contact Us:
                        <a href="tel:+447497875324" className="ml-1 hover:text-blue-500 transition-colors">
                            +44 7497 875324
                        </a>
                        <span className="text-gray-400 ml-1">ON SIGNAL ONLY</span>
                    </div>

                    {/* Right: Navigation Links */}
                    <div className="order-3 flex gap-6 font-bold">
                        <Link to="/" className="hover:text-white transition-colors">Home</Link>
                        <Link to="/orders" className="hover:text-white transition-colors">Order</Link>
                        <Link to="/pricing" className="hover:text-white transition-colors">Pricing</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;