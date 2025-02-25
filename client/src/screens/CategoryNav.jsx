// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const categoriesData = [
//   { name: "Shoes", image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=400&h=400', count: '2,345', featured: true },
//   { name: 'Kurthas', image: 'https://valintaformens.com/cdn/shop/products/photo_2023-03-27_02-27-21.jpg?v=1681723151&width=360', count: '1,829', featured: false },
//   { name: 'Gowns', image: 'https://i.pinimg.com/736x/88/78/a0/8878a02817fee8d7eb50db436d64fc46.jpg', count: '3,156', featured: false },
//   { name: "Lehengas", image: 'https://foxyindian.com/cdn/shop/files/RoyalHeritageBridalLehenga1.jpg?v=1693238041', count: '982', featured: true },
//   { name: "Kurthis", image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9SK4mVtfMhDalOiUakW45yrRL0xJm-kcWJQ&s', count: '1,547', featured: false },
//   { name: 'Dresses', image: 'https://i.pinimg.com/474x/d5/cd/e2/d5cde22e18c90fa34e50a4c691c0d619.jpg', count: '2,789', featured: true },
//   { name: 'Jewelerries', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM0u8ulJcOosgzYsVa3vJUqWxxAOE1IlChhA&s', count: '1,234', featured: false },
//   { name: 'Handbags', image: 'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&q=80&w=600&h=600', count: '956', featured: false }
// ];

// const SkeletonLoader = () => (
//   <div className="group relative flex flex-col items-center cursor-pointer">
//     <div className="relative mb-4">
//       {/* Circle Skeleton */}
//       <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full bg-gray-300 animate-pulse"></div>
//     </div>

//     {/* Single Line Text Skeleton */}
//     <div className="h-4 w-32 bg-gray-300 rounded animate-pulse"></div>
//   </div>
// );


// const CategoryNav = () => {
//   const navigate = useNavigate();
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     setLoading(true);
//     setTimeout(() => {
//       setCategories(categoriesData);
//       setLoading(false);
//     }, 2000); // Simulating API delay
//   }, []);

//   return (
//     <section className="relative bg-gradient-to-b from-white via-gray-50 to-white pt-8">
//       <div className="relative max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 pb-8">
//         <div className="grid grid-cols-2 gap-x-12 gap-y-16 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-8 sm:gap-x-16 lg:gap-x-20">
//           {loading
//             ? Array(8).fill(0).map((_, index) => <SkeletonLoader key={index} />)
//             : categories.map((category) => (
//                 <div
//                   key={category.name}
//                   onClick={() => navigate(`category/${category.name}`)}
//                   className="group relative flex flex-col items-center cursor-pointer"
//                 >
//                   <div className="relative mb-6">
//                     {/* Main Image Container */}
//                     <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-full overflow-hidden 
//                                   shadow-xl transition-all duration-500 ease-out
//                                   group-hover:shadow-2xl group-hover:scale-105
//                                   ring-4 ring-white group-hover:ring-indigo-50
//                                   before:absolute before:inset-0 before:z-10 before:bg-black/10 before:transition-opacity before:duration-300
//                                   group-hover:before:opacity-0">
//                       <img
//                         src={category.image}
//                         alt={category.name}
//                         className="w-full h-full object-cover transition duration-700 ease-out
//                                   group-hover:scale-110 group-hover:rotate-3"
//                       />
//                     </div>

//                     {/* Item Count Badge */}
//                     <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2
//                                   bg-white text-gray-900 text-xs font-medium px-3 py-1.5 rounded-full
//                                   opacity-0 group-hover:opacity-100 transition-all duration-300
//                                   shadow-lg border border-gray-100 whitespace-nowrap">
//                       {category.count} Products
//                     </div>

//                     {/* Featured Badge */}
//                     {category.featured && (
//                       <div className="absolute -top-2 right-0 bg-indigo-600 text-white text-xs font-medium
//                                     px-2.5 py-1 rounded-full shadow-md transform translate-x-1/4">
//                         Featured
//                       </div>
//                     )}
//                   </div>

