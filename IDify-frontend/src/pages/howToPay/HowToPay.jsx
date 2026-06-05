import React from 'react';
 
const HowToPay = () => {
  return (
    <>
   <div className="bg-[#202121] text-white py-40 font-sans flex flex-col items-center">
      <div className="w-full max-w-3xl px-4">
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-left tracking-tight">
          How To Pay
        </h1>

        {/* Content Card */}
        <div className="bg-[#212529] border border-gray-500 rounded-lg p-5 md:p-6 shadow-xl">
          <p className="text-gray-300 mb-6 text-lg">
            You have <span className="font-bold text-white">two</span> main options to complete your crypto payment:
          </p>  

          {/* Section 1 */}
          <section className="mb-8">
            <h2 className="text-xl md:text-2xl font-bold text-white">
              1. Pay with Bitcoin (BTC)
            </h2>
            <ul className="list-disc ml-6 space-y-2 text-gray-300 text-base md:text-md">
              <li>On your order page, select Bitcoin as your preferred payment currency.</li>
              <li>Copy the generated BTC destination address or scan the provided QR code.</li>
              <li>Once ready, send the exact Bitcoin amount shown on the screen to complete the deposit.</li>
            </ul>
          </section>

          {/* Section 2 */}
          <section className="mb-2">
            <h2 className="text-xl md:text-2xl font-bold text-white">
              2. Pay with Litecoin (LTC)
            </h2>
            <p className="text-gray-400 mb-4 text-base md:text-md">
              If you prefer faster transaction confirmations and lower network fees, you can use Litecoin instead:
            </p>
            <ul className="list-disc ml-6 text-gray-300 md:text-md">
              <li>Switch your payment preference to Litecoin on the checkout screen.</li>
              <li>Copy the unique LTC wallet address generated specifically for your order.</li>
              <li>Send the required Litecoin total, ensuring you account for any wallet withdrawal fees.</li>
              <li>Keep your order window open; the invoice will automatically update once detected on the blockchain.</li>
            </ul>
          </section>

          {/* Footer Note */}
          <p className="text-gray-300 text-base md:text-md italic">
            If you ever have any questions, concerns, or worries, please contact us directly through Signal.
          </p>
        </div>
      </div>
    </div>

    {/* <div className="w-full mx-auto p-4 sm:p-6 bg-[#202121]">
      <div className="max-w-4xl mx-auto bg-[#202121] border border-gray-800 rounded-2xl shadow-xl overflow-hidden text-white">
        
         <div className="border-b border-gray-800 p-5">
          <h2 className="text-2xl font-bold">Payment Details</h2>
          <p className="text-gray-400 text-sm mt-1">
            Customers can pay using Bank Transfer, Bitcoin, or Litecoin.
          </p>
        </div>

        <div className="p-5 sm:p-6 space-y-6">
          
           <div className="bg-[#111111] border border-gray-800 rounded-xl p-4">
            <h3 className="text-lg font-semibold mb-4">
              Bank Transfer
            </h3>

            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                <span className="text-gray-400">Sort Code</span>
                <span className="font-medium">04-00-03</span>
              </div>

              <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                <span className="text-gray-400">Account Number</span>
                <span className="font-medium">45224430</span>
              </div>

              <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                <span className="text-gray-400">Account Name</span>
                <span className="font-medium">L O</span>
              </div>

              <div className="border-t border-gray-800 pt-4">
                <p className="text-sm text-gray-300 leading-relaxed">
                  If the account name does not match, it is because these are
                  initials. Please continue with the payment and use the
                  following reference:
                </p>

                <div className="mt-3 inline-flex items-center px-3 py-2 rounded-lg bg-white text-black font-semibold">
                  old clothes
                </div>
              </div>
            </div>
          </div>

           <div className="bg-[#111111] border border-orange-500/20 rounded-xl p-4">
            <h3 className="text-lg font-semibold text-orange-400 mb-3">
              Bitcoin
            </h3>

            <div className="bg-[#0A0A0A] border border-gray-700 rounded-lg p-3 break-all font-mono text-sm">
              34g8K27LVigu4QxbrpXbDi65BtRDjwGavf
            </div>
          </div>

           <div className="bg-[#111111] border border-blue-500/20 rounded-xl p-4">
            <h3 className="text-lg font-semibold text-blue-400 mb-3">
              Litecoin
            </h3>

            <div className="bg-[#0A0A0A] border border-gray-700 rounded-lg p-3 break-all font-mono text-sm">
              MRmrf1BEiy2T4XLt8jvus4F4rkXa2wUJfA
            </div>
          </div>

        </div>
      </div>
    </div> */}

     </>
  );
};

export default HowToPay;