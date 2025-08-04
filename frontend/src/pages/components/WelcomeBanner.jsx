// src/components/WelcomeBanner.jsx
import React from 'react';

const WelcomeBanner = () => {
  return (
    <div className="w-full h-[300px] md:h-[500px] relative">
      <img
        src="/images/banner1.jpg"
        alt="Welcome Banner"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-white text-4xl md:text-6xl font-bold mb-4">Welcome to TeachGear</h1>
        <p className="text-white text-lg md:text-2xl">Your trusted platform for tech learning and gadgets</p>
      </div>
    </div>
  );
};

export default WelcomeBanner;