//                   <div className="text-center group-hover:transform group-hover:translate-y-1 transition-transform duration-300">
//                     <h3 className="text-base font-semibold text-gray-900 group-hover:text-indigo-600
//                                   transition-colors duration-300 mb-1">
//                       {category.name}
//                     </h3>
//                   </div>
//                 </div>
//               ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default CategoryNav;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const categoriesData = [
  { name: "Shoes", image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=400&h=400', count: '2,345', featured: true },
  { name: 'Kurthas', image: 'https://valintaformens.com/cdn/shop/products/photo_2023-03-27_02-27-21.jpg?v=1681723151&width=360', count: '1,829', featured: false },
  { name: 'Gowns', image: 'https://i.pinimg.com/736x/88/78/a0/8878a02817fee8d7eb50db436d64fc46.jpg', count: '3,156', featured: false },
  { name: "Lehengas", image: 'https://foxyindian.com/cdn/shop/files/RoyalHeritageBridalLehenga1.jpg?v=1693238041', count: '982', featured: true },
  { name: "Kurthis", image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9SK4mVtfMhDalOiUakW45yrRL0xJm-kcWJQ&s', count: '1,547', featured: false },
  { name: 'Dresses', image: 'https://i.pinimg.com/474x/d5/cd/e2/d5cde22e18c90fa34e50a4c691c0d619.jpg', count: '2,789', featured: true },
  { name: 'Jewelerries', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM0u8ulJcOosgzYsVa3vJUqWxxAOE1IlChhA&s', count: '1,234', featured: false },
  { name: 'Handbags', image: 'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&q=80&w=600&h=600', count: '956', featured: false }
];

const SkeletonLoader = () => (
  <div className="group relative flex flex-col items-center cursor-pointer">
    <div className="relative mb-4">
      {/* Circle Skeleton */}
      <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gray-300 animate-pulse"></div>
    </div>
    {/* Single Line Text Skeleton */}
    <div className="h-4 w-24 sm:w-32 bg-gray-300 rounded animate-pulse"></div>
  </div>
);

const CategoryNav = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setCategories(categoriesData);
      setLoading(false);
    }, 2000); // Simulating API delay
  }, []);

  return (
    <section className="relative bg-gradient-to-b from-white via-gray-50 to-white pt-6 pb-8">
      <div className="relative max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-3 gap-x-4 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 sm:gap-x-6 lg:gap-x-10">
          {loading
            ? Array(8).fill(0).map((_, index) => <SkeletonLoader key={index} />)
            : categories.map((category) => (
                <div
                  key={category.name}
                  onClick={() => navigate(`category/${category.name}`)}
                  className="group relative flex flex-col items-center cursor-pointer"
                >
                  <div className="relative mb-4">
                    {/* Main Image Container */}
                    <div className="relative w-24 h-24 sm:w-32 sm:h-32 lg:w-36 lg:h-36 rounded-full overflow-hidden 
                                  shadow-lg transition-all duration-500 ease-out
                                  group-hover:shadow-xl group-hover:scale-105
                                  ring-4 ring-white group-hover:ring-indigo-50
                                  before:absolute before:inset-0 before:z-10 before:bg-black/10 before:transition-opacity before:duration-300
                                  group-hover:before:opacity-0">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover transition duration-700 ease-out
                                  group-hover:scale-110 group-hover:rotate-3"
                      />
                    </div>

                    {/* Item Count Badge */}
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2
                                  bg-white text-gray-900 text-xs font-medium px-3 py-1.5 rounded-full
                                  opacity-0 group-hover:opacity-100 transition-all duration-300
                                  shadow-lg border border-gray-100 whitespace-nowrap">
                      {category.count} Products
                    </div>

                    {/* Featured Badge */}
                    {category.featured && (
                      <div className="absolute -top-2 right-0 bg-indigo-600 text-white text-xs font-medium
                                    px-2.5 py-1 rounded-full shadow-md transform translate-x-1/4">
                        Featured
                      </div>
                    )}
                  </div>

                  <div className="text-center group-hover:transform group-hover:translate-y-1 transition-transform duration-300">
                    <h3 className="text-sm sm:text-base font-semibold text-gray-900 group-hover:text-indigo-600
                                  transition-colors duration-300 mb-1">
                      {category.name}
                    </h3>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryNav;

