import React, { useState, useEffect } from 'react';
import { Truck, Shield, Headphones, CreditCard, ChevronLeft, ChevronRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper';
import { Link } from 'react-router-dom';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const slides = [
  {
    id: 'welcome',
    title: "Welcome to TeachGear",
    subtitle: "Your trusted platform for tech learning and gadgets",
    image: "/images/banner1.jpg",
    isWelcome: true,
    link: null,
  },
  {
    id: 1,
    title: "Latest Tech Deals!",
    subtitle: "Grab the best gadgets at unbeatable prices.",
    image: "/images/banner1.jpg",
    link: "/products",
  },
  {
    id: 2,
    title: "New Arrival: Wireless Headphones",
    subtitle: "Experience true wireless freedom and crystal clear sound.",
    image: "/images/banner2.jpg",
    link: "/products",
  },
  {
    id: 3,
    title: "Top Keyboards Sale",
    subtitle: "Mechanical keyboards for all types of gamers and coders.",
    image: "/images/banner3.jpg",
    link: "/products",
  },
];

const categories = [
  {
    title: "EARPHONE",
    subtitle: "Enjoy",
    description: "With",
    bgColor: "from-gray-900 to-black",
    textColor: "text-white",
    accentColor: "bg-red-500",
    buttonStyle: "bg-red-500 hover:bg-red-600 text-white"
  },
  {
    title: "GADGETS",
    subtitle: "New",
    description: "Wear",
    bgColor: "from-yellow-400 to-yellow-500",
    textColor: "text-black",
    accentColor: "bg-orange-400",
    buttonStyle: "bg-white hover:bg-gray-100 text-black"
  },
  {
    title: "LAPTOP",
    subtitle: "Trend",
    description: "Devices",
    bgColor: "from-red-500 to-red-600",
    textColor: "text-white",
    accentColor: "bg-red-600",
    buttonStyle: "bg-white hover:bg-gray-100 text-red-500"
  },
  {
    title: "CONSOLE",
    subtitle: "Best",
    description: "Gaming",
    bgColor: "from-gray-200 to-gray-300",
    textColor: "text-black",
    accentColor: "bg-gray-400",
    buttonStyle: "bg-red-500 hover:bg-red-600 text-white"
  },
  {
    title: "SETUP",
    subtitle: "Play",
    description: "Game",
    bgColor: "from-green-500 to-green-600",
    textColor: "text-white",
    accentColor: "bg-green-600",
    buttonStyle: "bg-white hover:bg-gray-100 text-green-500"
  },
  {
    title: "SPEAKER",
    subtitle: "New",
    description: "Amazon",
    bgColor: "from-blue-500 to-blue-600",
    textColor: "text-white",
    accentColor: "bg-blue-600",
    buttonStyle: "bg-white hover:bg-gray-100 text-blue-500"
  }
];

const features = [
  {
    icon: <Truck className="w-6 h-6" />,
    title: "Free Shipping",
    description: "Free shipping over $99",
    bgColor: "bg-red-100",
    iconColor: "text-red-500"
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Money Guarantee",
    description: "Within 30 days",
    bgColor: "bg-blue-100",
    iconColor: "text-blue-500"
  },
  {
    icon: <Headphones className="w-6 h-6" />,
    title: "Online Support 24/7",
    description: "Technical support",
    bgColor: "bg-green-100",
    iconColor: "text-green-500"
  },
  {
    icon: <CreditCard className="w-6 h-6" />,
    title: "Secure Payment",
    description: "All cards accepted",
    bgColor: "bg-purple-100",
    iconColor: "text-purple-500"
  }
];

const Homepage = ({ darkMode }) => {
  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({
              ...prev,
              [entry.target.id]: true
            }));
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`min-h-screen flex flex-col theme-transition ${
        darkMode
          ? 'bg-gradient-to-br from-gray-900 via-slate-900 to-indigo-900'
          : 'bg-gradient-to-br from-teal-200 via-teal-300 to-purple-300'
      }`}
      style={{
        background: darkMode
          ? 'linear-gradient(135deg, var(--bg-primary, #0f172a) 0%, var(--bg-secondary, #1e293b) 50%, #1e1b4b 100%)'
          : 'linear-gradient(135deg, #a3bffa 0%, #c4b5fd 50%, #d8b4fe 100%)',
      }}
    >
      {/* Hero Section with Swiper Slider */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20 animate-pulse"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full text-sm font-semibold mb-6 animate-bounce">
              🚀 Welcome to the Future of Tech
            </div>
            <h1 className={`text-5xl md:text-7xl font-black ${darkMode ? 'text-white' : 'text-gray-900'} mb-6 leading-tight`}>
              Latest Tech
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-light text-teal-500 dark:from-teal-400 dark:to-teal-400">
                Deals!
              </span>
            </h1>
            <p className={`text-xl md:text-2xl ${darkMode ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto leading-relaxed mb-12`}>
              Grab the best educational gadgets at unbeatable prices. Transform your learning experience with cutting-edge technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/products"
                className={`px-8 py-4 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-2xl font-bold text-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex items-center space-x-2 ${
                  darkMode ? 'hover:from-indigo-600 hover:to-purple-700' : 'hover:from-indigo-700 hover:to-purple-700'
                }`}
                style={{ background: 'linear-gradient(135deg, var(--primary) 0%, #8b5cf6 100%)' }}
              >
                <span>Shop By Category</span>
                <ChevronRight className="w-5 h-5" />
              </Link>
              <Link
                to="/about"
                className={`px-8 py-4 ${darkMode ? 'bg-gray-800/90' : 'bg-white/80'} backdrop-blur-md text-gray-900 dark:text-white rounded-2xl font-bold text-lg hover:bg-white hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-gray-200 dark:border-gray-700`}
              >
                Learn More
              </Link>
            </div>
          </div>
          <div className="relative">
            <Swiper
              modules={[Autoplay, Pagination, Navigation]}
              spaceBetween={30}
              slidesPerView={1}
              loop={true}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              pagination={{
                clickable: true,
                bulletClass: 'swiper-pagination-bullet !bg-teal-500 dark:!bg-teal-400',
                bulletActiveClass: 'swiper-pagination-bullet-active !bg-teal-600 dark:!bg-teal-300'
              }}
              navigation={{
                nextEl: '.swiper-button-next-custom',
                prevEl: '.swiper-button-prev-custom',
              }}
              className="w-full h-96 sm:h-[500px] rounded-3xl overflow-hidden shadow-2xl"
            >
              {slides.map((slide) => (
                <SwiperSlide key={slide.id}>
                  {slide.isWelcome ? (
                    <div className="relative w-full h-full">
                      <img
                        src={slide.image}
                        alt="Welcome Banner"
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-center items-center text-center px-4">
                        <h2 className="text-white text-4xl sm:text-6xl font-black mb-4 drop-shadow-lg">{slide.title}</h2>
                        <p className="text-white text-lg sm:text-2xl max-w-2xl drop-shadow-md">{slide.subtitle}</p>
                      </div>
                    </div>
                  ) : (
                    <Link
                      to={slide.link || '/'}
                      className="block relative w-full h-full group"
                      aria-label={slide.title}
                    >
                      <img
                        src={slide.image}
                        alt={slide.title}
                        className="w-full h-full object-cover rounded-3xl transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-8 rounded-3xl">
                        <h3 className="text-white text-3xl font-extrabold mb-2 drop-shadow-lg">{slide.title}</h3>
                        <p className="text-white text-lg drop-shadow-md">{slide.subtitle}</p>
                      </div>
                    </Link>
                  )}
                </SwiperSlide>
              ))}
              <div className="swiper-button-prev-custom absolute top-1/2 -left-8 z-20 w-10 h-10 bg-teal-600/80 text-white rounded-full flex items-center justify-center cursor-pointer hover:bg-teal-700 transition">
                <ChevronLeft className="w-6 h-6" />
              </div>
              <div className="swiper-button-next-custom absolute top-1/2 -right-8 z-20 w-10 h-10 bg-teal-600/80 text-white rounded-full flex items-center justify-center cursor-pointer hover:bg-teal-700 transition">
                <ChevronRight className="w-6 h-6" />
              </div>
            </Swiper>
          </div>
        </div>
      </section>

      {/* Category Cards Section */}
      <section
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
        aria-label="Shop By Category"
      >
        {categories.map(({ title, subtitle, description, bgColor, textColor, accentColor, buttonStyle }) => (
          <article
            key={title}
            id={`category-${title}`}
            data-animate
            className={`relative flex flex-col items-center justify-center rounded-xl p-6 shadow-lg cursor-pointer group overflow-hidden theme-transition ${textColor}`}
            style={{ background: `linear-gradient(135deg, var(--${bgColor.replace('from-', '').replace(' to-', '')}-start), var(--${bgColor.replace('from-', '').replace(' to-', '')}-end))` }}
          >
            <h2 className="font-extrabold text-2xl mb-2">{title}</h2>
            <h3 className={`text-4xl font-black uppercase ${accentColor} mb-1`}>{subtitle}</h3>
            <p className="text-lg mb-4">{description}</p>
            <button
              className={`uppercase font-bold py-3 px-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg ${buttonStyle}`}
              aria-label={`Shop for ${title}`}
            >
              Shop Now
            </button>
            <span className={`absolute bottom-0 left-0 right-0 h-1 rounded-t-lg ${accentColor} transition-all group-hover:h-2`}></span>
          </article>
        ))}
      </section>

      {/* Features Section */}
      <section
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8"
        aria-label="Platform Features"
      >
        {features.map(({ icon, title, description, bgColor, iconColor }) => (
          <article
            key={title}
            className={`flex flex-col items-center justify-center rounded-xl p-6 shadow-lg ${bgColor} theme-transition`}
            data-animate
          >
            <div className={`p-4 rounded-full mb-4 ${iconColor} bg-white bg-opacity-70`}>
              {icon}
            </div>
            <h3 className={`text-xl font-bold mb-2 text-center`}>{title}</h3>
            <p className="text-center text-gray-700 dark:text-gray-300">{description}</p>
          </article>
        ))}
      </section>
    </div>
  );
};

export default Homepage; 
