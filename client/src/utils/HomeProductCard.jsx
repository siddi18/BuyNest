import React from "react";
import { Link } from "react-router-dom";

const HomeProductCard = ({ product }) => {
  return (
    <Link to={`/products/${product?._id}`} className="group">
      <div className="cursor-pointer bg-white rounded-xl shadow-xl overflow-hidden w-60 mx-3 transform transition duration-300 hover:scale-105 hover:shadow-2xl">
        
        {/* Image Container */}
        <div className="h-56 w-full bg-gray-100 flex items-center justify-center overflow-hidden">
          <img
            className="w-full h-full object-cover object-top rounded-t-xl"
            src={product?.image || product?.imageUrl}
            alt={product?.title}
          />
        </div>

        {/* Content */}
        <div className="p-4 text-center">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition">
            {product?.brand || product?.title}
          </h3>
          <p className="text-sm text-gray-600 mt-1">{product?.name}</p>

          {/* Price */}
          {product?.price && (
            <p className="text-lg font-bold text-gray-800 mt-2">
              ₹{product?.price}
            </p>
          )}

          {/* Add to Cart Button */}
          <button className="mt-3 w-full bg-blue-600 text-white py-2 rounded-lg text-sm font-medium transition hover:bg-blue-700">
            View Product
          </button>
        </div>
      </div>
    </Link>
  );
};

export default HomeProductCard;
