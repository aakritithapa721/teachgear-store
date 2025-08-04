import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper'; // Import modules here

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


const banners = [
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

export default function Banner() {
  return (
    <Swiper
      modules={[Autoplay, Pagination, Navigation]}
      spaceBetween={30}
      slidesPerView={1}
      loop={true}
      autoplay={{ delay: 4000, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      navigation
      className="w-full h-64 sm:h-96 rounded-lg overflow-hidden shadow-lg"
    >
      {banners.map((banner) => (
        <SwiperSlide key={banner.id}>
          <a href={banner.link} className="block w-full h-full relative">
            <img
              src={banner.image}
              alt={banner.title}
              className="w-full h-full object-cover brightness-90 hover:brightness-100 transition duration-300"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-start p-6 sm:p-12 text-white">
              <h2 className="text-2xl sm:text-4xl font-bold mb-2">{banner.title}</h2>
              <p className="text-sm sm:text-lg max-w-md">{banner.subtitle}</p>
            </div>
          </a>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
