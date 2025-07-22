/*import React from 'react'

const Homepage = () => {
  return (
    <div>
      this is a Homepage.
    </div>
  )
}

export default Homepage*/
/*

import React, { useState } from 'react'


const Homepage = () => {
const [count, setCount] = useState(0);
if (count<-5){
alert("error");
setCount(0);
}

return (

<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">

<h1 className="text-3xl font-bold mb-4">React Counter with Tailwind</h1>

<p className="text-xl mb-4">Count: <span className="font-mono">{count}</span></p>

<div className="flex gap-4">

<button
onClick={() => setCount(count - 1)}
className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition">
Decrease
</button>


<button
onClick={() => setCount(0)}
className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition">
Reset
</button>

<button
onClick={() => setCount(count + 1)}
className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition">
Increase
</button>

</div>

</div>

);

};

export default Homepage*/ 

import React from 'react';
import { Truck, Shield, Headphones, CreditCard } from 'lucide-react';

const Homepage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-100 to-gray-200 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-gray-600 mb-2">Beats Solo</p>
              <h2 className="text-6xl font-bold text-gray-900 mb-6">
                Wireless
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-300 to-gray-500">
                  HEADPHONE
                </span>
              </h2>
              <button className="bg-red-500 text-white px-8 py-3 rounded-full hover:bg-red-600 transition-colors transform hover:scale-105">
                Shop By Category
              </button>
            </div>
            
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-80 h-80 bg-gradient-to-br from-gray-800 to-black rounded-full flex items-center justify-center transform hover:rotate-12 transition-transform duration-300">
                  <div className="w-64 h-64 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full flex items-center justify-center">
                    <div className="w-32 h-4 bg-red-500 rounded-full"></div>
                  </div>
                </div>
                <div className="absolute top-8 right-8 bg-white p-4 rounded-lg shadow-lg">
                  <h4 className="font-semibold text-gray-900 mb-1">Description</h4>
                  <p className="text-sm text-gray-600">
                    There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Categories Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Earphone */}
            <div className="bg-gray-900 rounded-2xl p-8 text-white relative overflow-hidden transform hover:scale-105 transition-transform">
              <div className="relative z-10">
                <p className="text-gray-300 mb-2">Enjoy</p>
                <h3 className="text-3xl font-bold mb-6">
                  With
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-600">
                    EARPHONE
                  </span>
                </h3>
                <button className="bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600 transition-colors">
                  Browse
                </button>
              </div>
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-red-500 rounded-full opacity-20"></div>
            </div>

            {/* Wearable */}
            <div className="bg-yellow-400 rounded-2xl p-8 text-black relative overflow-hidden transform hover:scale-105 transition-transform">
              <div className="relative z-10">
                <p className="text-gray-800 mb-2">New</p>
                <h3 className="text-3xl font-bold mb-6">
                  Wear
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-orange-600">
                    GADGETS
                  </span>
                </h3>
                <button className="bg-white text-black px-6 py-2 rounded-full hover:bg-gray-100 transition-colors">
                  Browse
                </button>
              </div>
              <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-orange-400 rounded-full opacity-30"></div>
            </div>

            {/* Laptop */}
            <div className="bg-red-500 rounded-2xl p-8 text-white relative overflow-hidden transform hover:scale-105 transition-transform">
              <div className="relative z-10">
                <p className="text-red-200 mb-2">Trend</p>
                <h3 className="text-3xl font-bold mb-6">
                  Devices
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-200 to-pink-200">
                    LAPTOP
                  </span>
                </h3>
                <button className="bg-white text-red-500 px-6 py-2 rounded-full hover:bg-gray-100 transition-colors">
                  Browse
                </button>
              </div>
              <div className="absolute -right-8 -bottom-8 w-40 h-32 bg-red-600 rounded-lg transform rotate-12 opacity-20"></div>
            </div>

            {/* Gaming Console */}
            <div className="bg-gray-200 rounded-2xl p-8 text-black relative overflow-hidden transform hover:scale-105 transition-transform">
              <div className="relative z-10">
                <p className="text-gray-600 mb-2">Best</p>
                <h3 className="text-3xl font-bold mb-6">
                  Gaming
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-500 to-gray-700">
                    CONSOLE
                  </span>
                </h3>
                <button className="bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600 transition-colors">
                  Browse
                </button>
              </div>
              <div className="absolute -right-4 -bottom-4 w-28 h-20 bg-gray-400 rounded-lg opacity-30"></div>
            </div>

            {/* VR Gaming */}
            <div className="bg-green-500 rounded-2xl p-8 text-white relative overflow-hidden transform hover:scale-105 transition-transform">
              <div className="relative z-10">
                <p className="text-green-200 mb-2">Play</p>
                <h3 className="text-3xl font-bold mb-6">
                  Game
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-200 to-green-300">
                    SETUP
                  </span>
                </h3>
                <button className="bg-white text-green-500 px-6 py-2 rounded-full hover:bg-gray-100 transition-colors">
                  Browse
                </button>
              </div>
              <div className="absolute -right-6 -top-6 w-32 h-32 bg-green-600 rounded-full opacity-20"></div>
            </div>

            {/* Amazon Speaker */}
            <div className="bg-blue-500 rounded-2xl p-8 text-white relative overflow-hidden transform hover:scale-105 transition-transform">
              <div className="relative z-10">
                <p className="text-blue-200 mb-2">New</p>
                <h3 className="text-3xl font-bold mb-6">
                  Amazon
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-blue-300">
                    SPEAKER
                  </span>
                </h3>
                <button className="bg-white text-blue-500 px-6 py-2 rounded-full hover:bg-gray-100 transition-colors">
                  Browse
                </button>
              </div>
              <div className="absolute -right-4 -bottom-4 w-24 h-32 bg-blue-600 rounded-full opacity-20"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-6 h-6 text-red-500" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Free Shipping</h4>
              <p className="text-sm text-gray-600">Free shipping over $99</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-red-500" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Money Guarantee</h4>
              <p className="text-sm text-gray-600">Within 30 days</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Headphones className="w-6 h-6 text-red-500" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Online Support 24/7</h4>
              <p className="text-sm text-gray-600">Technical support</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard className="w-6 h-6 text-red-500" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Secure Payment</h4>
              <p className="text-sm text-gray-600">All cards accepted</p>
            </div>
          </div>
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-3xl overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-8 items-center p-12">
              <div className="relative">
                <div className="w-64 h-48 bg-red-600 rounded-2xl transform -rotate-12 mx-auto"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-48 h-32 bg-red-400 rounded-xl transform rotate-12"></div>
                </div>
              </div>
              
              <div className="text-white">
                <div className="mb-4">
                  <span className="bg-white text-red-500 px-3 py-1 rounded-full text-sm font-semibold">
                    20% OFF
                  </span>
                </div>
                <h2 className="text-4xl font-bold mb-4">
                  FIND NEW
                  <br />
                  SMILE
                </h2>
                <p className="text-red-100 mb-2">15 Nov To 7 Dec</p>
                <div className="mb-6">
                  <p className="text-sm text-red-100">Beats Solo Air</p>
                  <h3 className="text-2xl font-bold">Summer Sale</h3>
                  <p className="text-sm text-red-100 mt-2">
                    Company has a proven track of 70 to 80 employees in the last 12 months
                  </p>
                </div>
                <button className="bg-white text-red-500 px-8 py-3 rounded-full hover:bg-gray-100 transition-colors font-semibold">
                  Shop
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Best Seller Section Header */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Best Seller Products</h2>
            <p className="text-gray-600">Speaker/There are many variations passages</p>
          </div>
          
          {/* Product Grid Placeholder */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="bg-gray-100 rounded-2xl p-6 text-center group hover:shadow-lg transition-shadow">
                <div className="w-full h-48 bg-gray-200 rounded-xl mb-4 flex items-center justify-center group-hover:bg-gray-300 transition-colors">
                  <div className="w-24 h-24 bg-gray-400 rounded-full"></div>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Product Name</h4>
                <p className="text-red-500 font-bold">$299.99</p>
                <button className="mt-4 bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100">
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;