import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const SearchResults = () => {
  const { keyword } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`http://localhost:5000/api/products?search=${keyword}`);
        setProducts(data);
      } catch (err) {
        setError("Failed to fetch products. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [keyword]);
  console.log('products:',products);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold text-gray-800">
        Search Results for: <span className="text-blue-600">{keyword}</span>
      </h2>

      {loading ? (
        <p className="text-gray-600 mt-4">Loading products...</p>
      ) : error ? (
        <p className="text-red-500 mt-4">{error}</p>
      ) : products.length === 0 ? (
        <p className="text-gray-600 mt-4">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
          {products.map((product) => (
            <div key={product._id} className="border p-4 rounded-lg shadow-md">
             <img
  src={product.image}
  alt={product.name}
  className="w-full h-48 object-contain rounded-md"
/>

              <h3 className="mt-2 font-semibold">{product.name}</h3>
              <p className="text-gray-600">${product.price}</p>
              <Link
                to={`/products/${product._id}`}
                className="block mt-2 bg-blue-500 text-white text-center py-2 rounded-md hover:bg-blue-600"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
