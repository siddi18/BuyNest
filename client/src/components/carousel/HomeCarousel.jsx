import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { homeCarouselData } from "./HomeCarouselData";
//import { useNavigate } from "react-router-dom";

const handleDragStart = (e) => e.preventDefault();

const HomeCarousel = () => {
  //const navigate = useNavigate();
  const item = homeCarouselData.map((item) => (
    <img
      className="w-full h-[400px] object-cover rounded-2xl shadow-lg transition-transform duration-500 group-hover:scale-105"
      
      src={item.image}
      alt=""
      onDragStart={handleDragStart}
      role="presentation"
    />
  ));
  return (
    <AliceCarousel
      mouseTracking
      items={item}
      autoPlay
      infinite
      autoPlayInterval={2000}
      disableButtonsControls
      
    />
  );
};

export default HomeCarousel;