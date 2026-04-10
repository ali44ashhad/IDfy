import React from 'react';

const FAQData = [
  {
    question: "Are These IDs Scannable?",
    answer: "Yes, all our IDs are fully scannable, showcasing accurate security features and details to allow the correct information to display when scanned."
  },
  {
    question: "What is the difference between Polycarbonate and Non-Polycarbonate IDs?",
    answer: "The normal cards are made out of 'Teslin'. The look and design is identical, however Polycarbonate is more rigid, thinner but can bend further than Teslin. For High end bars and nightclubs, and wetherspoons we highly recommend Polycarbonate."
  },
  {
    question: "What security features do the IDs have?",
    answer: "Raised Text, Realistic hologram, UV Reflections and many others, contact me for a more detailed list!"
  },
  {
    question: "How can I contact support?",
    answer: "You can message us on either Signal (on the bottom of the page) or Snapchat using 'idify'."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We currently only accept Litecoin directly; please contact our resellers to pay through other methods."
  },
  {
    question: "Do we offer Discounts?",
    answer: "We offer discounts depending on the size of your group, as seen in pricing. We can also offer a further 15% off if you pay by Crypto."
  },
  {
    question: "Do we get 2 copies of the IDs?",
    answer: "Yes, all IDs come with a free spare copy, in case you misplace it!"
  },
  {
    question: "How do you ship the IDs?",
    answer: "We use stealth shipping methods to ensure your privacy and security. IDs are packaged discreetly to avoid detection, hidden within a random product."
  },
  {
    question: "How long does shipping take?",
    answer: "Standard shipping usually takes between 12-20 days, express saves a couple days. Please note, we are not Amazon; we do our best to match our shipping times but it cannot be guaranteed!"
  },
  {
    question: "Where do we Ship?",
    answer: "We ship to anywhere in the world, from China. Currently shipping times show estimated for the UK, contact me for specific timings to other countries."
  }
];

const FAQSection = () => {
  return (
    <div className="bg-[#121212] text-white py-40 font-sans">
      <div className="max-w-3xl mx-auto px-4">
        {/* Header */}
        <h1 className="text-4xl md:text-5xl font-semibold mb-8 tracking-tight">
          Frequently Asked Questions
        </h1>

        {/* FAQ List */}
        <div className="space-y-4">
          {FAQData.map((faq, index) => (
            <div 
              key={index} 
              className="bg-[#1e2128] border border-gray-500 rounded-lg p-6 transition-all hover:border-gray-500"
            >
              <h2 className="text-xl font-semibold mb-3 text-gray-100">
                {faq.question}
              </h2>
              <p className="text-white text-base font-semibold md:text-sm leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQSection;