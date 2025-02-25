// import AliceCarousel from "react-alice-carousel";
// import HomeProductCard from "./HomeProductCard";
// import { useState, useRef } from "react";

// const HomeProductSection = ({ section, data }) => {
//   const [activeIndex, setActiveIndex] = useState(0);
//   const carouselRef = useRef(null);
//   const totalSlides = data?.length || 0;

//   const slidePrev = () => {
//     if (carouselRef.current) {
//       const newIndex = Math.max(activeIndex - 1, 0);
//       setActiveIndex(newIndex);
//       carouselRef.current.slideTo(newIndex);
//     }
//   };

//   const slideNext = () => {
//     if (carouselRef.current) {
//       const newIndex = Math.min(activeIndex + 1, totalSlides - 1);
//       setActiveIndex(newIndex);
//       carouselRef.current.slideTo(newIndex);
//     }
//   };

//   const syncActiveIndex = (event) => {
//     setActiveIndex(event.item);
//   };

//   const responsive = {
//     0: { items: 2, itemsFit: "contain" },
//     568: { items: 3, itemsFit: "contain" },
//     1024: { items: 4.5, itemsFit: "contain" }, // Ensure at least 5 items show
//   };

//   const items = data?.map((item, index) => (
//     <div key={index}>
//       <HomeProductCard product={item} />
//     </div>
//   ));

//   return (
//     <div className="relative px-4 sm:px-6 lg:px-8">
//       <h2 className="text-2xl font-extrabold text-gray-900 py-5">{section}</h2>
//       <div className="relative border border-transparent p-5">
//         <AliceCarousel
//           ref={carouselRef}
//           disableButtonsControls
//           disableDotsControls
//           mouseTracking
//           items={items}
//           responsive={responsive}
//           onSlideChanged={syncActiveIndex}
//           animationType="fadeout"
//           animationDuration={1000}
//         />

//         {/* Left Button */}
//         {activeIndex > 0 && (
//           <button
//             onClick={slidePrev}
//             className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-lg"
//             aria-label="prev"
//           >
//             <svg
//               className="w-6 h-6"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
//             </svg>
//           </button>
//         )}

//         {/* Right Button */}
//         {activeIndex < totalSlides - 1 && (
//           <button
//             onClick={slideNext}
//             className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-lg"
//             aria-label="next"
//           >
//             <svg
//               className="w-6 h-6"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
//             </svg>
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default HomeProductSection;



import AliceCarousel from "react-alice-carousel";
import HomeProductCard from "./HomeProductCard";
import { useState, useRef } from "react";

const HomeProductSection = ({ section, data, isLoading }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef(null);
  const totalSlides = data?.length || 0;

  const slidePrev = () => {
    if (carouselRef.current) {
      const newIndex = Math.max(activeIndex - 1, 0);
      setActiveIndex(newIndex);
      carouselRef.current.slideTo(newIndex);
    }
  };

  const slideNext = () => {
    if (carouselRef.current) {
      const newIndex = Math.min(activeIndex + 1, totalSlides - 1);
      setActiveIndex(newIndex);
      carouselRef.current.slideTo(newIndex);
    }
  };

  const syncActiveIndex = (event) => {
    setActiveIndex(event.item);
  };

  const responsive = {
    0: { items: 1.2, itemsFit: "contain" },
    568: { items: 3, itemsFit: "contain" },
    1024: { items: 4.5, itemsFit: "contain" }, // Ensure at least 5 items show
  };

  // Skeleton Loader Items
  const skeletonItems = Array(5)
    .fill(null)
    .map((_, index) => (
      <div key={index}>
        <HomeProductCard isLoading={true} />
      </div>
    ));

  // Actual Product Items
  const items = data?.map((item, index) => (
    <div key={index}>
      <HomeProductCard product={item} />
    </div>
  ));

  return (
    <div className="relative px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-extrabold text-gray-900 py-5">{section}</h2>
      <div className="relative border border-transparent p-5">
        <AliceCarousel
          ref={carouselRef}
          disableButtonsControls
          disableDotsControls
          mouseTracking
          items={isLoading ? skeletonItems : items} // Show skeleton while loading
          responsive={responsive}
          onSlideChanged={syncActiveIndex}
          animationType="fadeout"
          animationDuration={1000}
        />

        {/* Left Button */}
        {!isLoading && activeIndex > 0 && (
          <button
            onClick={slidePrev}
            className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-lg"
            aria-label="prev"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        {/* Right Button */}
        {!isLoading && activeIndex < totalSlides - 1 && (
          <button
            onClick={slideNext}
            className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-lg"
            aria-label="next"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default HomeProductSection;

