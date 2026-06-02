import React from 'react';
import Footer from '../../components/Footer';

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
            You have <span className="font-bold text-white">two</span> ways to complete your purchase:
          </p>  

          {/* Section 1 */}
          <section className="mb-8">
            <h2 className="text-xl md:text-2xl font-bold text-white">
              1. Pay with Crypto
            </h2>
            <ul className="list-disc ml-6 space-y-2 text-gray-300 text-base md:text-md">
              <li>On your order page, you can purchase with crypto yourself.</li>
              <li>Or, if you're under 18, ask someone over 18 to purchase on your behalf.</li>
              <li>Once ready, click <span className="font-bold text-white">Pay</span> and send the required Litecoin amount to the address shown.</li>
            </ul>
          </section>

          {/* Section 2 */}
          <section className="mb-2">
            <h2 className="text-xl md:text-2xl font-bold text-white">
              2. Pay through a Reseller
            </h2>
            <p className="text-gray-400 mb-4 text-base md:text-md">
              We are unable to handle bank transfers directly, so we partner with trusted resellers. To use a reseller:
            </p>
            <ul className="list-disc ml-6 text-gray-300 md:text-md">
              <li>Create an Order from the Order Screen</li>
              <li>Click the 'Speak To Us' button on your order page.</li>
              <li>Ask any questions, and request how you would like to pay.</li>
              <li>We will get back to you as quickly as possible, just keep checking your order page to see if we responded!</li>
            </ul>
          </section>

          {/* Footer Note */}
          <p className="text-gray-300 text-base md:text-md italic">
            If you ever have any questions, concerns, or worries, please contact us directly through Signal.
          </p>
        </div>
      </div>
    </div>


    <div className="w-full mx-auto p-4 sm:p-6 bg-[#202121]">
      <div className="max-w-4xl mx-auto bg-[#202121] border border-gray-800 rounded-2xl shadow-xl overflow-hidden text-white">
        
        {/* Header */}
        <div className="border-b border-gray-800 p-5">
          <h2 className="text-2xl font-bold">Payment Details</h2>
          <p className="text-gray-400 text-sm mt-1">
            Customers can pay using Bank Transfer, Bitcoin, or Litecoin.
          </p>
        </div>

        <div className="p-5 sm:p-6 space-y-6">
          
          {/* Bank Transfer */}
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

          {/* Bitcoin */}
          <div className="bg-[#111111] border border-orange-500/20 rounded-xl p-4">
            <h3 className="text-lg font-semibold text-orange-400 mb-3">
              Bitcoin
            </h3>

            <div className="bg-[#0A0A0A] border border-gray-700 rounded-lg p-3 break-all font-mono text-sm">
              34g8K27LVigu4QxbrpXbDi65BtRDjwGavf
            </div>
          </div>

          {/* Litecoin */}
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
    </div>

    <Footer/>
    </>
  );
};

export default HowToPay;