import React from "react";
import Navbar from "../components/Navbar";
// import PartnerWithStoreRegister from "../components/PartnerWithStoreRegister";

const Partner = () => {
  return (
    <>
      <div className="relative w-full h-screen">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('/assets/landing-page/background.jpg')`,
            filter: "contrast(100%) brightness(30%)",
          }}
        ></div>
        <div className="relative z-10 flex flex-col h-full text-white">
          <Navbar />
          <div className="flex-1 flex flex-col lg:flex-row items-center justify-center gap-12 px-8">
            <div className="bg-white bg-opacity-10 p-6 rounded-xl border border-white backdrop-blur-sm text-black max-w-md w-full mb-6 md:mb-0">
              <h3 className="text-xl font-semibold mb-4 poppins-font">Partner with OnTheRocks</h3>
              <p className="text-sm poppins-font mb-4">
                Interested in collaborating with us? We welcome your inquiries about joining our platform.
                Please email us at <span className="font-semibold">agojo.eljohn@gmail.com</span> with details
                about your liquor store, including your store address, operating hours, and the products you offer.
              </p>
              <p className="text-sm poppins-font mb-4">
                Tell us how you’d like to integrate with OnTheRocks, and be sure to explain why you believe
                partnering with us would benefit your store and our customers. Our team will get back to you
                promptly to discuss potential next steps.
              </p>
            </div>
            <div className="grid grid-cols-1 max-w-md w-full hidden md:block">
              <div className="bg-white bg-opacity-10 p-6 rounded-xl border border-white backdrop-blur-sm text-black mb-6">
                <h3 className="text-xl font-semibold mb-4 poppins-font">Real-Time Analytics</h3>
                <p className="text-sm poppins-font mb-4">
                  Track your store’s performance with detailed reports on sales trends, customer behavior, and inventory turnover.
                </p>
              </div>
              <div className="bg-white bg-opacity-10 p-6 rounded-xl border border-white backdrop-blur-sm text-black mb-6">
                <h3 className="text-xl font-semibold mb-4 poppins-font">Instant Payouts</h3>
                <p className="text-sm poppins-font mb-4">
                  Get paid instantly for every order you fulfill with no hidden delays, keeping your cash flow uninterrupted.
                </p>
              </div>
              <div className="bg-white bg-opacity-10 p-6 rounded-xl border border-white backdrop-blur-sm text-black">
                <h3 className="text-xl font-semibold mb-4 poppins-font">Loyalty Integrations</h3>
                <p className="text-sm poppins-font mb-4">
                  Sync with OnTheRocks loyalty rewards to retain customers, offering them points and perks exclusive to your store.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Partner;
