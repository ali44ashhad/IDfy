import React from 'react';

const HowToPay = () => {
  return (
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
  );
};

export default HowToPay;